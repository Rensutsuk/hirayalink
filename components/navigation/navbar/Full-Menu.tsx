import Link from 'next/link';

export default function FullMenu() {
	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<Link href="/home" className="btn btn-ghost text-xl">
					<img src="/aidlink.svg" alt="HirayaLink Logo" className="max-w-12" />
				</Link>
				<h2 className="text-xl font-bold">
					<span className="text-primary">HIRAYA</span>
					<span>LINK</span>
				</h2>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1">
					<li>
						<Link href="/home">Home</Link>
					</li>
					<li>
						<Link href="/about">About</Link>
					</li>
					<li>
						<Link href="/contact">Contact</Link>
					</li>
					<li>
						<Link href="/faqs">FAQs</Link>
					</li>
				</ul>
				<div className="dropdown dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost btn-circle avatar"
						onClick={() => console.log('Avatar button clicked')}
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
							<Link href="/login">Login</Link>
						</li>
						<li>
							<Link href="/signup">Sign Up</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
