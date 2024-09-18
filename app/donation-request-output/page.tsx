"use client"; // Ensure this component can use hooks

import { useState, useEffect } from 'react';

interface Post {
  barangay: string;
  person: string;
  typeOfCalamity: string;
  inKind: string;
  contactNumber: string;
  Address: string;
  EmailAddress: string;
  NoFamilyMember: string;
  imageUrl: string;
  dateTime: string;
  likes: number;
  likedByUser: boolean;
}

export default function Newsfeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<{ [key: number]: string[] }>({});
  const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({});
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const [selectedBarangay] = useState('BARANGAY NUMBER 20 TONDO'); // Default selection

  useEffect(() => {
    const fetchPosts = async () => {
      const mockData: Post[] = [
        {
          barangay: "Barangay 20, Zone 2 Parola, Tondo",
          person: "Mary Apostol",
          typeOfCalamity: "Flood",
          inKind: "Food, Shelter, Hygiene Kit",
          contactNumber: "09123456789",
          Address: "Delpan St, San Nicolas, Manila, Metro Manila",
          imageUrl: "https://1cms-img.imgix.net/heavily-flooded-Malabon-City.jpg",
          dateTime: new Date().toLocaleString(),
          likes: 0,
          likedByUser: false,
          EmailAddress: 'group5@gmail.com',
          NoFamilyMember: '5'
        },
        {
          barangay: "Barangay 105 Z8 District 1 Tondo, Manila",
          person: "Levi De guzman",
          typeOfCalamity: "Typhoon",
          inKind: "Clothes, Electronic Devices, Food",
          contactNumber: "0987654321",
          Address: "Espana Blvd, Sampaloc, Manila, Metro Manila",
          imageUrl: "https://c8.alamy.com/comp/F5GNYE/manila-the-philippines-resident-of-a-poor-neighborhood-living-in-huts-F5GNYE.jpg",
          dateTime: new Date().toLocaleString(),
          likes: 0,
          likedByUser: false,
          EmailAddress: 'levg@gmail.com',
          NoFamilyMember: '7'
        },
        {
          barangay: "Barangay 20, Isla Puting Bato, Tondo",
          person: "Rodger Dela Fuente",
          typeOfCalamity: "Earthquake",
          inKind: "Water, Food, First Aid Supplies",
          contactNumber: "09674351298",
          Address: "Adriatico St, Malate, Manila, Metro Manila",
          imageUrl: "https://ca-times.brightspotcdn.com/dims4/default/21f650e/2147483647/strip/true/crop/5000x3333+0+0/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Ffb%2F8c%2Fb6e8796e450885f50ea8bc22dbec%2Fap23037523545482.jpg",
          dateTime: new Date().toLocaleString(),
          likes: 0,
          likedByUser: false,
          EmailAddress: 'dfrod@gmail.com',
          NoFamilyMember: '4'
        }
      ];

      setPosts(mockData);
    };

    fetchPosts();
  }, []);

  const handleViewPostClick = (post: Post) => {
    // Your logic for viewing the post, with authorization check
    alert(`Viewing post for: ${post.person}`);
  };

  const handleLikeClick = (postId: number, liked: boolean) => {
    setPosts((prevPosts) =>
      prevPosts.map((post, index) =>
        index === postId
          ? { ...post, likedByUser: !liked, likes: post.likes + (liked ? -1 : 1) }
          : post
      )
    );
  };

  const toggleComments = (index: number) => {
    setShowComments((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleAddComment = (index: number) => {
    if (newComment[index]?.trim()) {
      setComments((prevComments) => ({
        ...prevComments,
        [index]: [...(prevComments[index] || []), newComment[index]]
      }));
      setNewComment((prevNewComment) => ({
        ...prevNewComment,
        [index]: ''
      }));
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
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="relative p-4 bg-white shadow-md rounded-lg max-w-lg mx-auto">
              {/* Header for Each Post */}
              <div className="bg-green-600 text-white text-lg font-bold px-4 py-2 rounded-t-lg">
                {post.person}'s Request
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
                    <strong>Needs:</strong> {post.inKind}
                  </div>
                  <div className="p-1 px-2 bg-gray-100 rounded-full">
                    <strong>Phone:</strong> {post.contactNumber}
                  </div>
                  <div className="p-1 px-2 bg-gray-100 rounded-full">
                    <strong>Address:</strong> {post.Address}
                  </div>
                  <div className="p-1 px-2 bg-gray-100 rounded-full">
                    <strong>Email:</strong> {post.EmailAddress}
                  </div>
                  <div className="p-1 px-2 bg-gray-100 rounded-full">
                    <strong>Family Members:</strong> {post.NoFamilyMember}
                  </div>
                </div>

                <img
                  src={post.imageUrl}
                  alt="Donation Image"
                  className="w-full h-auto rounded-lg mt-4"
                />

                <div className="flex justify-between items-center mt-4 text-xs">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleLikeClick(index, post.likedByUser)}
                      className={`p-2 rounded ${post.likedByUser ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-700'}`}
                    >
                      👍 {post.likes}
                    </button>
                    <button
                      className="text-green-600"
                      onClick={() => toggleComments(index)}
                    >
                      💬
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
                {showComments[index] && (
                  <div className="mt-2">
                    <h4 className="font-bold">Comments</h4>
                    <div className="space-y-2">
                      {(comments[index] || []).map((comment, cIndex) => (
                        <p key={cIndex} className="text-sm bg-gray-200 p-2 rounded">
                          {comment}
                        </p>
                      ))}
                    </div>
                    <div className="mt-2">
                      <input
                        type="text"
                        value={newComment[index] || ''}
                        onChange={(e) => setNewComment({ ...newComment, [index]: e.target.value })}
                        placeholder="Add a comment..."
                        className="w-full p-2 border rounded"
                      />
                      <button
                        onClick={() => handleAddComment(index)}
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
