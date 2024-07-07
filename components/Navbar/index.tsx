import React, { useEffect, useState } from "react";
import { navLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { signOut, useSession } from "next-auth/react";
import logo from "@/assets/logo.png";
import logo2 from "@/assets/logo2.png";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { HiOutlineUser } from "react-icons/hi2";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Profile from "../profile";
import toast from "react-hot-toast";
import Cart from "../cart";
import Wishlist from "../wishlist";

const Navbar = () => {
  const { items, initCart } = useCartStore();
  const { initWishlist } = useWishlistStore();
  const { data, update } = useSession();
  const user = data?.user;
  const pathname = usePathname();
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    if (user) {
      initCart(user.cart);
      initWishlist(user.wishlist);
    }
  }, [user]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  });
  return (
    <div
      className={
        scroll || pathname !== "/"
          ? "z-50 fixed bg-primary text-secondary shadow-lg px-8 py-5 w-full flex items-center justify-between"
          : "z-50 fixed bg-transparent text-primary px-8 py-5 w-full flex items-start justify-between"
      }
    >
      <Link
        href="/"
        className="flex items-center justify-center  d transition-colors duration-300"
      >
        {scroll || pathname !== "/" ? (
          <img src={logo2.src} alt="logo" className="w-32" />
        ) : (
          <img src={logo.src} alt="logo" className="w-20" />
        )}
      </Link>
      <div className="flex gap-10 items-center">
        <ul className="items-center justify-center space-x-5 lg:space-x-10 md:flex hidden mt-1.5">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="flex items-center border-b-2 border-transparent pb-1 hover:border-primary transition duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="font-semibold text-sm items-center space-x-2 md:space-x-3">
          <Wishlist />
          <Cart />
          {user?.name ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none ring-0 hidden md:inline">
                <div
                  className={
                    scroll || pathname !== "/"
                      ? "p-3 border border-black bg-transparent  dark:border-white relative group transition duration-200"
                      : "p-3 border border-white bg-transparent   dark:border-white relative group transition duration-200"
                  }
                >
                  <div className="absolute bottom-0 right-0 bg-primary h-full w-full -z-10 group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
                  <span className="relative text-white">Hi, {user?.name}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Profile />
                <DropdownMenuItem
                  className="cursor-pointer text-center block"
                  onClick={() => {
                    signOut({
                      redirect: false,
                    });
                    toast.success("Logged out successfully");
                  }}
                >
                  Logout
                </DropdownMenuItem>
                {user?.role == "admin" && (
                  <DropdownMenuSeparator className="bg-neutral-200" />
                )}
                {user?.role == "admin" && (
                  <Link
                    href="/admin"
                    className="flex justify-center border py-1 border-black bg-transparent  dark:border-white relative group transition duration-200"
                  >
                    <div className="absolute bottom-0 right-0 bg-primary h-full w-full group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
                    <span className="relative text-sm font-semibold text-white">
                      Admin
                    </span>
                  </Link>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <HiOutlineUser className="inline-block text-3xl font-light hover:scale-125 transition duration-200" />
            </Link>
          )}
          <div className="w-24" />
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
