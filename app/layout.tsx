import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "@/styles/globals.css";

const inter = Manrope({ subsets: ["latin"] });

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
				{children}
			</body>
		</html>
	);
}
