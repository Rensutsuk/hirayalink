"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaHandHoldingHeart } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { FaHandHolding } from "react-icons/fa";

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    contactNumber: "",
    password: "",
    userType: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.contactNumber || !formData.password || !formData.userType) {
      setError("Please fill all required fields");
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        contactNumber: formData.contactNumber,
        password: formData.password,
        userType: formData.userType,
      });

      if (result?.ok) {
        if (formData.userType === "donor") {
          router.push("/donor");
        }
        if (formData.userType === "admin") {
          router.push("/admin");
        }
      } else {
        setError(result?.error || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <main>
      <div className="card bg-neutral text-neutral-content min-w-min max-w-3xl">
        <div className="flex flex-row card-body">
          <div className="flex flex-col items-center">
            <h1 className="card-title text-center text-2xl font-bold mb-4">
              LOGIN
            </h1>
            <div className="flex justify-center gap-4 mb-4">
              <button
                type="button"
                className={`btn btn-outline text-xl ${
                  formData.userType === "donor" ? "btn-active" : ""
                }`}
                onClick={() => setFormData({ ...formData, userType: "donor" })}
              >
                <FaHandHoldingHeart />
                Donor
              </button>
              <button
                type="button"
                className={`btn btn-outline text-xl ${
                  formData.userType === "admin" ? "btn-active" : ""
                }`}
                onClick={() => setFormData({ ...formData, userType: "admin" })}
              >
                <RiAdminFill />
                Admin
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row justify-center gap-4">
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Contact Number</span>
                  </label>
                  <input
                    type="text"
                    name="contactNumber"
                    className="input input-bordered w-full"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="input input-bordered w-full"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-control mb-4">
                <button type="submit" className="btn btn-primary w-full">
                  Login
                </button>
              </div>
              <p className="text-center text-sm text-gray-500 mt-5">
                Don't have an account?{" "}
                <a
                  onClick={() => router.push("/signup")}
                  className="font-semibold text-primary hover:text-accent"
                >
                  Sign up here.
                </a>
              </p>
            </form>
          </div>
          <div className="divider divider-primary divider-horizontal">or</div>
          <div className="flex flex-col items-center min-w-fit">
            <h1 className="card-title text-center text-2xl font-bold mb-4">
              REQUEST
            </h1>
            <a role="button" href="request" className="btn btn-outline text-xl">
              <FaHandHolding />
              <span>Recipient</span>
            </a>
          </div>
        </div>
      </div>

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-error text-white px-6 py-3 rounded-lg shadow-lg">
          <p>{error}</p>
        </div>
      )}
    </main>
  );
}
