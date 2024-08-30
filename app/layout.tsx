import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "AidLink",
	description: "Donation Website",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="navbar bg-base-100">
					<div className="flex-1">
						<a className="btn btn-ghost text-xl" href="/">
							HIRAYALINK
						</a>
					</div>
					<div className="flex-none">
						<ul className="menu menu-horizontal px-1">
							<li>
								<a href="/">Home</a>
							</li>
							<li>
								<a href="about">About</a>
							</li>
							<li>
								<a href="contact">Contact</a>
							</li>
							<li>
								<a href="#">FAQs</a>
							</li>
						</ul>
					</div>
				</div>
				{children}
				<footer className="footer footer-center bg-base-300 text-base-content p-4">
					<aside>
						<p>
							Copyright © {new Date().getFullYear()} - All right reserved by
							HIRAYALINK
						</p>
					</aside>
				</footer>
			</body>
		</html>
	);
}
