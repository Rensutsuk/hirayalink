"use client";

import { useState, useEffect } from "react";
import Post from "@/components/donor/posts/recipient-requests/Post";

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
  const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({});
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/posts?type=recipient");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);

        const initialLikedPosts = new Set(data.filter(post => post.likedByUser).map(post => post.id));
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
        console.log("Like response:", data); // Log the response

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes: data.liked
                    ? [...post.likes, { id: Date.now() }] // This should ideally include the actual like ID
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
            <Post 
              key={post.id} 
              post={post} 
              handleLikeClick={handleLikeClick} 
              toggleComments={toggleComments} 
              showComments={showComments} 
              newComment={newComment} 
              setNewComment={setNewComment} 
              handleAddComment={handleAddComment} 
              likedPosts={likedPosts} 
            />
          ))
        ) : (
          <p className="text-center">No posts available</p>
        )}
      </div>
    </div>
  );
}