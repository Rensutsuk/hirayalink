"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import imageCompression from "browser-image-compression";
import { useSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function AdminRequestDonation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const initialFormState = {
    barangayArea: "",
    calamityType: "",
    contactPerson: "",
    contactNumber: "",
    donationDropOff: "",
    donationLandmark: "",
    necessities: [],
    proofFile: null,
    area: "",
    specifications: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const necessities = searchParams.get("necessities")?.split(",") || [];
    const area = searchParams.get("area") || "";
    const calamityType = searchParams.get("calamityType") || "";
    const specifications = searchParams.get("specifications") || "";

    if (session) {
      const barangayName = session.user.brgyName;

      setFormData((prevData) => ({
        ...prevData,
        barangayArea: barangayName,
        calamityType: calamityType,
        necessities: necessities,
        area: area,
        specifications: specifications,
      }));
    }
  }, [searchParams, session]);

  const handleClear = () => {
    setFormData(initialFormState);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
      const formDataToSend = new FormData();
      const {
        barangayArea,
        area,
        calamityType,
        contactPerson,
        contactNumber,
        donationDropOff,
        donationLandmark,
        necessities,
        specifications,
        proofFile,
      } = formData;

      // Append form data
      formDataToSend.append("barangayArea", barangayArea);
      formDataToSend.append("area", area);
      formDataToSend.append("calamityType", calamityType);
      formDataToSend.append("contactPerson", contactPerson);
      formDataToSend.append("contactNumber", contactNumber);
      formDataToSend.append("donationDropOff", donationDropOff);
      formDataToSend.append("donationLandmark", donationLandmark);
      formDataToSend.append("necessities", JSON.stringify(necessities));
      formDataToSend.append("specifications", specifications);

      // Handle file compression if a file is present
      if (proofFile) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(proofFile, options);
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

  const renderNecessitiesAndSpecifications = () => {
    const necessities = formData.necessities;
    const allSpecs = formData.specifications.split("\n\n");

    return (
      <div className="grid grid-cols-3 gap-4">
        <div>
          {necessities.map((necessity, index) => (
            <div key={index} className="mb-2 font-bold">
              {necessity}
            </div>
          ))}
        </div>
        <div className="col-span-2">
          {allSpecs.map((specGroup, index) => (
            <div key={index} className="mb-4">
              {specGroup.split("\n").map((spec, specIndex) => (
                <div key={specIndex} className="text-sm">
                  {spec}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
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
          <div className="card-title rounded-t-xl p-5 bg-primary flex justify-between items-center">
            <h2 className="text-white text-2xl">Fill in the details</h2>
            <button onClick={handleClear} className="btn btn-secondary btn-sm">
              Clear
            </button>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="label">
                  <span className="label-text">Barangay</span>
                </label>
                <input
                  className="input input-bordered input-secondary w-full"
                  id="barangayArea"
                  type="text"
                  name="barangayArea"
                  value={formData.barangayArea}
                  onChange={handleChange}
                  placeholder="e.g., Barangay, Tondo, Manila City"
                  required
                  readOnly
                />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="label">
                    <span className="label-text">Area</span>
                  </label>
                  <input
                    className="input input-bordered input-secondary w-full"
                    id="area"
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="Area"
                    required
                    readOnly
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Calamity Type</span>
                  </label>
                  <select
                    className="select select-bordered select-secondary w-full"
                    id="calamityType"
                    name="calamityType"
                    value={formData.calamityType}
                    onChange={handleChange}
                    required
                    disabled
                  >
                    <option value="" disabled selected>
                      Select Calamity Type
                    </option>
                    <option value="Flood">Flood</option>
                    <option value="Earthquake">Earthquake</option>
                    <option value="Tropical Disease">Tropical Disease</option>
                    <option value="Drought">Drought</option>
                    <option value="Dengue Fever">Dengue Fever</option>
                    <option value="Water Shortage">Water Shortage</option>
                    <option value="Heatwave">Heatwave</option>
                    <option value="Tsunami">Tsunami</option>
                    <option value="Leptospirosis">Leptospirosis</option>
                    <option value="Volcanic Eruption">Volcanic Eruption</option>
                    <option value="Landslide">Landslide</option>
                    <option value="Typhoon">Typhoon</option>
                    <option value="Fire">Fire</option>
                  </select>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">
                      Donation Drop-Off Address
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
                  <span className="label-text">In-Kind Necessities</span>
                </label>
                <div className="p-4 rounded-lg">
                  {renderNecessitiesAndSpecifications()}
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
