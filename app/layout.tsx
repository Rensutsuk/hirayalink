import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Providers from "@/components/SessionProvider";
import "@/styles/globals.css";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HirayaLink",
  description: "Donation Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
