"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import PostList from "@/components/donor/posts/barangay-requests/PostList";
import DonationModal from "@/components/donor/posts/barangay-requests/DonationModal"; 

interface BarangayRequestPost {
  id: string;
  controlNumber: string;
  barangay: string;
  person: string;
  typeOfCalamity: string;
  inKind: string;
  contactNumber: string;
  dropOffAddress: string;
  dropOffLandmark: string;
  image: Buffer | null;
  dateTime: Date;
  likes: { id: string; userId: string }[];
  comments: { id: string; content: string; userId: string }[];
  likedByUser?: boolean;
}

export default function BarangayRequests() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<BarangayRequestPost[]>([]);
  const [showComments, setShowComments] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [selectedBarangay, setSelectedBarangay] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<
    { name: string; quantity: number }[]
  >([]);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/posts?type=barangay");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
        const initialLikedPosts = new Set(
          data.filter((post) => post.likedByUser).map((post) => post.id)
        );
        setLikedPosts(initialLikedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleOpenModal = (postId: number) => {
    setSelectedPostId(postId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleItemSelection = (item) => {
    setSelectedItems((prev) => {
      const exists = prev.find((i) => i.name === item.name);
      if (exists) {
        return prev.filter((i) => i.name !== item.name);
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const handleDonateClick = async (post: BarangayRequestPost) => {
    if (!session?.user) {
      setError("Please log in to donate.");
      return;
    }

    if (selectedItems.length === 0) {
      setError("Please select at least one item to donate.");
      return;
    }

    try {
      const donationData = {
        postId: post.id,
        items: selectedItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
        })),
      };

      console.log("Attempting to pledge donation:", donationData);

      const response = await fetch("/api/donation-pledge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donationData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create donation");
      }

      setSelectedItems([]);
      setError(null);
      setMessage("Donation created successfully!");
      handleCloseModal();
      // You might want to refresh the posts or update the UI here
    } catch (error) {
      console.error("Error creating donation:", error);
      setError(`Failed to create donation: ${error.message}`);
    }
  };

  const handleLikeClick = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/like?type=barangay`, {
        method: "POST",
      });
      if (response.ok) {
        const data = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes: data.liked
                    ? [
                        ...post.likes,
                        {
                          id: Date.now().toString(),
                          userId: session?.user?.id,
                        },
                      ]
                    : post.likes.filter(
                        (like) => like.userId !== session?.user?.id
                      ),
                }
              : post
          )
        );
        setLikedPosts((prevLikedPosts) => {
          const newLikedPosts = new Set(prevLikedPosts);
          if (data.liked) {
            newLikedPosts.add(postId);
          } else {
            newLikedPosts.delete(postId);
          }
          return newLikedPosts;
        });
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const toggleComments = (postId: number) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleAddComment = async (postId: number) => {
    if (newComment[postId]?.trim()) {
      try {
        const response = await fetch(
          `/api/posts/${postId}/comment?type=barangay`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: newComment[postId] }),
          }
        );
        if (response.ok) {
          const newCommentData = await response.json();
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === postId
                ? { ...post, comments: [...post.comments, newCommentData] }
                : post
            )
          );
          setNewComment((prev) => ({ ...prev, [postId]: "" }));
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const filteredPosts = selectedBarangay
    ? posts.filter((post) => post.barangay === selectedBarangay)
    : posts;

  return (
    <div>
      <div className="hero-background bg-cover max-h-[20rem] mb-5">
        <div className="py-14 backdrop-blur-sm bg-black/25">
          <h1 className="mb-0 py-0 text-5xl font-bold text-center text-white">
            Barangay Donation Request Post
          </h1>
          <p className="text-center text-white mt-2 text-xl">
            {selectedBarangay
              ? `Official requests from ${selectedBarangay}`
              : "Official requests from all Barangays"}
          </p>
          <div className="flex items-center justify-end mt-4 mr-10">
            <select
              value={selectedBarangay}
              onChange={(e) => setSelectedBarangay(e.target.value)}
              className="select select-bordered w-min max-w-xs"
            >
              <option value="">All Barangays</option>
              {/* Add options for each barangay */}
              {Array.from(new Set(posts.map((post) => post.barangay))).map(
                (barangay) => (
                  <option key={barangay} value={barangay}>
                    {barangay}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </div>
      <PostList
        posts={filteredPosts}
        session={session}
        handleOpenModal={handleOpenModal}
        handleLikeClick={handleLikeClick}
        toggleComments={toggleComments}
        likedPosts={likedPosts}
        newComment={newComment}
        setNewComment={setNewComment}
        handleAddComment={handleAddComment}
        showComments={showComments}
        isLoading={isLoading}
        error={error}
      />

      {message && (
        <p
          className={
            message.includes("successfully") ? "text-green-500" : "text-red-500"
          }
        >
          {message}
        </p>
      )}

      {isModalOpen && (
        <DonationModal
          posts={posts}
          selectedPostId={selectedPostId}
          selectedItems={selectedItems}
          handleItemSelection={handleItemSelection}
          handleDonateClick={handleDonateClick}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
}
