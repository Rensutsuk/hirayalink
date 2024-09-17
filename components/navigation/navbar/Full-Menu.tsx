export default function FullMenu() {
	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<a className="btn btn-ghost text-xl" href="/home">
					<img src="/aidlink.svg" alt="HirayaLink Logo" className="max-w-12" />
				</a>
				<h2 className="text-xl font-bold">
					<span className="text-primary">HIRAYA</span>
					<span>LINK</span>
				</h2>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1">
					<li>
						<a href="/home">Home</a>
					</li>
					<li>
						<a href="/about">About</a>
					</li>
					<li>
						<a href="/contact">Contact</a>
					</li>
					<li>
						<a href="/faqs">FAQs</a>
					</li>
				</ul>
				<div className="dropdown dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost btn-circle avatar"
					>
						<div className="w-10 rounded-full">
							<img
								alt="Tailwind CSS Navbar component"
								src="/circle-user-solid.svg"
							/>
						</div>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
					>
						<li>
							<a href="/api/auth/select-role">Login</a>
						</li>
						<li>
							<a href="/signup">Sign Up</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
