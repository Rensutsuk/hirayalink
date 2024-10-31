"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface BarangayRequestPost {
  id: string;
  dateTime: string;
  area: string; // Include area in the interface
  barangayId: string;
  typeOfCalamity: string;
  batchNumber: number;
  donorIds: string[];
}

export default function SuccessStoryForm() {
  const { data: session } = useSession();
  const [barangayNo, setBarangayNo] = useState("");
  const [barangayRequestPosts, setBarangayRequestPosts] = useState<
    BarangayRequestPost[]
  >([]);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [selectedPostArea, setSelectedPostArea] = useState(""); // State to hold selected post area
  const [selectedPostBatchNumber, setSelectedPostBatchNumber] = useState(""); // State to hold selected post batch number
  const [donorIds, setDonorIds] = useState("");

  // State to hold form data
  const [formData, setFormData] = useState({
    barangayNo: "",
    calamityName: "",
    controlNumber: "",
    transactionIds: "",
    batchNumber: "",
    numberOfRecipients: "",
    storyText: "",
    photo: null as File | null,
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      fetchBarangayDataAndPosts();
    }
  }, [session]);

  const fetchBarangayDataAndPosts = async () => {
    try {
      const response = await fetch("/api/success-stories");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to fetch data: ${errorData.error}, ${errorData.details}`
        );
      }
      const data = await response.json();
      setBarangayNo(data.barangayId);
      setBarangayRequestPosts(data.barangayRequestPosts);
      setFormData((prevData) => ({ ...prevData, barangayNo: data.barangayId }));
    } catch (error) {
      console.error("Error fetching barangay data and posts:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement; // Type assertion for files property
    if (name === "barangayRequestPost") {
        setSelectedPostId(value);
        const selectedPost = barangayRequestPosts.find(
            (post) => post.id === value
        );
        if (selectedPost) {
            setSelectedPostArea(selectedPost.area); // Set the area of the selected post
            if (selectedPost.batchNumber !== undefined) { // Check if batchNumber is defined
                setSelectedPostBatchNumber(selectedPost.batchNumber.toString()); // Set the batch number of the selected post
            } else {
                console.error("Batch number is undefined for the selected post.");
                setSelectedPostBatchNumber(""); // Reset if undefined
            }
            setFormData({
                ...formData,
                calamityName: selectedPost.typeOfCalamity,
                controlNumber: selectedPost.id,
                transactionIds: selectedPost.donorIds.join(", "), // Join the array with commas
            });
        } else {
            console.error("Selected post not found in barangayRequestPosts.");
            setSelectedPostArea(""); // Reset area if post is not found
            setSelectedPostBatchNumber(""); // Reset batch number if post is not found
        }
    } else if (name === "photo" && files && files.length > 0) {
        // Handle file input
        setFormData({ ...formData, photo: files[0] }); // Set the first file
    } else {
        setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    try {
        const imageBase64 = formData.photo
            ? await convertToBase64(formData.photo)
            : null;

        const response = await fetch("/api/success-stories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postId: selectedPostId, // Use selectedPostId here
                nameOfCalamity: formData.calamityName,
                controlNumber: formData.controlNumber,
                batchNumber: selectedPostBatchNumber, // Ensure this is the selected batch number
                numberOfRecipients: formData.numberOfRecipients,
                storyText: formData.storyText,
                image: imageBase64,
            }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Success story submitted successfully", result);
            setShowSuccessMessage(true);

            // Reset form data
            setFormData({
                barangayNo: "",
                calamityName: "",
                controlNumber: "",
                transactionIds: "",
                batchNumber: "",
                numberOfRecipients: "",
                storyText: "",
                photo: null,
            });
            setSelectedPostId(""); // Reset selected post ID
            setSelectedPostArea(""); // Reset selected post area
            setSelectedPostBatchNumber(""); // Reset selected post batch number
        } else {
            const errorData = await response.json();
            console.error("Failed to submit success story:", errorData.error, errorData.details);
        }
    } catch (error) {
        console.error("Error submitting success story:", error);
    }
  };

  const convertToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString().split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div>
      <div className="hero-background bg-cover max-h-[30rem]">
        <div className="py-10 text-center backdrop-blur-sm">
          <h1 className="text-5xl font-bold text-white">
            Submit Success Story
          </h1>
        </div>
      </div>
      <div className="flex justify-center m-10">
        <div className="card outline outline-emerald-500 bg-base-100 w-full shadow-xl">
          <div className="card-title rounded-t-xl p-5 bg-primary text-center">
            <h2 className="text-white text-2xl">Fill in the details</h2>
          </div>
          <div className="card-body">
            {showSuccessMessage && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline">
                  {" "}
                  Your success story has been submitted.
                </span>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              {/* Barangay Number */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="barangayNo"
                >
                  Barangay Number, Area
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="barangayNo"
                  type="text"
                  name="barangayNo"
                  value={formData.barangayNo}
                  readOnly
                />
              </div>

              {/* Barangay Request Post Dropdown */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="barangayRequestPost"
                >
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

              {/* Display Area of Selected Post */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Area of Selected Post
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={selectedPostArea}
                  readOnly
                />
              </div>

              {/* Calamity Name */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="calamityName"
                >
                  Name of the Calamity
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="calamityName"
                  type="text"
                  name="calamityName"
                  value={formData.calamityName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Control Number */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="controlNumber"
                >
                  Control Number of Barangay Post
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="controlNumber"
                  type="text"
                  name="controlNumber"
                  value={formData.controlNumber}
                  readOnly
                />
              </div>

              {/* Transaction IDs */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="transactionIds"
                >
                  Transaction IDs (Donor IDs)
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="transactionIds"
                  type="text"
                  name="transactionIds"
                  value={formData.transactionIds}
                  readOnly
                />
              </div>

              {/* Batch Number */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="batchNumber"
                >
                  Batch Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="batchNumber"
                  type="text"
                  name="batchNumber"
                  value={selectedPostBatchNumber}
                  readOnly
                />
              </div>

              {/* Number of Recipients */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="numberOfRecipients"
                >
                  Number of Recipients
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="numberOfRecipients"
                  type="number"
                  name="numberOfRecipients"
                  value={formData.numberOfRecipients}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Story Text */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="storyText"
                >
                  Success Story
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
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="photo"
                >
                  Upload Photo
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="photo"
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange} // Ensure this calls handleChange
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit Success Story
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
