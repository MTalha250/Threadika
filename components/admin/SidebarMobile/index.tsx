import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { IoMenu } from "react-icons/io5";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoGridSharp } from "react-icons/io5";
import { MdAddBox } from "react-icons/md";

const SidebarMobile = () => {
  return (
    <Sheet>
      <SheetTrigger className="absolute left-8 top-28 md:hidden">
        <IoMenu className="text-3xl" />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="w-[240px] bg-secondary text-white p-10 shadow-lg border-r-8 border-primary"
      >
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <ul className="mt-6 text-lg space-y-4">
          <li className="flex items-center space-x-3 border-b border-primary py-2">
            <MdDashboard className="text-primary" />{" "}
            <Link
              href="/admin"
              className="hover:text-primary transition duration-300 ease-in-out"
            >
              <SheetClose>Dashboard</SheetClose>
            </Link>
          </li>
          <li className="flex items-center space-x-3 border-b border-primary py-2">
            <FaUser className="text-primary" />{" "}
            <Link
              href="/admin/users"
              className="hover:text-primary transition duration-300 ease-in-out"
            >
              <SheetClose>Users</SheetClose>
            </Link>
          </li>
          <li className="flex items-center space-x-3 border-b border-primary py-2">
            <IoGridSharp className="text-primary" />{" "}
            <Link
              href="/admin/products"
              className="hover:text-primary transition duration-300 ease-in-out"
            >
              <SheetClose>Products</SheetClose>
            </Link>
          </li>
          <li className="flex items-center space-x-3 border-b border-primary py-2">
            <MdAddBox className="text-primary" />{" "}
            <Link
              href="/admin/add-product"
              className="hover:text-primary transition duration-300 ease-in-out"
            >
              <SheetClose>Add Product</SheetClose>
            </Link>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
