"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import Navbar from "@/components/admin/navigation/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        await signOut({ redirect: false });
        window.location.href = "/";
      } else {
        console.error("Sign out failed");
      }
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-green-200 p-4 flex justify-end items-center">
          {session?.user ? (
            <div className="relative flex items-center">
              <div className="text-right mr-4">
                <p className="font-semibold">
                  <span>{session.user.name || "User"}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Barangay <span>{session.user.brgyNumber || "N/A"}</span>
                </p>
              </div>
              <button
                className="text-gray-600 hover:text-gray-800 ml-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FaChevronDown />
              </button>
              <div
                className={`absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg ${
                  isDropdownOpen ? "" : "hidden"
                }`}
              >
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div>
              <Link href="/login" className="btn btn-ghost">
                Login
              </Link>
            </div>
          )}
        </header>
        <main className="flex-1 overflow-auto ml-0 md:ml-72 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
