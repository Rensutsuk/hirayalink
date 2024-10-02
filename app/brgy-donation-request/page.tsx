"use client";
import React, { useState } from 'react';

export default function DonationRequestPosting() {
    // State to hold form data
    const [formData, setFormData] = useState({
        barangayArea: '',
        calamityType: '',
        contactPerson: '',
        contactNumber: '',
        donationDropOff: '',
        donationLandmark: '',  // Added for landmark
        necessities: [],
        proofFile: null,
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle checkbox changes
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setFormData((prev) => ({
                ...prev,
                necessities: [...prev.necessities, name]
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                necessities: prev.necessities.filter(item => item !== name)
            }));
        }
    };

    // Handle file upload
    const handleFileChange = (e) => {
        setFormData({ ...formData, proofFile: e.target.files[0] });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const isAuthorized = true; // Dummy authorization check

        if (isAuthorized) {
            console.log("Form submitted successfully:", formData);
            alert("Your request has been submitted successfully.");
        } else {
            alert("You are not authorized to submit this form.");
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
                        <form onSubmit={handleSubmit}>
                            {/* Barangay Number and Area */}
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="barangayArea"
                                >
                                    Barangay Number, Area
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="barangayArea"
                                    type="text"
                                    name="barangayArea"
                                    value={formData.barangayArea}
                                    onChange={handleChange}
                                    placeholder="e.g., Barangay 20, Tondo, Manila City"
                                    required
                                />
                            </div>

                            {/* Calamity Type and Donation Drop-Off Area */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
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
                                    </select>
                                </div>
                                <div>
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="donationDropOff"
                                    >
                                        Barangay Donation Drop-Off Area Address
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="donationDropOff"
                                        type="text"
                                        name="donationDropOff"
                                        value={formData.donationDropOff}
                                        onChange={handleChange}
                                        placeholder="Drop-Off Address"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Contact Person, Contact Number, and Donation Drop-Off Landmark */}
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="contactPerson"
                                    >
                                        Person to Contact
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="contactPerson"
                                        type="text"
                                        name="contactPerson"
                                        value={formData.contactPerson}
                                        onChange={handleChange}
                                        placeholder="Complete Name"
                                        required
                                    />
                                </div>
                                <div>
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
                                <div>
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="donationLandmark"
                                    >
                                        Donation Drop-Off Area Landmark
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="donationLandmark"
                                        type="text"
                                        name="donationLandmark"
                                        value={formData.donationLandmark}
                                        onChange={handleChange}
                                        placeholder="Nearby Landmark"
                                        required
                                    />
                                </div>
                            </div>

                            {/* In-Kind Necessities */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    In-Kind Necessities List
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        "Child and Infant Care Items",
                                        "Cleaning and Sanitation Supplies",
                                        "Clothing and Footwear",
                                        "Construction Materials",
                                        "Health",
                                        "Hygiene Supplies",
                                        "Education",
                                        "Electronic Devices",
                                        "Emergency Communication and Connectivity",
                                        "Livelihood Support",
                                        "Food",
                                        "Shelter Materials",
                                        "Solar Energy Solutions",
                                        "Water Filtration and Purification Systems",
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
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Collage Photo of Calamity */}
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="proofFile"
                                >
                                    Collage Photo of Calamity (if applicable)
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="proofFile"
                                    type="file"
                                    name="proofFile"
                                    onChange={handleFileChange}
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
http://localhost:3000/donation-request-output