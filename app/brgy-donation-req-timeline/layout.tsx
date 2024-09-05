import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
        <Navbar />
				{children}
        <Footer />
			</body>
		</html>
	);
}