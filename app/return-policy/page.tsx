import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="bg-gray-50 pt-32 pb-10 px-8 md:px-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Return & Exchange Policy
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Learn more about our return process and policies.
        </p>
      </div>

      <div className="bg-white shadow-2xl p-5 sm:p-10">
        <div className="mb-8">
          <p className="text-lg mb-6">
            <span className="font-semibold">Customer First:</span> At Arfa &
            Maryam's, our customers are our top priority. Our customer care team
            is here to assist you at every step if you wish to exchange your
            purchased item. The help you need is just a click away!
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Domestic Orders
          </h2>
          <p className="text-md leading-relaxed text-gray-600">
            You can exchange any item purchased online within 7 days of
            delivery, provided you have proof of purchase. For customers opting
            for the online exchange process, a valid reason for the exchange is
            required.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Return Process
          </h2>
          <p className="text-gray-600">
            To return an item, please ship it to the following address in its
            original packaging and include the original invoice:
          </p>
          <p className="text-gray-600 mt-4">
            Arfa & Maryam's
            <br />
            Model Town
            <br />
            Lahore, Pakistan
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Proof of Purchase
          </h2>
          <p className="text-md leading-relaxed text-gray-600">
            This includes either a receipt or the online order confirmation
            email.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Conditions for Exchange
          </h2>
          <p className="text-md leading-relaxed text-gray-600">
            Items can be exchanged only if they are unused, all tags are intact,
            the packaging is in its original condition, and the original invoice
            is present. Additionally, you must state a valid reason for
            requesting an exchange, such as if the item is defective, the wrong
            size, or incorrect. Items delivered in special packaging, such as
            the unstitched women's collection and semi-formal pieces delivered
            in garment bags, must be returned with their original packaging.
          </p>
        </div>

        <div className="mb-8">
          <p className="text-md leading-relaxed text-gray-600">
            Thank you for choosing Arfa & Maryam's. We value your satisfaction
            and are here to assist you with any questions or concerns regarding
            your order.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions concerning our return policy, please
            contact us at:
          </p>
          <p className="text-gray-600 mt-4">
            support@example.com
            <br />
            123-456-7890
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
