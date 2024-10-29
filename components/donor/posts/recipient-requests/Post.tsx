import { FaThumbsUp, FaComment } from "react-icons/fa";
import Image from "next/image";
import CommentsSection from "@/components/donor/posts/recipient-requests/CommentsSection";

interface PostProps {
  post: {
    id: string;
    completeName: string;
    area: string;
    dateTime: string;
    typeOfCalamity: string;
    age: number;
    Barangay: {
      name: string;
    };
    inKindNecessities: string;
    specifications: string;
    contactNumber: string;
    emailAddress?: string;
    noOfFamilyMembers: number;
    uploadedPhoto?: any;
    likes: string[];
    comments: { id: string; content: string; userId: string }[];
  };
  handleLikeClick: (postId: string) => void;
  toggleComments: (postId: string) => void;
  showComments: { [key: string]: boolean };
  newComment: Record<string, string>;
  setNewComment: (value: Record<string, string>) => void;
  handleAddComment: (postId: string) => void;
  likedPosts: Set<string>;
}

const Post = ({ post, handleLikeClick, toggleComments, showComments, newComment, setNewComment, handleAddComment, likedPosts }: PostProps) => {
  return (
    <div key={post.id} className="relative p-4 bg-white shadow-md rounded-lg max-w-4xl mx-auto flex">
      {/* Main post content */}
      <div className="flex-grow">
        {/* Header for Each Post */}
        <div className="bg-primary text-white text-lg font-semi bold px-4 py-2 flex justify-between items-center rounded-t-lg">
          <span className="font-bold">{post.completeName}: {post.area}</span>
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
              <strong>Barangay:</strong> {post.Barangay.name.replace('Barangay ', '')}
            </div>
            <div className="flex flex-wrap gap-2">
              {post.inKindNecessities.split(',').map((necessity: string, index: number) => {
                const trimmedNecessity = necessity.trim().replace(/['{}"]/g, '');
                const correspondingSpecification = post.specifications.split(',').find((spec: string) => spec.trim().includes(trimmedNecessity));
                return (
                  <div key={index} className="p-1 px-2 bg-gray-100 rounded-full">
                    <strong>{trimmedNecessity}:</strong> {correspondingSpecification ? correspondingSpecification.trim().replace(/['{}"]/g, '').replace(trimmedNecessity, '').trim() : 'N/A'}
                  </div>
                );
              })}
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
            <Image
              src={`data:image/jpeg;base64,${Buffer.from(
                post.uploadedPhoto
              ).toString("base64")}`}
              alt="Donation Image"
              className="w-full h-auto rounded-lg mt-4"
              width={3000}
              height={500}
              priority
              quality={75}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
