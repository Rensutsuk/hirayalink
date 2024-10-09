import { FaThumbsUp, FaComment } from "react-icons/fa";
import CommentsSection from "@/components/donor/posts/recipient-requests/CommentsSection"; 

const Post = ({ post, handleLikeClick, toggleComments, showComments, newComment, setNewComment, handleAddComment, likedPosts }) => {
  return (
    <div key={post.id} className="relative p-4 bg-white shadow-md rounded-lg max-w-4xl mx-auto flex">
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
        <CommentsSection 
          post={post} 
          newComment={newComment} 
          setNewComment={setNewComment} 
          handleAddComment={handleAddComment} 
        />
      )}
    </div>
  );
};

export default Post;
