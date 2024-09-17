"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DonorSignUp() {
	const router = useRouter();

	const [formData, setFormData] = useState({
		name: "",
		orgName: "",
		contactNumber: "",
		address: "",
		password: "",
	});
	const [error, setError] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Basic form validation
		if (!formData.name || !formData.contactNumber || !formData.password) {
			setError("Please fill all required fields");
			return;
		}

		try {
			const res = await fetch("/api/signup/donor", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await res.json(); // Parse the response data

			if (res.ok) {
				router.push("/login"); // Redirect on success
			} else {
				setError(data.message || "Sign up failed"); // Display error message from the backend
			}
		} catch (err) {
			setError("Something went wrong");
		}
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<form
				onSubmit={handleSubmit}
				className="bg-base-100 p-6 rounded-lg shadow-lg min-w-sm w-96"
			>
				<h2 className="text-2xl font-bold text-center mb-5">Donor Sign-Up</h2>

				{error && <p className="text-alert mb-4">{error}</p>}

				<div className="form-control mb-4">
					<label className="label">
						<span className="label-text">Name</span>
					</label>
					<input
						type="text"
						name="name"
						className="input input-bordered w-full"
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className="form-control mb-4">
					<label className="label">
						<span className="label-text">Organization Name</span>
					</label>
					<input
						type="text"
						name="orgName"
						className="input input-bordered w-full"
						onChange={handleInputChange}
						required
					/>
				</div>

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
						<span className="label-text">Address</span>
					</label>
					<input
						type="text"
						name="address"
						className="input input-bordered w-full"
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className="form-control mb-6">
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

				<button type="submit" className="btn btn-primary w-full">
					Sign Up
				</button>
			</form>
		</div>
	);
}
