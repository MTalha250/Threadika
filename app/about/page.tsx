import React from "react";
import logo from "@/assets/logo.webp";

const AboutUs = () => {
  return (
    <div className="py-12 pt-32 px-8 md:px-16">
      <div className="text-center mb-12 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-xl">
          Welcome to Arfa & Maryam's, where quality meets elegance.
        </p>
      </div>

      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
          <img
            src={logo.src}
            alt="Our Story"
            className="rounded-lg w-[600px] h-[400px] object-contain"
          />
        </div>

        <div className="w-full md:w-1/2 px-4 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Arfa & Maryam's began with a vision: to bring the finest women's
            fashion directly to your doorstep. Our journey started in 2023, and
            ever since, we have dedicated ourselves to providing unparalleled
            quality and customer service. Our team works diligently to curate a
            selection of products that meet the highest standards.
          </p>
          <p className="text-gray-600">
            We believe in the strength of community and the importance of
            supporting local artisans. Every product in our store is chosen with
            care to ensure it brings both joy and utility to your life. Thank
            you for being a part of our story.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          At Arfa & Maryam's, our mission is to provide our customers with an
          effortless shopping experience. We are committed to offering a wide
          range of high-quality women's fashion at competitive prices. Our aim
          is to surpass your expectations and make every purchase a delightful
          experience.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap -mx-4">
        <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
          <div className="bg-white shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Quality Products
            </h3>
            <p className="text-gray-600">
              We handpick each item in our store to ensure it meets our
              stringent quality standards. Shop confidently knowing you're
              getting the very best.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
          <div className="bg-white shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Customer Service
            </h3>
            <p className="text-gray-600">
              Our customer service team is here to assist you with any questions
              or concerns. We are dedicated to providing exceptional support at
              every stage.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/3 px-4">
          <div className="bg-white shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Sustainable Practices
            </h3>
            <p className="text-gray-600">
              We aim to reduce our environmental footprint by embracing
              sustainable practices in our operations and offering eco-friendly
              products.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
