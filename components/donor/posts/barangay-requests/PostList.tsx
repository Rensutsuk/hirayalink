import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts, session, handleOpenModal, handleLikeClick, toggleComments, likedPosts, newComment, setNewComment, handleAddComment, showComments, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg">Loading Posts</span>
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
      {posts.map((post) => (
        <PostItem 
          key={post.id} 
          post={post} 
          session={session} 
          handleOpenModal={handleOpenModal} 
          handleLikeClick={handleLikeClick} 
          toggleComments={toggleComments} 
          likedPosts={likedPosts} 
          newComment={newComment} 
          setNewComment={setNewComment} 
          handleAddComment={handleAddComment} 
          showComments={showComments} 
        />
      ))}
    </div>
  );
};

export default PostList;
