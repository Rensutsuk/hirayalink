export default function Landing() {
	return (
		<main>
			<div
				className="hero min-h-screen"
				style={{
					backgroundImage:
						"url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
				}}
			>
				<div className="hero-overlay backdrop-blur-sm"></div>
				<div className="hero-content text-neutral-content text-center">
					<div className="max-w-md">
						<img src="./aidlink.svg" alt="HirayaLink" className="max-w-md" />
						<h1 className="mb-5 text-5xl font-bold">
							<span className="text-primary">HIRAYA</span>
							<span>LINK</span>
						</h1>
						<a role="button" href="/home" className="btn btn-primary">Get Started</a>
					</div>
				</div>
			</div>
		</main>
	);
}
