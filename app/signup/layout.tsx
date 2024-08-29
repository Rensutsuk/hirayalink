export default function SignupLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div
			className="hero min-h-screen"
			style={{
				backgroundImage:
					"url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
			}}
		>
			<div className="hero-overlay bg-opacity-10 backdrop-blur-sm"></div>
			<div className="hero-content text-neutral-content flex flex-col w-full px-2 lg:px-0">
				<h1 className="text-white my-5">
					<span className="inline-block align-middle text-5xl font-bold">
						WELCOME
					</span>
					<span className="inline-block align-middle text-2xl mx-5">to</span>
					<span className="inline-block align-middle text-5xl font-bold">
						AIDLINK
					</span>
				</h1>

				<div className="w-full">{children}</div>
			</div>
		</div>
	);
}
