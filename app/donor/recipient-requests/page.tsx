"use client";

import { useState, useEffect } from "react";
import { FaThumbsUp, FaComment } from "react-icons/fa";

interface RecipientRequests {
  id: number;
  completeName: string;
  age: number;
  noOfFamilyMembers: number;
  contactNumber: string;
  emailAddress: string | null;
  barangay: string;
  typeOfCalamity: string;
  inKindNecessities: string;
  specifications: string;
  uploadedPhoto: Buffer | null;
  dateTime: Date;
  likes: { id: number }[];
  comments: { id: number; content: string; userId: number }[];
}

export default function RecipientRequests() {
  const [posts, setPosts] = useState<RecipientRequests[]>([]);
  const [showComments, setShowComments] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/posts?type=recipient"); // Add type parameter
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        console.log("Fetched posts:", data);
        setPosts(data);

        const initialLikedPosts = new Set();
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

  const handleLikeClick = async (postId: number) => {
    try {
      const response = await fetch(`/api/posts/${postId}/like?type=recipient`, {
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
                    ? [...post.likes, { id: Date.now() }]
                    : post.likes.slice(0, -1),
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
        const response = await fetch(`/api/posts/${postId}/comment?type=recipient`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: newComment[postId] }),
        });
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

  return (
    <div>
      <div className="hero-background bg-cover max-h-[20rem] mb-5">
        <div className="text-center py-14 backdrop-blur-sm bg-black/25">
          <h1 className="mb-0 py-0 text-5xl font-bold text-white">
            Recipient Donation Request Post
          </h1>
        </div>
      </div>

      {/* Posts section */}
      <div className="space-y-4 p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg">
              Loading Posts
            </span>
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="relative p-4 bg-white shadow-md rounded-lg max-w-4xl mx-auto flex"
            >
              {/* Main post content */}
              <div className="flex-grow">
                {/* Header for Each Post */}
                <div className="bg-primary text-white text-lg font-semi bold px-4 py-2 flex justify-between items-center rounded-t-lg">
                  <span>{post.completeName}</span>
                  <span className="text-sm">
                    {new Date(post.dateTime).toLocaleString()}
                  </span>
                </div>

                {/* Static Calamity Type Display */}
                <div className="absolute top-1 left-1 bg-error text-white font-bold py-0 px-1 rounded-md">
                  {post.typeOfCalamity}
                </div>

                <div className="p-4 border-2 border-primary rounded-b-lg">
                  {/* Information in smaller, inline, bubbly text boxes */}
                  <div className="flex flex-wrap gap-2 text-sm">
                  <div className="p-1 px-2 bg-gray-100 rounded-full">
                      <strong>Age:</strong> {post.age}
                    </div>
                    <div className="p-1 px-2 bg-gray-100 rounded-full">
                      <strong>Barangay:</strong> {post.barangay}
                    </div>
                    <div className="p-1 px-2 bg-gray-100 rounded-full">
                      <strong>Needs:</strong> {post.inKindNecessities}
                    </div>
                    <div className="p-1 px-2 bg-gray-100 rounded-full">
                      <strong>Specifications:</strong> {post.specifications}
                    </div>
                    <div className="p-1 px-2 bg-gray-100 rounded-full">
                      <strong>Phone:</strong> {post.contactNumber}
                    </div>
                    <div className="p-1 px-2 bg-gray-100 rounded-full">
                      <strong>Email:</strong> {post.emailAddress || "N/A"}
                    </div>
                    <div className="p-1 px-2 bg-gray-100 rounded-full">
                      <strong>Family Members:</strong> {post.noOfFamilyMembers}
                    </div>
                  </div>

                  {post.uploadedPhoto && (
                    <img
                      src={`data:image/jpeg;base64,${Buffer.from(
                        post.uploadedPhoto
                      ).toString("base64")}`}
                      alt="Donation Image"
                      className="w-full h-auto rounded-lg mt-4"
                    />
                  )}

                  <div className="flex justify-between items-center mt-4 text-xs">
                    <div className="flex space-x-2">
                      <div
                        role="button"
                        onClick={() => handleLikeClick(post.id)}
                        className={`btn btn-sm ${
                          likedPosts.has(post.id)
                            ? "btn-primary text-white"
                            : "btn-outline"
                        } flex items-center`}
                      >
                        <FaThumbsUp className="mr-1" /> {post.likes.length}
                      </div>
                      <button
                        className="btn btn-sm btn-outline text-primary flex items-center"
                        onClick={() => toggleComments(post.id)}
                      >
                        <FaComment className="mr-1" /> {post.comments.length}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments section */}
              {showComments[post.id] && (
                <div className="w-max ml-4 border-l pl-4 max-h-96 overflow-y-auto">
                  <h4 className="font-bold mb-2">Comments</h4>
                  <div className="space-y-2">
                    {post.comments.map((comment) => (
                      <p
                        key={comment.id}
                        className="text-sm bg-gray-200 p-2 rounded"
                      >
                        {comment.content}
                      </p>
                    ))}
                  </div>
                  <div className="mt-2 sticky bottom-0 bg-white py-2">
                    <input
                      type="text"
                      value={newComment[post.id] || ""}
                      onChange={(e) =>
                        setNewComment({
                          ...newComment,
                          [post.id]: e.target.value,
                        })
                      }
                      placeholder="Add a comment..."
                      className="input input-bordered w-full"
                    />
                    <div
                      role="button"
                      onClick={() => handleAddComment(post.id)}
                      className="btn btn-primary w-full text-white mt-2"
                    >
                      Add Comment
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center">No posts available</p>
        )}
      </div>
    </div>
  );
}
