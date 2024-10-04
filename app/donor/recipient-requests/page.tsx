"use client";

import { useState, useEffect } from "react";
import { FaThumbsUp, FaComment } from "react-icons/fa";

interface Post {
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

export default function Newsfeed() {
  const [posts, setPosts] = useState<Post[]>([]);
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
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        console.log("Fetched posts:", data);
        setPosts(data);

        // Initialize likedPosts based on the fetched data
        // For now, we'll assume all posts are not liked initially
        // You'll need to implement a way to get the current user's likes
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

  const handleViewPostClick = (post: Post) => {
    alert(`Viewing post for: ${post.completeName}`);
  };

  const handleLikeClick = async (postId: number) => {
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
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

  const toggleComments = (index: number) => {
    setShowComments((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleAddComment = async (postId: number) => {
    if (newComment[postId]?.trim()) {
      try {
        const response = await fetch(`/api/posts/${postId}/comment`, {
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
        <div className="text-center pt-8 pb-14 backdrop-blur-sm bg-black/25">
          <h1 className="mb-0 py-0 text-5xl font-bold text-white">
            Recipient Donation Request Post
          </h1>
        </div>
      </div>

      {/* Posts section */}
      <div className="space-y-4 p-4">
        {isLoading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p>{error}</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="relative p-4 bg-white shadow-md rounded-lg max-w-lg mx-auto"
            >
              {/* Header for Each Post */}
              <div className="bg-green-600 text-white text-lg font-bold px-4 py-2 flex justify-between items-center rounded-t-lg">
                <span>{post.completeName}</span>
                <span className="text-sm">
                  {new Date(post.dateTime).toLocaleString()}
                </span>
              </div>

              {/* Static Calamity Type Display */}
              <div className="absolute top-1 right-1 bg-red-600 text-white py-0 px-1 rounded">
                {post.typeOfCalamity}
              </div>

              <div className="p-4 border-2 border-green-600 rounded-lg">
                {/* Information in smaller, inline, bubbly text boxes */}
                <div className="flex flex-wrap gap-2 text-sm">
                  <div className="p-1 px-2 bg-gray-100 rounded-full">
                    <strong>Barangay:</strong> {post.barangay}
                  </div>
                  <div className="p-1 px-2 bg-gray-100 rounded-full">
                    <strong>Needs:</strong> {post.inKindNecessities}
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
                    <button
                      onClick={() => handleLikeClick(post.id)}
                      className={`p-2 rounded ${
                        likedPosts.has(post.id)
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      } flex items-center`}
                    >
                      <FaThumbsUp className="mr-1" /> {post.likes.length}
                    </button>
                    <button
                      className="text-green-600 flex items-center"
                      onClick={() => toggleComments(post.id)}
                    >
                      <FaComment className="mr-1" /> {post.comments.length}
                    </button>
                  </div>
                  <button
                    onClick={() => handleViewPostClick(post)}
                    className="p-2 bg-green-600 text-white rounded"
                  >
                    View Post
                  </button>
                </div>

                {/* Comments section */}
                {showComments[post.id] && (
                  <div className="mt-2">
                    <h4 className="font-bold">Comments</h4>
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
                    <div className="mt-2">
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
                        className="w-full p-2 border rounded"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="w-full bg-green-600 text-white p-2 rounded mt-1"
                      >
                        Add Comment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No posts available</p>
        )}
      </div>
    </div>
  );
}
