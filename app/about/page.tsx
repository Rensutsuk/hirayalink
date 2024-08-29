"use client";
import "../embla.css";
import { EmblaCarousel } from "@/components/EmblaCarousel";
import { MdArrowForwardIos } from "react-icons/md";

export default function About() {
	return (
		<main>
			<div
				className="hero max-h-screen mb-10"
				style={{
					backgroundImage:
						"url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
				}}
			>
				<div className="hero-overlay bg-opacity-10 backdrop-blur-sm"></div>
				<div className="hero-content text-neutral-content text-center py-20">
					<div className="w-screen px-5">
						<h1 className="mb-5 py-10 text-7xl font-bold text-white">
							Your Help Matters
						</h1>
						<p className="text-xl text-white">Together we help those in need</p>
					</div>
				</div>
			</div>
			<div className="flex justify-center grid grid-flow-col auto-col-auto gap-20 mb-10">
				<div className="card bg-primary w-96 shadow-xl text-white">
					<div className="card-body">
						<h2 className="card-title">Mission</h2>
						<p>
							To connect donors with those in need through a centralized
							platform that enhances disaster relief efforts with transparency,
							efficiency, and compassion.
						</p>
					</div>
					<figure>
						<img
							src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
							alt="Shoes"
						/>
					</figure>
				</div>
				<div className="card bg-primary w-96 shadow-xl text-white">
					<div className="card-body">
						<h2 className="card-title">Vission</h2>
						<p>
							To be a leading platform for in-kind donations, ensuring swift,
							impactful support for vulnerable communities at all times.
						</p>
					</div>
					<figure>
						<img
							src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
							alt="Shoes"
						/>
					</figure>
				</div>
			</div>
			<div className="hero max-h-screen py-20 bg-secondary">
				<div className="hero-content text-neutral-content text-center">
					<div className="w-screen px-5">
						<h1 className="my-10 text-7xl font-bold text-white">Welcome!</h1>
						<p className="text-xl text-white">
							Empowering Giving, Every Day, and in Every Way.
						</p>
						<button className="btn btn-primary max-w-xs mt-10">
							Get Started <MdArrowForwardIos />
						</button>
					</div>
				</div>
			</div>
			<div className="flex grid grid-flow-row auto-rows-max justify-center">
				<h1 className="py-10 text-7xl font-bold">Success Stories</h1>
				<EmblaCarousel />
			</div>
		</main>
	);
}
