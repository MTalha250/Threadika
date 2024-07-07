import Link from "next/link";
import React from "react";
import img from "@/assets/notfound.webp";
const page = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center px-8">
      <div>
        <img src={img.src} alt="" className="w-[400px]" />
        <h1 className="text-secondary my-10 font-bold text-center text-3xl md:text-4xl font-bask">
          Page Not Found
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
};

export default page;
