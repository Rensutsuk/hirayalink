"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";

export default function AdminRequestDonation() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    barangayArea: "",
    calamityType: "",
    contactPerson: "",
    contactNumber: "",
    donationDropOff: "",
    donationLandmark: "",
    necessities: [],
    proofFile: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      necessities: checked
        ? [...prevData.necessities, name]
        : prevData.necessities.filter((item) => item !== name),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        proofFile: e.target.files[0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let compressedFile = null;
      if (formData.proofFile) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        compressedFile = await imageCompression(formData.proofFile, options);
      }

      const formDataToSend = new FormData();
      formDataToSend.append("barangayArea", formData.barangayArea);
      formDataToSend.append("calamityType", formData.calamityType);
      formDataToSend.append("contactPerson", formData.contactPerson);
      formDataToSend.append("contactNumber", formData.contactNumber);
      formDataToSend.append("donationDropOff", formData.donationDropOff);
      formDataToSend.append("donationLandmark", formData.donationLandmark);
      formDataToSend.append(
        "necessities",
        JSON.stringify(formData.necessities)
      );
      if (compressedFile) {
        formDataToSend.append("proofFile", compressedFile);
      }

      const response = await fetch("/api/barangay-request", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Your request has been submitted successfully.");
        router.push("/admin");
      } else {
        console.error("Failed to submit form data");
      }
    } catch (error) {
      console.error("Error:", error);
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
        <div className="card w-full bg-base-100 shadow-xl">
          <div className="card-title rounded-t-xl p-5 bg-primary">
            <h2 className="text-white text-2xl">Fill in the details</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="label">
                  <span className="label-text">Barangay Number, Area</span>
                </label>
                <input
                  className="input input-bordered input-secondary w-full"
                  id="barangayArea"
                  type="text"
                  name="barangayArea"
                  value={formData.barangayArea}
                  onChange={handleChange}
                  placeholder="e.g., Barangay 20, Tondo, Manila City"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="label">
                    <span className="label-text">Type of Calamity</span>
                  </label>
                  <select
                    className="select select-secondary w-full"
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
                  <label className="label">
                    <span className="label-text">
                      Barangay Donation Drop-Off Area Address
                    </span>
                  </label>
                  <input
                    className="input input-bordered input-secondary w-full"
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

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="label">
                    <span className="label-text">Person to Contact</span>
                  </label>
                  <input
                    className="input input-bordered input-secondary w-full"
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
                  <label className="label">
                    <span className="label-text">Contact Number</span>
                  </label>
                  <input
                    className="input input-bordered input-secondary w-full"
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
                  <label className="label">
                    <span className="label-text">
                      Donation Drop-Off Area Landmark
                    </span>
                  </label>
                  <input
                    className="input input-bordered input-secondary w-full"
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

              <div className="mb-4">
                <label className="label">
                  <span className="label-text">In-Kind Necessities List</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Education",
                    "Health",
                    "Food",
                    "Electronic Devices",
                    "Livelihood Support",
                    "Construction Materials",
                    "Solar Energy Solutions",
                    "Water Filtration and Purification Systems",
                    "Livestock and Animal care",
                    "Planting materials",
                    "Emergency Communication and Connectivity",
                    "Shelter Materials",
                    "Hygiene Supplies",
                    "First Aid Kit Essentials",
                    "Fire Prevention and Safety Products",
                    "Clothing and Footware",
                    "Cleaning and Sanitary Supplies",
                    "Child and Infant Care Items",
                  ].map((necessity) => (
                    <div key={necessity} className="flex items-center">
                      <label className="label cursor-pointer">
                        <input
                          type="checkbox"
                          name={necessity}
                          checked={formData.necessities.includes(necessity)}
                          onChange={handleCheckboxChange}
                          className="checkbox checkbox-primary"
                        />
                        <span className="ml-2">{necessity}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="label">
                  <span className="label-text">
                    Collage Photo of Calamity (if applicable)
                  </span>
                </label>
                <input
                  className="file-input file-input-bordered file-input-primary w-full"
                  id="proofFile"
                  type="file"
                  name="proofFile"
                  onChange={handleFileChange}
                />
              </div>

              <div className="flex justify-end">
                <button className="btn btn-primary text-white" type="submit">
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
