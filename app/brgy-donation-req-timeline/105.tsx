"use client"; // Ensure this component can use hooks

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Post {
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
  image: string | null; // Adjusted to allow for null or string
  likes: number;
  likedByUser: boolean;
}

export default function BarangayPosts() {
  const router = useRouter();
  const { query } = router;
  const selectedBarangay = query.barangay || '105'; // Default to barangay 20 if none selected
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      // This is where you fetch your posts (from an API or mock data)
      const mockData: Post[] = [
        {
          id: 1,
          controlNumber: "CN-001",
          barangay: "Barangay 20, Zone 2, Tondo",
          person: "Apple Ruben",
          typeOfCalamity: "Flood",
          inKind: "Food, Hygiene Supplies, Electronic devices",
          contactNumber: "09207414689 / 8123-4567",
          dropOffAddress: "Delpan St, San Nicolas, Manila, Metro Manila",
          dropOffLandmark: "Near Del Pan Flyover, Manila",
          image: "",
          dateTime: new Date().toLocaleString(),
          likes: 0,
          likedByUser: false,
        },
        {
          id: 2,
          controlNumber: "CN-005",
          barangay: "Barangay 105, Zone 3, Tondo",
          person: "Liza Minelli",
          typeOfCalamity: "Typhoon",
          inKind: "Food Packs, Blankets",
          contactNumber: "01234567890",
          dropOffAddress: "456 Elm St, Tondo",
          dropOffLandmark: "Near 105 Elementary School",
          image: "",
          dateTime: new Date().toLocaleString(),
          likes: 0,
          likedByUser: false,
        }
      ];

      setPosts(mockData);
    };

    fetchPosts();
  }, []);

  const handleDonateClick = (post: Post) => {
    if (confirm(`Do you want to pledge for the donation request from ${post.barangay}?`)) {
      alert("Pledge confirmed!");
    } else {
      alert("Pledge canceled.");
    }
  };

  const handleLikeClick = (postId: number, liked: boolean) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, likedByUser: !liked, likes: post.likes + (liked ? -1 : 1) }
          : post
      )
    );
  };

  const toggleComments = (postId: number) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId]
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
        [postId]: '',
      }));
    }
  };

  return (
    <div>
      <div className="hero-background bg-cover max-h-[30rem] mb-7">
        <div className="text-center pt-10 pb-20 backdrop-blur-sm bg-black/25 ">
          <h1 className="mb-5 py-10 text-5xl font-bold text-white">
            BARANGAY 105
          </h1>
          <p className="text-xl text-white py-5">
            Official Donation Request List
          </p>
        </div>
      </div>

      {/* Posts section */}
      <div className="space-y-4 p-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="relative p-4 bg-white shadow-md rounded-lg max-w-lg mx-auto">
              {/* Donate Now Button */}
              <button
                onClick={() => handleDonateClick(post)}
                className="absolute top-1 right-1 bg-red-600 text-white py-0 px-1 rounded"
              >
                DONATE NOW
              </button>

              <div className="bg-green-600 text-white p-3 rounded-t-lg">
                <p className="text-xs">Control Number: {post.controlNumber}</p>
                <h2 className="text-lg font-bold">{post.barangay}</h2>
                <p className="text-xs">{post.dateTime}</p>
              </div>

              <div className="p-4 border-2 border-green-600 rounded-10g">
                {/* Grid layout for post details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <p><strong>Barangay:</strong> {post.barangay}</p>
                  <p><strong>Contact:</strong> {post.person}</p>
                  <p><strong>Calamity:</strong> {post.typeOfCalamity}</p>
                  <p><strong>Needs:</strong> {post.inKind}</p>
                  <p><strong>Phone:</strong> {post.contactNumber}</p>
                  <p><strong>Address:</strong> {post.dropOffAddress}</p>
                  <p><strong>Landmark:</strong> {post.dropOffLandmark}</p>
                </div>

                <img
                  src={post.image}
                  alt="Donation Image"
                  className="w-full h-auto rounded-lg mt-4"
                />

                <div className="flex justify-between items-center mt-4 text-xs">
                  <div className="flex space-x-2">
                    {/* Like Button */}
                    <button
                      onClick={() => handleLikeClick(post.id, post.likedByUser)}
                      className={`p-2 rounded ${post.likedByUser ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-700'}`}
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
              </div>
             {/* Comments Section */}
              {showComments[post.id] && (
                <div className="mt-4">
                  <div className="max-h-32 overflow-y-auto">
                    {comments[post.id]?.map((comment, commentIndex) => (
                      <p key={commentIndex} className="text-sm text-gray-600">{comment}</p>
                    ))}
                  </div>
                  <div className="flex mt-2">
                    <input
                      type="text"
                      value={newComment[post.id] || ''}
                      onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
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
          <p>No donation requests found for Barangay 105.</p>
        )}
      </div>
    </div>
  );
}
