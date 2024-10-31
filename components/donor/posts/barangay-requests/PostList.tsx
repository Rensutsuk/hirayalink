import React from "react";
import PostItem from "./PostItem";

interface BarangayRequestPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    image?: string;
  };
  createdAt: string;
  likes: number;
  comments?: {
    id: string;
    content: string;
    author: {
      id: string;
      name: string;
      image?: string;
    };
    createdAt: string;
  }[];
  // Add any other fields that your post object contains
}

interface PostItemProps {
  post: BarangayRequestPost;
  handleOpenModal: (type: 'donate' | 'details' | 'comments', postId: string) => void;
  handleLikeClick: (postId: string) => void;
  likedPosts: Set<string>;
}

const PostList = ({
  posts,
  handleOpenModal,
  handleLikeClick,
  likedPosts,
  isLoading,
  error,
}: {
  posts: any;
  handleOpenModal: any;
  handleLikeClick: any;
  likedPosts: any;
  isLoading: any;
  error: any;
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg">
          Loading Posts
        </span>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (posts.length === 0) {
    return <p className="text-center">No posts available</p>;
  }

  return (
    <div className="space-y-4 p-4">
      {posts.map((post: any) => (
        <PostItem
          key={post.id}
          post={post}
          handleOpenModal={handleOpenModal}
          handleLikeClick={handleLikeClick}
          likedPosts={likedPosts}
        />
      ))}
    </div>
  );
};

export default PostList;
