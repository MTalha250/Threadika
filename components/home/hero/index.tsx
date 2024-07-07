import React from "react";
import { SparklesCore } from "./sparkles";
import img from "@/assets/hero1.png";

const Hero = () => {
  return (
    <div className="flex items-center h-screen bg-gradient-to-r from-primary from-50% to to-secondary to-50%">
      <div className="w-1/2 px-16 flex flex-col">
        <h1 className="text-8xl text-secondary font-asguard">
          Stories from <br /> the streets
        </h1>
        <div className="w-[80%] h-40 relative mt-5">
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-secondary to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-secondary to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-secondary to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-secondary to-transparent h-px w-1/4" />
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1400}
            className="w-full h-full"
            particleColor="#FEF2E1"
          />
          <div className="absolute inset-0 w-full h-full bg-primary [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
        <button className="font-asguard text-xl py-3 px-20 text-primary bg-secondary font-semibold shadow-lg border-2 border-secondary w-fit">
          Shop Now
        </button>
      </div>
      <div className="w-1/2 flex justify-center items-end self-end">
        <img src={img.src} alt="" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Hero;
