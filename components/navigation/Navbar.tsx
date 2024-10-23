"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [isDonor, setIsDonor] = useState(false); // State to track if user is a donor
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Session data:", session);
    console.log("Session status:", status);
    // Set donor status based on session data
    if (session?.user) {
      setIsDonor(true); // Adjust this logic based on your actual donor check
    }
  }, [session, status]);

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
    <div className="navbar bg-base-100 sticky top-0 z-50">
      <div className="flex-1">
        <Link href="/home" className="btn btn-ghost text-xl">
          <Image
            src="/aidlink.svg"
            alt="HirayaLink Logo"
            className="max-w-12"
            width={100}
            height={100}
          />
        </Link>
        <h2 className="text-xl font-bold">
          <span className="text-primary">HIRAYA</span>
          <span>LINK</span>
        </h2>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {session?.user && isDonor ? (
            <>
              <li className={router.pathname === "/donor/recipient-requests" ? "active" : ""}>
                <Link href="/donor/recipient-requests">Recipients</Link>
              </li>
              <li className={router.pathname === "/donor/barangay-requests" ? "active" : ""}>
                <Link href="/donor/barangay-requests">Barangays</Link>
              </li>
            </>
          ) : (
            <>
              <li className={router.pathname === "/home" ? "active" : ""}>
                <Link href="/home">Home</Link>
              </li>
              <li className={router.pathname === "/about" ? "active" : ""}>
                <Link href="/about">About</Link>
              </li>
              <li className={router.pathname === "/contact" ? "active" : ""}>
                <Link href="/contact">Contact</Link>
              </li>
              <li className={router.pathname === "/faqs" ? "active" : ""}>
                <Link href="/faqs">FAQs</Link>
              </li>
            </>
          )}
        </ul>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                alt="User avatar"
                src={session?.user?.image || "/circle-user-solid.svg"}
                width={100}
                height={100}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {session?.user ? (
              <>
                <li className="menu-title text-primary">
                  <span>{session.user.name || "User"}</span>
                </li>
                <li>
                  <button onClick={handleSignOut}>Sign Out</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <Link href="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
