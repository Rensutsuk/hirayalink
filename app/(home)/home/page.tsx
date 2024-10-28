"use client";
import "@/styles/embla.css";
import { EmblaCarousel } from "@/components/EmblaCarousel";
import { useEffect, useState } from "react";

interface SlideData {
	calamityImpacts: Array<{
		id: string;
		area: string;
		nameOfCalamity: string;
		storyText: string | null;
		image: Buffer | null;
		Barangay: { name: string } | null;
	}>;
	successStories: Array<{
		id: string;
		area: string | null;
		nameOfCalamity: string | null;
		storyText: string | null;
		image: Buffer | null;
		Barangay: { name: string } | null;
	}>;
}

export default function Home() {
	const [slideData, setSlideData] = useState<SlideData | null>(null);

	useEffect(() => {
		const fetchSlides = async () => {
			try {
				const response = await fetch('/api/slides');
				const data = await response.json();
				setSlideData(data);
			} catch (error) {
				console.error('Failed to fetch slides:', error);
			}
		};

		fetchSlides();
	}, []);

	return (
		<main>
			{/* Hero Section */}
			<div className="hero-background bg-cover max-h-[30rem] mb-20">
				<div className="text-center pt-10 pb-20 backdrop-blur-sm">
					<h1 className="mb-5 py-10 text-5xl font-bold text-white">
						Your Help Matters
					</h1>
					<p className="text-xl text-white py-5">
						Together we help those in need
					</p>
				</div>
			</div>

			{/* Mission and Vision Section */}
			<div className="flex flex-col mx-5">
				<div className="grid grid-flow-col auto-col-auto justify-center gap-20">
					<div className="card bg-primary max-w-96 shadow-xl text-white bottom-36">
						<div className="card-body">
							<h2 className="card-title">Mission</h2>
							<p>
								To connect donors with those in need through a centralized
								platform that enhances disaster relief efforts with transparency,
								efficiency, and compassion.
							</p>
						</div>
						<figure>
							<img src="./mission-vission/mission.jpg" alt="Mission" />
						</figure>
					</div>
					<div className="card bg-primary max-w-96 shadow-xl text-white bottom-36">
						<div className="card-body">
							<h2 className="card-title">Vision</h2>
							<p>
								To be a leading platform for in-kind donations, ensuring swift,
								impactful support for vulnerable communities at all times.
							</p>
						</div>
						<figure>
							{/* Ensure the image path is correct */}
							<img src="./mission-vission/vision.png" alt="Vision" />
						</figure>
					</div>
				</div>

				{/* Welcome Section */}
				<div className="text-center mb-10">
					<h1 className="mb-10 text-5xl font-bold">WELCOME!</h1>
					<p className="text-xl">
						Empowering Giving, Every Day, and in Every Way.
					</p>
					<a
						role="button"
						className="btn btn-outline btn-wide mt-10"
						href="/learn-more"
					>
						Learn More
					</a>
				</div>
			</div>

			{/* Slideshow Section */}
			<div className="grid grid-cols-2 gap-20 p-20 justify-center items-start">
				{/* Calamity Impact Slideshow */}
				<div className="w-full h-[450px] shadow-2xl shadow-red-300 rounded-lg overflow-hidden">
					<h2 className="text-4xl font-bold py-3 text-center">
						CALAMITY IMPACT
					</h2>
					{slideData ? (
						<div className="h-[calc(100%-4rem)] pb-10">
							<EmblaCarousel 
								slides={slideData.calamityImpacts} 
								type="calamity"
							/>
						</div>
					) : (
						<div className="h-full flex items-center justify-center">
								<span className="loading loading-spinner loading-lg text-primary"></span>
						</div>
					)}
				</div>

				{/* Stories of Change Slideshow */}
				<div className="w-full h-[450px] shadow-2xl shadow-blue-300 rounded-lg overflow-hidden">
					<h2 className="text-4xl font-bold py-3 text-center">
						STORIES OF CHANGE
					</h2>
					{slideData ? (
						<div className="h-[calc(100%-4rem)] pb-10">
							<EmblaCarousel 
								slides={slideData.successStories} 
								type="success"
							/>
						</div>
					) : (
						<div className="h-full flex items-center justify-center">
							<span className="loading loading-spinner loading-lg text-primary"></span>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
