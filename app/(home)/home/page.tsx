"use client";
import "@/styles/embla.css";
import { EmblaCarousel } from "@/components/EmblaCarousel";

export default function Home() {
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
						href="/donation-request-posting"
					>
						Learn More
					</a>
				</div>
			</div>

			{/* Slideshow Section for Calamity Impact and Stories of Change */}
			<div className="grid grid-cols-2 gap-20 px-10 py-20 justify-center items-start">
				{/* Calamity Impact Slideshow */}
				<div className="w-full h-[600px] shadow-2xl shadow-red-300 rounded-lg overflow-hidden"> {/* Increased height */}
					<h2 className="text-4xl font-bold mb-5 text-center">
						CALAMITY IMPACT
					</h2>
					<EmblaCarousel slides={[
						{
							src: "https://as1.ftcdn.net/v2/jpg/03/84/47/48/1000_F_384474808_cogKpmVX9RrqthcevsWMlATgUwl2vZ4N.jpg",
							description: "Rescue efforts in the aftermath of a devastating typhoon, showcasing volunteers working tirelessly to provide relief to affected families."
						},
						{
							src: "https://w.ndtvimg.com/sites/3/2023/06/16124036/thumbnail_660-58.jpg",
							description: "A community gathers to distribute essential supplies, highlighting the spirit of solidarity and support during challenging times."
						},
						{
							src: "https://www.childfund.org/contentassets/7ccaf1fc17ec4b0da9843389c6fd3f45/rs18432.jpg",
							description: "Children receiving educational materials post-disaster, emphasizing the importance of continued education despite calamities."
						}
					]} />
				</div>

				{/* Stories of Change Slideshow */}
				<div className="w-full h-[600px] shadow-2xl shadow-blue-300 rounded-lg overflow-hidden"> {/* Increased height */}
					<h2 className="text-4xl font-bold mb-5 text-center">
						STORIES OF CHANGE
					</h2>
					<EmblaCarousel slides={[
						{
							src: "https://www.neefusa.org/sites/default/files/field/image/WEB19-HealthWellness-GivingBack-Volunteering-Donating-4800x2699.jpg",
							description: "Community members unite to rebuild homes, demonstrating resilience and the power of collective action after a disaster."
						},
						{
							src: "https://image.savethechildren.org/three-friends-tanya-shathi-and-jhumur-ch11043036.jpg/pxvvof42byj6mv8betnp40w6ou100q50.jpg",
							description: "A group of volunteers engaging with families, sharing resources, and creating lasting connections through in-kind donations."
						},
						{
							src: "https://www.globalgiving.org/pfil/7790/pict_original.jpg",
							description: "Success stories of families thriving after receiving support, highlighting the transformative impact of community-driven relief efforts."
						}
					]} />
				</div>
			</div>
		</main>
	);
}
