import { useState } from "react";
import { motion } from "framer-motion";
import { navLinks } from "@/constants";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Profile from "../profile";
import Wishlist from "../wishlist";
import Cart from "../cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
const variants = {
  initial: {
    scaleX: 0,
  },
  open: {
    scaleX: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
  closed: {
    scaleX: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};
const Sidebar = () => {
  const { data } = useSession();
  const user = data?.user;
  const [open, setOpen] = useState(false);

  return (
    <motion.div className="md:hidden" animate={open ? "open" : "closed"}>
      <motion.div
        className="text-3xl font-bold z-50 fixed top-0 flex items-center p-10 right-0 bottom-0 bg-white w-full text-secondary origin-right h-screen"
        variants={variants}
      >
        <ul className="space-y-5">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                onClick={() => setOpen(false)}
                href={link.href}
                className="border-b-4 border-transparent hover:text-primary hover:border-primary transition duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {user?.name ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none ring-0 fixed bottom-5 right-5 pb-2 px-5">
              <div className="pb-2 px-5 border border-black bg-transparent text-white  dark:border-white relative group transition duration-200">
                <div className="absolute bottom-0 right-0 bg-primary h-full w-full -z-10 group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
                <span className="relative text-sm">Hi, {user?.name}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div onClick={() => setOpen(false)}>
                <Profile />
              </div>
              <DropdownMenuItem
                className="cursor-pointer text-center block"
                onClick={() => {
                  signOut({
                    redirect: false,
                  });
                  toast.success("Logged out successfully");
                  setOpen(false);
                }}
              >
                Logout
              </DropdownMenuItem>
              {user?.role == "admin" && (
                <DropdownMenuSeparator className="bg-neutral-200" />
              )}
              {user?.role == "admin" && (
                <DropdownMenuItem className="mt-1 cursor-pointer text-center block bg-primary text-white focus:bg-primary/90">
                  <Link href="/admin" onClick={() => setOpen(false)}>
                    Admin
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div
            className="fixed bottom-5 right-5"
            onClick={() => setOpen(false)}
          >
            <Link
              href="/login"
              className="pb-2 px-5 border border-black bg-transparent text-white  dark:border-white relative group transition duration-200"
            >
              <div className="absolute bottom-0 right-0 bg-primary h-full w-full -z-10 group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
              <span className="relative text-sm">Login/Signup</span>
            </Link>
          </div>
        )}
        <div className="fixed top-[18px] right-20 space-x-3">
          <Wishlist />
          <Cart />
        </div>
      </motion.div>
      <button
        className="fixed z-50 top-[30px] right-8"
        onClick={() => setOpen((prev: any) => !prev)}
      >
        <svg width="25" height="25" viewBox="0 0 23 23">
          <motion.path
            strokeWidth="3"
            stroke="#9BA3AF"
            strokeLinecap="round"
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" },
            }}
          />
          <motion.path
            strokeWidth="3"
            stroke="#9BA3AF"
            strokeLinecap="round"
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
          />
          <motion.path
            strokeWidth="3"
            stroke="#9BA3AF"
            strokeLinecap="round"
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" },
            }}
          />
        </svg>
      </button>
    </motion.div>
  );
};

export default Sidebar;
