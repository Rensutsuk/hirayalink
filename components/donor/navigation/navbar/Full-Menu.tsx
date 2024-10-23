"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FullMenu() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Session data:", session);
    console.log("Session status:", status);
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
    <div className="navbar bg-base-100 sticky top-0 z-40">
      <div className="flex-1">
        <Link href="/donor" className="btn btn-ghost text-xl">
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
            <Link href="/donor">Home</Link>
          </li>
          <li>
            <Link href="/donor/recipient-requests">Recipients</Link>
          </li>
          <li>
            <Link href="/donor/barangay-requests">Barangays</Link>
          </li>
          <li>
            <Link href="/faqs">FAQs</Link>
          </li>
        </ul>
        {session?.user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src={session.user?.image || "/circle-user-solid.svg"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li className="menu-title text-primary">
                <span>{session.user.name || "User"}</span>
              </li>
              <li>
                <button onClick={handleSignOut}>Sign Out</button>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <Link href="/login" className="btn btn-ghost">
              Login
            </Link>
            <Link href="/register" className="btn btn-primary">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
