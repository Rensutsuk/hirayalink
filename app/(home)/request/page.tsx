"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import imageCompression from 'browser-image-compression'; // You'll need to install this package

export default function DonationRequestPosting() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    familyMembers: "",
    contactNumber: "",
    email: "",
    barangay: "",
    calamityType: "",
    necessities: [],
    specifyNecessities: {},
    proofFile: null,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSpecifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      specifyNecessities: { ...prevData.specifyNecessities, [name]: value },
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      necessities: checked
        ? [...prevData.necessities, name]
        : prevData.necessities.filter(item => item !== name)
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prevData => ({
        ...prevData,
        proofFile: e.target.files![0]
      }));
    }
  };

  // Handle form input changes
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Compress the image
      let compressedFile = null;
      if (formData.proofFile) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        }
        compressedFile = await imageCompression(formData.proofFile, options);
      }

      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append('completeName', formData.fullName);
      formDataToSend.append('age', formData.age);
      formDataToSend.append('noOfFamilyMembers', formData.familyMembers);
      formDataToSend.append('contactNumber', formData.contactNumber);
      formDataToSend.append('emailAddress', formData.email);
      formDataToSend.append('barangay', formData.barangay);
      formDataToSend.append('typeOfCalamity', formData.calamityType);
      formDataToSend.append('inKindNecessities', formData.necessities.join(', '));
      formDataToSend.append('specifications', JSON.stringify(formData.specifyNecessities));
      if (compressedFile) {
        formDataToSend.append('proofOfResidence', compressedFile);
      }

      const response = await fetch('/api/recipient-request', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        alert('Your request has been submitted successfully.');
        router.push('/');
      } else {
        throw new Error('Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting your request. Please try again.');
    }
  };

  return (
    <div>
      <div className="hero-background bg-cover max-h-[30rem]">
        <div className="py-10 text-center backdrop-blur-sm">
          <h1 className="text-5xl font-bold text-white">
            Donation Request Posting
          </h1>
        </div>
      </div>
      <div className="flex justify-center m-10">
        <div className="card outline outline-emerald-500 bg-base-100 w-full shadow-xl">
          <div className="card-title rounded-t-xl p-5 bg-primary">
            <h2 className="text-white text-2xl">Fill in the details</h2>
          </div>
          <div className="card-body">
            <h2 className="text-center">Head of the Family</h2>
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                />
              </div>
              {/* Age and Contact Number */}
              <div className="flex space-x-4 mb-4">
                <div className="w-1/2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="age"
                  >
                    Age
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="age"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="contactNumber"
                  >
                    Contact Number
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="contactNumber"
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="Contact Number"
                    required
                  />
                </div>
              </div>
              {/* Email and Number of Family Members */}
              <div className="flex space-x-4 mb-4">
                <div className="w-1/2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email Address (Optional)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                  />
                </div>
                <div className="w-1/2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="familyMembers"
                  >
                    No. of Family Members
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="familyMembers"
                    type="number"
                    name="familyMembers"
                    value={formData.familyMembers}
                    onChange={handleChange}
                    placeholder="Number of Family Members"
                    required
                  />
                </div>
              </div>
              {/* Barangay Number Area */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="barangay"
                >
                  Barangay Number, Area
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="barangay"
                  name="barangay"
                  value={formData.barangay}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Barangay</option>
                  <option value="Barangay 1">
                    Antonio Rivera Street, Barangay 20, Zone 2, District 1,
                    Tondo, Manila,
                  </option>
                  <option value="Barangay 2">
                    Sandejas Street, Barangay 20, Zone 2, District 1, Tondo,
                    Manila
                  </option>
                  <option value="Barangay 3">
                    Paz Street, Barangay 20, Zone 2, District 1, Tondo, Manila
                  </option>
                  <option value="Barangay 4">
                    Reina Regente Street, Barangay 20, Zone 2, District 1,
                    Tondo, Manila
                  </option>
                  <option value="Barangay 5">
                    Divisoria, Barangay 20, Zone 2, District 1, Tondo, Manila
                  </option>
                  <option value="Barangay 6">
                    Raja Matanda Street, Barangay 105, Zone 8, District 1,
                    Tondo, Manila
                  </option>
                  <option value="Barangay 7">
                    Perla Street, Barangay 105, Zone 8, District 1, Tondo,
                    Manila
                  </option>
                  <option value="Barangay 8">
                    Mel Lopez Boulevard, Barangay 105, Zone 8, District 1,
                    Tondo, Manila
                  </option>
                  <option value="Barangay 9">
                    Road 10 (R-10), Barangay 105, Zone 8, District 1, Tondo,
                    Manila
                  </option>
                  <option value="Barangay 10">
                    Lakandula Street, Barangay 105, Zone 8, District 1, Tondo,
                    Manila
                  </option>
                  {/* Add more options as needed */}
                </select>
              </div>
              {/* Type of Calamity */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="calamityType"
                >
                  Type of Calamity
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="calamityType"
                  name="calamityType"
                  value={formData.calamityType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Calamity Type</option>
                  <option value="Flood">Flood</option>
                  <option value="Earthquake">Earthquake</option>
                  <option value="Fire">Fire</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              {/* In-Kind Necessities */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  In-Kind Necessities{" "}
                  <span className="text-gray-500">
                    (Cash is not included in the donation request)
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Child and Infant Care Items",
                    "Clothing and Footwear",
                    "Education",
                    "Emergency Communications and Connectivity",
                    "First Aid Kit Essentials",
                    "Health",
                    "Livelihood Support",
                    "Meal Essentials",
                    "Shelter",
                    "Water, Sanitation, and Hygiene",
                  ].map((necessity) => (
                    <div key={necessity} className="relative flex items-center">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name={necessity}
                          checked={formData.necessities.includes(necessity)}
                          onChange={handleCheckboxChange}
                        />
                        <span className="ml-2">{necessity}</span>
                      </label>
                      {formData.necessities.includes(necessity) && (
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-4"
                          id={`specify-${necessity}`}
                          type="text"
                          name={necessity}
                          value={formData.specifyNecessities[necessity] || ""}
                          onChange={handleSpecifyChange}
                          placeholder="Please specify"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="proofFile"
                >
                  Proof of Residence (e.g., Government ID, Utility Bill)
                </label>
                <input
                  className="file-input file-input-bordered file-input-primary w-full"
                  id="proofFile"
                  type="file"
                  name="proofFile"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="btn btn-primary btn-md text-white"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
