"use client"; // Ensure this component can use hooks

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Post {
  barangay: string;
  person: string;
  typeOfCalamity: string;
  inKind: string;
  contactNumber: string;
  dropOffAddress: string;
  dropOffLandmark: string;
  imageUrl: string;
  dateTime: string; // Date and time of the post
}

export default function Newsfeed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      // Mock data or fetch from your API/database
      const mockData: Post[] = [
        {
          barangay: "Barangay 20, Zone 2 Parola, Tondo",
          person: "Apple Ruben",
          typeOfCalamity: "Flood",
          inKind: "Food, Hygiene Supplies, Electronic devices",
          contactNumber: "09207414689 / 8123-4567",
          dropOffAddress: "Delpan St, San Nicolas, Manila, Metro Manila",
          dropOffLandmark: "Near Del Pan Flyover, Manila",
          imageUrl: "https://images.sbs.com.au/dims4/default/813e94b/2147483647/strip/true/crop/720x405+0+242/resize/1280x720!/quality/90/?url=http%3A%2F%2Fsbs-au-brightspot.s3.amazonaws.com%2Fdrupal%2Fyourlanguage%2Fpublic%2Fpodcast_images%2Fjell_morena.jpg&imwidth=1280",
          dateTime: new Date().toLocaleString(), // Automatically set date and time
        },
        {
          barangay: "Barangay 20, Zone 2 Parola, Tondo",
          person: "Juan Dela Cruz",
          typeOfCalamity: "Typhoon",
          inKind: "Clothes, Blankets, Food",
          contactNumber: "09123456789 / 8123-1234",
          dropOffAddress: "Espana Blvd, Sampaloc, Manila, Metro Manila",
          dropOffLandmark: "Near UST",
          imageUrl: "https://angtugatog.home.blog/wp-content/uploads/2018/11/bagyong-nagdaan-baha-ang-kasunudan.jpg?w=630&h=372&crop=1",
          dateTime: new Date().toLocaleString(), // Automatically set date and time
        },
        {
          barangay: "Barangay 20, Isla Puting Bato, Tondo",
          person: "Maria Clara",
          typeOfCalamity: "Earthquake",
          inKind: "Water, Food, First Aid Supplies",
          contactNumber: "09987654321 / 8123-4321",
          dropOffAddress: "Adriatico St, Malate, Manila, Metro Manila",
          dropOffLandmark: "Near Robinsons Manila",
          imageUrl: "https://media.philstar.com/photos/2021/07/21/espana-flood-5_2021-07-21_23-27-37.jpg",
          dateTime: new Date().toLocaleString(), // Automatically set date and time
        }
      ];

      setPosts(mockData);
    };

    fetchPosts();
  }, []);

  const handleDonateClick = (post: Post) => {
    if (confirm(`Do you want to pledge for the donation request from ${post.barangay}?`)) {
      // Handle the pledge action
      alert("Pledge confirmed!");
    } else {
      alert("Pledge canceled.");
    }
  };

  return (
    <div>
      {/* Background image section */}
      <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: 'url(download.png)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex items-center justify-center h-full text-center text-white p-4">
          <div>
            <h1 className="text-2xl font-bold">BARANGAY 20, ZONE 2, TONDO MANILA</h1>
            <p className="mt-2 text-lg">OFFICIAL DONATION REQUEST LIST</p>
          </div>
        </div>
      </div>

      {/* Posts section */}
      <div className="space-y-4 p-4">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="relative p-2 bg-white shadow-md rounded-lg max-w-lg mx-auto">
              {/* Donate Now Button */}
              <button 
                onClick={() => handleDonateClick(post)} 
                className="absolute top-2 right-2 bg-red-600 text-white py-1 px-3 rounded"
              >
                DONATE NOW
              </button>

              <div className="bg-green-600 text-white p-2 rounded-t-lg">
                <h2 className="text-lg font-bold">
                  {post.barangay}
                </h2>
                <p className="text-xs">{post.dateTime}</p> {/* Display date and time */}
              </div>
              <div className="p-2 border-2 border-green-600 rounded-10g">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p><strong>Barangay:</strong> {post.barangay}</p>
                  <p><strong>Contact:</strong> {post.person}</p>
                  <p><strong>Calamity:</strong> {post.typeOfCalamity}</p>
                  <p><strong>Needs:</strong> {post.inKind}</p>
                  <p><strong>Phone:</strong> {post.contactNumber}</p>
                  <p><strong>Address:</strong> {post.dropOffAddress}</p>
                  <p><strong>Landmark:</strong> {post.dropOffLandmark}</p>
                </div>
                <img
                  src={post.imageUrl}
                  alt="Donation Image"
                  className="w-full h-auto rounded-lg mt-2"
                />
                <div className="flex justify-between items-center mt-2 text-xs">
                  <div className="flex space-x-2">
                    <button className="text-green-600">👍</button>
                    <button className="text-green-600">💬</button>
                  </div>
                  <Link href="/donation-tracking" className="text-green-600 bg-white border border-green-600 py-2 px-4 rounded hover:bg-green-100">
                    View Donation Tracking
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No posts available.</div>
        )}
      </div>
    </div>
  );
}
