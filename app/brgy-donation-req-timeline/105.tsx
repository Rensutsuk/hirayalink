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
          controlNumber: "CN-002",
          barangay: "Barangay 20, Zone 2, Tondo",
          person: "Juan Dela Cruz",
          typeOfCalamity: "Typhoon",
          inKind: "Clothes, Blankets, Food",
          contactNumber: "09123456789 / 8123-1234",
          dropOffAddress: "Espana Blvd, Sampaloc, Manila, Metro Manila",
          dropOffLandmark: "Near UST",
          image: "",
          dateTime: new Date().toLocaleString(),
          likes: 0,
          likedByUser: false,
        },
        {
          id: 3,
          controlNumber: "CN-003",
          barangay: "Barangay 105, Zone 3, Tondo",
          person: "Maria Clara",
          typeOfCalamity: "Earthquake",
          inKind: "Water, Food, First Aid Supplies",
          contactNumber: "09987654321 / 8123-4321",
          dropOffAddress: "Adriatico St, Malate, Manila, Metro Manila",
          dropOffLandmark: "Near Robinsons Manila",
          image: "",
          dateTime: new Date().toLocaleString(),
          likes: 0,
          likedByUser: false,
        }
      ];

      const filteredPosts = mockData.filter(post =>
        selectedBarangay.includes("105") ? post.barangay.includes("105") : post.barangay.includes("20")
      );

      setPosts(filteredPosts);
    };

    fetchPosts();
  }, [selectedBarangay]);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Posts for Barangay {selectedBarangay}</h1>
      <div className="space-y-4 p-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="p-4 bg-white shadow-md rounded-lg">
              <h2 className="text-lg font-bold">{post.person}</h2>
              <p>{post.typeOfCalamity}</p>
              <p>{post.inKind}</p>
              {/* Add other post details as necessary */}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No posts available for this barangay.</p>
        )}
      </div>
    </div>
  );
}
