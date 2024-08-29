export default function Home() {
	return (
		<main>
			<div
				className="hero min-h-screen"
				style={{
					backgroundImage:
						"url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
				}}
			>
				<div className="hero-overlay bg-opacity-10 backdrop-blur-sm"></div>
				<div className="hero-content text-neutral-content text-center">
					<div className="max-w-md">
						<img src="/aidlink.svg" alt="" className="size-50" />
						<h1 className="mb-5 text-7xl font-bold">
							<span className="text-primary">AID</span>
							<span className="text-white">LINK</span>
						</h1>
						<div className="grid grid-flow-col auto-cols-auto gap-5">
							<button className="btn btn-primary max-w-xs">
								<a href="/signup">Sign Up</a>
							</button>
							<button className="btn btn-primary max-w-xs">
								<a href="/login">Login</a>
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
