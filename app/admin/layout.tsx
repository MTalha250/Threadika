"use client";
import Sidebar from "@/components/admin/sidebar";
import Link from "next/link";
import img from "@/assets/notauth.webp";
import { useSession } from "next-auth/react";
import SidebarMobile from "@/components/admin/SidebarMobile";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useSession();
  const user = data?.user;
  if (user?.role != "admin") {
    return (
      <div className="w-full h-screen flex items-center justify-center px-8">
        <div className="flex flex-col items-center">
          <img src={img.src} alt="" className="w-[400px]" />
          <h1 className="text-secondary my-5 font-bold text-center text-3xl md:text-4xl font-bask">
            You are not authorized to view this page
          </h1>
          <p className="text-center text-xl text-secondary">
            Go back to{" "}
            <Link href="/" className="text-primary font-bold underline italic">
              Home
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 flex min-h-screen">
      <Sidebar />
      <SidebarMobile />
      <div className="w-full overflow-hidden p-8">{children}</div>
    </div>
  );
}
