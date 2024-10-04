"use client";

import Navbar from "@/components/admin/navigation/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Navbar />
      <main className="flex-1 overflow-auto ml-0 md:ml-72">
        {children}
      </main>
    </div>
  );
}