import React from "react";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import Link from "next/link";
import CommentSection from "./CommentSection";

const PostItem = ({
  post,
  session,
  handleOpenModal,
  handleLikeClick,
  toggleComments,
  likedPosts,
  newComment,
  setNewComment,
  handleAddComment,
  showComments,
}) => {
  return (
    <div className="relative p-4 bg-white shadow-md rounded-lg max-w-4xl mx-auto flex">
      <div className="flex-grow">
        <div className="bg-primary text-white text-lg font-semi bold px-4 py-2 flex justify-between items-center rounded-t-lg">
          <span className="font-bold">
            {post.person}: {post.area}
          </span>{" "}
          {/* Updated to match Post.tsx */}
          <span className="text-sm">
            {new Date(post.dateTime).toLocaleString()}{" "}
            {/* Updated to match Post.tsx */}
          </span>
        </div>

        {session ? (
          <div
            role="button"
            onClick={() => handleOpenModal(post.id)}
            className="btn btn-sm btn-error absolute top-0 left-0 text-white py-0 px-1 rounded"
          >
            <strong>DONATE NOW</strong>
          </div>
        ) : (
          <p className="absolute top-1 left-1 bg-yellow-500 text-white py-0 px-1 rounded">
            Log in to donate
          </p>
        )}

        <div className="p-4 border-2 border-primary rounded-b-lg">
          <div className="flex flex-wrap gap-2 text-sm">
            <div className="p-1 px-2 bg-gray-100 rounded-full">
              <strong>Barangay:</strong>{" "}
              {post.Barangay.name.replace("Barangay ", "")}
            </div>
            <div className="p-1 px-2 bg-gray-100 rounded-full">
              <strong>Calamity:</strong> {post.typeOfCalamity}
            </div>
            <div className="p-1 px-2 bg-gray-100 rounded-full">
              <strong>Contact:</strong> {post.person}
            </div>
            <div className="p-1 px-2 bg-gray-100 rounded-full">
              <strong>Phone:</strong> {post.contactNumber}
            </div>
            <div className="p-1 px-2 bg-gray-100 rounded-full">
              <strong>Drop-off Address:</strong> {post.dropOffAddress}
            </div>
            <div className="p-1 px-2 bg-gray-100 rounded-full">
              <strong>Landmark:</strong> {post.dropOffLandmark}
            </div>
            {post.inKind && post.specifications && (
              <div className="flex flex-wrap gap-2 text-sm">
                {Object.entries(post.inKind).map(
                  ([key, value]) =>
                    value && (
                      <div
                        key={key}
                        className="p-1 px-2 bg-gray-100 rounded-full"
                      >
                        <strong>{key}:</strong>{" "}
                        {post.specifications[key]
                          ? (Array.isArray(post.specifications[key])
                              ? post.specifications[key]
                              : [post.specifications[key]]
                            )
                              .flatMap((item) =>
                                typeof item === "string"
                                  ? item.split(",")
                                  : item
                              )
                              .map((item) =>
                                typeof item === "string" ? item.trim() : item
                              )
                              .filter(Boolean)
                              .join(", ")
                          : "Nothing Specific"}
                      </div>
                    )
                )}
              </div>
            )}
          </div>

          {post.image && (
            <img
              src={`data:image/jpeg;base64,${Buffer.from(post.image).toString(
                "base64"
              )}`}
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
              <button>
                <Link
                  href={`/donor/donation-tracking?postId=${post.id}`}
                  className="btn btn-sm btn-outline text-primary flex items-center"
                >
                  Donations
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showComments[post.id] && (
        <CommentSection
          post={post}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
        />
      )}
    </div>
  );
};

export default PostItem;
