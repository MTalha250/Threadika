import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const ContactUs = () => {
  return (
    <div className="bg-gray-50 pt-32 pb-20 px-8 md:px-16">
      <div className="text-center mb-12 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-xl">
          We'd love to hear from you! Whether you have a question, feedback, or
          need assistance, our team is here to help.
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-white p-6 sm:p-12 shadow-2xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-8">
            You can reach us by filling out the contact form below, emailing us
            directly, or giving us a call. We aim to respond to all inquiries
            within 24 hours.
          </p>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
              <div className="bg-gray-100 p-8 text-center shadow-md">
                <FiMail className="text-primary text-4xl mb-4 mx-auto" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Email Us
                </h3>
                <p className="text-xs sm:text-base text-gray-600">
                  support@arfaandmaryams.com
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <div className="bg-gray-100 p-8 text-center shadow-md">
                <FiPhone className="text-primary text-4xl mb-4 mx-auto" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Call Us
                </h3>
                <p className="text-gray-600">+92 321 4087600</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Contact Form
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 text-lg">Name</label>
              <input
                type="text"
                className="w-full mt-2 p-4 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-lg">Email</label>
              <input
                type="email"
                className="w-full mt-2 p-4 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-lg">Message</label>
              <textarea
                className="w-full mt-2 p-4 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-primary text-white py-3 px-8 shadow-lg transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Location</h2>
        <p className="text-gray-600 mb-8">
          Visit us at our office for a more personal experience.
        </p>
        <div className="relative w-full h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.8913331118615!2d74.31076452572832!3d31.472175299521435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919040068171bff%3A0xfb2db42733a440fb!2sBlock%20P%20Model%20Town%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1719860016306!5m2!1sen!2s"
            width="100%"
            height="100%"
          ></iframe>
          <div className="absolute inset-0 bg-gray-800 opacity-25 "></div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
