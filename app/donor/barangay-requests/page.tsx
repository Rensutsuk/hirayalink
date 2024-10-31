"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useSession } from "next-auth/react";
import PostList from "@/components/donor/posts/barangay-requests/PostList";
import DonationModal from "@/components/donor/posts/barangay-requests/DonationModal";
import debounce from "lodash.debounce";

interface BarangayRequestPost {
  id: string;
  area: string;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [barangays, setBarangays] = useState<{ id: string; name: string }[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fetchBarangays = async () => {
      try {
        const response = await fetch("/api/barangays");
        if (!response.ok) {
          throw new Error("Failed to fetch barangays");
        }
        const data = await response.json();
        setBarangays(data);
      } catch (error) {
        console.error("Error fetching barangays:", error);
      }
    };

    fetchBarangays();
  }, []);

  const fetchPosts = useCallback(
    async (barangay: string, page: number) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/posts?type=barangay&area=${barangay}&page=${page}&limit=10`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        setHasMore(data.hasMore);
        const initialLikedPosts = new Set(
          data.posts.filter((post: any) => post.likedByUser).map((post: any) => post.id)
        );
        setLikedPosts(
          (prevLikedPosts: any) => new Set([...prevLikedPosts, ...initialLikedPosts as any])
        );
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const debouncedFetchPosts = useMemo(
    () => debounce(fetchPosts, 300),
    [fetchPosts]
  );

  useEffect(() => {
    setPosts([]); // Clear posts when barangay changes
    setPage(1); // Reset page number
    debouncedFetchPosts(selectedBarangay, 1);
  }, [selectedBarangay, debouncedFetchPosts]);

  const lastPostElementRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage: number) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    if (page > 1) {
      debouncedFetchPosts(selectedBarangay, page);
    }
  }, [page, selectedBarangay, debouncedFetchPosts]);

  const handleOpenModal = (postId: string) => {
    setSelectedPostId(postId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPostId(null);
  };

  const handleDonateClick = async (
    postId: string,
    items: { name: string; quantity: number; specificName: string }[]
  ) => {
    if (!session?.user) {
      setError("Please log in to donate.");
      return;
    }

    if (items.length === 0) {
      setError("Please select at least one item to donate.");
      return;
    }

    try {
      const donationData = {
        postId: postId,
        items: items.map((item: any) => ({
          name: item.specificName || item.name,
          quantity: item.quantity,
        })),
      };

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

      setMessage("Donation created successfully!");
      handleCloseModal();
      // You might want to refresh the posts or update the UI here
    } catch (error: any) {
      console.error("Error creating donation:", error);
      setError(error.message || "Failed to create donation. Please try again.");
    }
  };

  const handleLikeClick = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/like?type=barangay`, {
        method: "POST",
      });
      if (response.ok && session?.user?.id) {
        const data = await response.json();
        setPosts((prevPosts: any) =>
          prevPosts.map((post: any) =>
            post.id === postId
              ? {
                  ...post,
                  likes: data.liked
                    ? [
                        ...post.likes,
                        {
                          id: Date.now().toString(),
                          userId: session.user.id,
                        },
                      ]
                    : post.likes.filter(
                        (like: any) => like.userId !== session?.user?.id
                      ),
                }
              : post
          )
        );
        setLikedPosts((prevLikedPosts) => {
          const newLikedPosts = new Set<string>(prevLikedPosts);
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
    setShowComments((prev: any) => ({
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
          setPosts((prevPosts: any) =>
            prevPosts.map((post: any) =>
              post.id === postId
                ? { ...post, comments: [...post.comments, newCommentData] }
                : post
            )
          );
          setNewComment((prev: any) => ({ ...prev, [postId]: "" }));
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  return (
    <div>
      <div className="hero-background bg-cover max-h-[20rem] mb-5 sticky top-16 z-40">
        <div className="flex justify-between pt-10 pb-5 backdrop-blur-sm bg-black/25 w-full">
          <div className="flex justify-between items-center w-full">
            <div className="invisible shrink-0 w-1/4"></div>
            <div className="flex flex-col items-center flex-grow">
              <h1 className="mb-0 py-0 text-3xl font-bold text-center text-white">
                Barangay Donation Request Post
              </h1>
              <p className="text-center text-white mt-2 text-lg">
                {selectedBarangay
                  ? `Official requests from ${selectedBarangay}`
                  : "Official requests from all Barangays"}
              </p>
            </div>
            <div className="w-1/4 flex justify-end mr-5">
              <select
                value={selectedBarangay}
                onChange={(e) => setSelectedBarangay(e.target.value)}
                className="select select-bordered w-min max-w-xs"
              >
                <option value="">All Areas</option>
                {barangays.map((barangay) => (
                  <option key={barangay.id} value={barangay.name}>
                    {barangay.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <PostList
        posts={posts as BarangayRequestPost[]}
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

      {isModalOpen && (
        <DonationModal
          post={posts.find((p) => p.id === selectedPostId)}
          handleCloseModal={handleCloseModal}
        />
      )}

      {message && (
        <div className="fixed bottom-4 right-4 bg-primary text-white p-4 rounded-lg shadow-lg">
          {message}
        </div>
      )}
    </div>
  );
}
