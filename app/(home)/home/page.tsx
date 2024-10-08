"use client";
import "@/styles/embla.css";
import { EmblaCarousel } from "@/components/EmblaCarousel";

export default function Home() {
	return (
		<main>
			<div className="hero-background bg-cover max-h-[30rem] mb-20">
				<div className="text-center pt-10 pb-20 backdrop-blur-sm ">
					<h1 className="mb-5 py-10 text-5xl font-bold text-white">
						Your Help Matters
					</h1>
					<p className="text-xl text-white py-5">
						Together we help those in need
					</p>
				</div>
			</div>
			<div className="flex flex-col mx-5">
				<div className="grid grid-flow-col auto-col-auto justify-center gap-20">
					<div className="card bg-primary max-w-96 shadow-xl text-white bottom-36">
						<div className="card-body">
							<h2 className="card-title">Mission</h2>
							<p>
								To connect donors with those in need through a centralized
								platform that enhances disaster relief efforts with
								transparency, efficiency, and compassion.
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
				<div className="text-center mb-10">
					<h1 className="mb-10 text-5xl font-bold">WELCOME!</h1>
					<p className="text-xl">
						Empowering Giving, Every Day, and in Every Way.
					</p>
					<a
  						role="button"
  							className="btn btn-outline btn-wide mt-10"
 						 href="/learn-more"  // Update the href to match the learn-more page
>
  						Learn More
					</a>

				</div>
			</div>
			<div className="grid grid-flow-row py-20 auto-rows-max justify-center bg-gradient-to-t from-transparent from-5% via-green-300 via-85% to-transparent to-100%">
				<h1 className="text-5xl mb-10 font-bold">STORIES OF CHANGE</h1>
				<EmblaCarousel />
			</div>
		</main>
	);
}


