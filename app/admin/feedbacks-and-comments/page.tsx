"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface BarangayRequestPost {
  id: string;
  area: string;
  barangayId: string;
  nameOfCalamity: string;
  dateTime: string;
  typeOfCalamity: string;
  batchNumber: string;
}

export default function CalamityImpactForm() {
    const { data: session } = useSession();
    const [barangayRequestPosts, setBarangayRequestPosts] = useState<BarangayRequestPost[]>([]);
    const [selectedPostId, setSelectedPostId] = useState('');
    const [selectedPost, setSelectedPost] = useState<BarangayRequestPost | null>(null);
    
    // State to hold form data
    const [formData, setFormData] = useState({
        storyText: '',
        image: null,
    });

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [barangayId, setBarangayId] = useState('');

    useEffect(() => {
        if (session?.user?.id) {
            fetchBarangayDataAndPosts();
        }
    }, [session]);

    const fetchBarangayDataAndPosts = async () => {
        try {
            const response = await fetch('/api/success-stories');
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to fetch data: ${errorData.error}, ${errorData.details}`);
            }
            const data = await response.json();
            console.log("Fetched data:", data); // Log the fetched data
            setBarangayRequestPosts(data.barangayRequestPosts);
            setBarangayId(data.barangayId); // Set the barangayId from the fetched data
        } catch (error) {
            console.error("Error fetching barangay data and posts:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'barangayRequestPost') {
            setSelectedPostId(value);
            const selectedPost = barangayRequestPosts.find(post => post.id === value);
            setSelectedPost(selectedPost || null); // Update selectedPost based on the selected ID
        } else if (name === 'photo') {
            setFormData({ ...formData, image: files[0] }); // Ensure you're setting the image file
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const imageBase64 = formData.image ? await convertToBase64(formData.image) : null;

            const response = await fetch('/api/calamity-impact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    barangayId, // Ensure barangayId is included
                    area: selectedPost?.area,
                    nameOfCalamity: selectedPost?.typeOfCalamity,
                    storyText: formData.storyText,
                    createdAt: new Date().toISOString(),
                    image: imageBase64, // Send the Base64 image
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Calamity impact submitted successfully", result);
                // Show success message
                setShowSuccessMessage(true);
                // Reset form data
                resetForm();
            } else {
                const errorData = await response.json();
                console.error("Failed to submit calamity impact:", errorData.error, errorData.details);
            }
        } catch (error) {
            console.error("Error submitting calamity impact:", error);
        }
    };

    const resetForm = () => {
        setFormData({ storyText: '', image: null });
        setSelectedPostId('');
        setSelectedPost(null);
        setShowSuccessMessage(false); // Optionally hide the success message after resetting
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]); // Get the Base64 part
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div>
            <div className="hero-background bg-cover max-h-[30rem]">
                <div className="py-10 text-center backdrop-blur-sm">
                    <h1 className="text-5xl font-bold text-white">Submit Calamity Impact</h1>
                </div>
            </div>
            <div className="flex justify-center m-10">
                <div className="card outline outline-emerald-500 bg-base-100 w-full shadow-xl">
                    <div className="card-title rounded-t-xl p-5 bg-primary text-center">
                        <h2 className="text-white text-2xl">Fill in the details</h2>
                    </div>
                    <div className="card-body">
                        {showSuccessMessage && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                                <strong className="font-bold">Success!</strong>
                                <span className="block sm:inline"> Your calamity impact has been submitted.</span>
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            {/* Barangay Number */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="barangayNo">
                                    Barangay Number
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="barangayNo"
                                    type="text"
                                    value={barangayId}
                                    readOnly
                                />
                            </div>

                            {/* Barangay Request Post Dropdown */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="barangayRequestPost">
                                    Select Barangay Request Post
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="barangayRequestPost"
                                    name="barangayRequestPost"
                                    value={selectedPostId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a post</option>
                                    {barangayRequestPosts.map((post) => (
                                        <option key={post.id} value={post.id}>
                                            {`${post.dateTime} - ${post.area} - ${post.typeOfCalamity} - Batch: ${post.batchNumber}`}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Area of Selected Post */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Area of Selected Post
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    value={selectedPost?.area || ''}
                                    readOnly
                                />
                            </div>

                            {/* Type of Calamity */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Type of Calamity
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    value={selectedPost?.typeOfCalamity || ''}
                                    readOnly
                                />
                            </div>

                            {/* Story Text */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="storyText">
                                    Story Text
                                </label>
                                <textarea
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="storyText"
                                    name="storyText"
                                    value={formData.storyText}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Upload Photo */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
                                    Upload Photo
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="photo"
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Submit Calamity Impact
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
