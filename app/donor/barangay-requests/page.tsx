"use client"; // Ensure this component can use hooks

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Adjust import for Next.js router

interface BarangayRequest {
  id: number;
  controlNumber: string;
  barangay: string;
  person: string;
  typeOfCalamity: string;
  inKind: string;
  contactNumber: string;
  dropOffAddress: string;
  dropOffLandmark: string;
  dateTime: string;
  image: string | null; // Assuming the image is base64
}

export default function Newsfeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<{ [key: number]: string[] }>({});
  const [showComments, setShowComments] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const [selectedBarangay, setSelectedBarangay] = useState(
    "BARANGAY NUMBER 20 TONDO"
  ); // Default selection
  const router = useRouter();

  const handleDonateClick = (post: Post) => {
    if (
      confirm(
        `Do you want to pledge for the donation request from ${post.barangay}?`
      )
    ) {
      alert("Pledge confirmed!");
    } else {
      alert("Pledge canceled.");
    }
  };

  const handleLikeClick = (postId: number, liked: boolean) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likedByUser: !liked,
              likes: post.likes + (liked ? -1 : 1),
            }
          : post
      )
    );
  };

  const toggleComments = (postId: number) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleAddComment = (postId: number) => {
    if (newComment[postId]?.trim()) {
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), newComment[postId]],
      }));
      setNewComment((prevNewComment) => ({
        ...prevNewComment,
        [postId]: "",
      }));
    }
  };

  // Fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/barangayRequestPost"); // Add leading '/' to the path
        const data = await response.json();

        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("Unexpected data format:", data);
          setPosts([]);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  // Function to filter posts based on selected barangay number
  const filteredPosts = posts.filter((post) =>
    post.barangay.includes(selectedBarangay.includes("105") ? "105" : "20")
  );

  return (
    <div>
      <div className="hero-background bg-cover max-h-[30rem] mb-7">
        <div className="text-center pt-10 pb-20 backdrop-blur-sm bg-black/25 ">
          <h1 className="mb-5 py-10 text-5xl font-bold text-white">
            OFFICIAL DONATION REQUEST LIST
          </h1>
          <p className="text-xl text-white py-5">Barangay</p>
        </div>
      </div>

      {/* Dropdown menu aligned to the right */}
      <div className="p-4 mb-4 flex justify-end">
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center font-bold">
          View Other Barangay
          <select
            id="barangay-select"
            value={selectedBarangay}
            onChange={(e) => {
              const selectedValue = e.target.value;
              setSelectedBarangay(selectedValue);
              router.push(
                `/brgy-donation-req-timeline?barangay=${
                  selectedValue.includes("105") ? "105" : "20"
                }`
              );
            }}
            className="ml-2 bg-white border-none text-black focus:outline-none"
          >
            <option value="BARANGAY NUMBER 20 TONDO">20</option>
            <option value="BARANGAY NUMBER 105">105</option>
          </select>
        </button>
      </div>

      {/* Posts section */}
      <div className="space-y-4 p-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="relative p-4 bg-white shadow-md rounded-lg max-w-lg mx-auto"
            >
              {/* Donate Now Button */}
              <button
                onClick={() => handleDonateClick(post)}
                className="absolute top-1 right-1 bg-red-600 text-white py-0 px-1 rounded"
              >
                DONATE NOW
              </button>

              {/* Post details */}
              <div className="bg-green-600 text-white p-3 rounded-t-lg">
                <p className="text-xs">Control Number: {post.controlNumber}</p>
                <h2 className="text-lg font-bold">{post.barangay}</h2>
                <p className="text-xs">{post.dateTime}</p>
              </div>
              <div className="p-4 border-2 border-green-600 rounded-10g">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <p>
                    <strong>Barangay:</strong> {post.barangay}
                  </p>
                  <p>
                    <strong>Contact:</strong> {post.person}
                  </p>
                  <p>
                    <strong>Calamity:</strong> {post.typeOfCalamity}
                  </p>
                  <p>
                    <strong>Needs:</strong> {post.inKind}
                  </p>
                  <p>
                    <strong>Phone:</strong> {post.contactNumber}
                  </p>
                  <p>
                    <strong>Address:</strong> {post.dropOffAddress}
                  </p>
                  <p>
                    <strong>Landmark:</strong> {post.dropOffLandmark}
                  </p>
                </div>
                {post.image && (
                  <img
                    src={`data:image/png;base64,${post.image}`}
                    alt="Donation Image"
                    className="w-full h-auto rounded-lg mt-4"
                  />
                )}
              </div>

              <div className="flex justify-between items-center mt-4 text-xs">
                <div className="flex space-x-2">
                  {/* Like Button */}
                  <button
                    onClick={() => handleLikeClick(post.id, post.likedByUser)}
                    className={`p-2 rounded ${
                      post.likedByUser
                        ? "bg-green-600 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    👍 {post.likes}
                  </button>
                  {/* Comments Button */}
                  <button
                    className="text-green-600"
                    onClick={() => toggleComments(post.id)}
                  >
                    💬
                  </button>
                </div>
                {/* View Donations Button */}
                <Link
                  href="/donation-tracking"
                  className="text-green-600 underline"
                >
                  View Donations
                </Link>
              </div>

              {/* Comments Section */}
              {showComments[post.id] && (
                <div className="mt-4">
                  <div className="max-h-32 overflow-y-auto">
                    {comments[post.id]?.map((comment, commentIndex) => (
                      <p key={commentIndex} className="text-sm text-gray-600">
                        {comment}
                      </p>
                    ))}
                  </div>
                  <div className="flex mt-2">
                    <input
                      type="text"
                      value={newComment[post.id] || ""}
                      onChange={(e) =>
                        setNewComment({
                          ...newComment,
                          [post.id]: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-md p-1 flex-1"
                      placeholder="Add a comment..."
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="bg-blue-600 text-white px-4 rounded ml-2"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No donation requests found for this barangay.</p>
        )}
      </div>
    </div>
  );
}
