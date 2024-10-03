import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Providers from "@/components/SessionProvider";
import "@/styles/globals.css";
const inter = Manrope({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
