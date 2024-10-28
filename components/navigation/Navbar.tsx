"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import NavLink from './NavLink';

const Navbar = () => {
  const router = useRouter();
  const [isDonor, setIsDonor] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (session?.user?.userType === "donor") {
      setIsDonor(true);
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
        router.push("/");
        await signOut({ redirect: false });
      } else {
        console.error("Sign out failed");
      }
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  const donorLinks = [
    { href: "/donor/recipient-requests", label: "Recipients" },
    { href: "/donor/barangay-requests", label: "Barangays" },
  ];

  const defaultLinks = [
    { href: "/home", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/faqs", label: "FAQs" },
  ];

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
          {session?.user && isDonor
            ? donorLinks.map((link) => (
                <NavLink key={link.href} {...link} pathname={pathname} />
              ))
            : defaultLinks.map((link) => (
                <NavLink key={link.href} {...link} pathname={pathname} />
              ))}
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
                <li className="menu-item">
                  <button onClick={() => router.push("/donor/profile")}>
                    Profile
                  </button>
                </li>
                <li className="menu-item">
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
