import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="bg-gray-50 pt-32 pb-10 px-8 md:px-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Shipping Policy
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Learn more about our shipping process and policies.
        </p>
      </div>

      <div className="bg-white shadow-2xl p-5 sm:p-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Processing Time
          </h2>
          <p className="text-gray-600">
            All orders are processed within 1-2 business days. Orders are not
            shipped or delivered on weekends or holidays.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Shipping Rates & Delivery Estimates
          </h2>
          <p className="text-gray-600 mb-4">
            Shipping charges for your order will be calculated and displayed at
            checkout.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 border-b">Shipping</th>
                  <th className="py-3 px-4 border-b">
                    Estimated Delivery Time
                  </th>
                  <th className="py-3 px-4 border-b">Shipping Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4 border-b">Pakistan</td>
                  <td className="py-3 px-4 border-b">3-5 business days</td>
                  <td className="py-3 px-4 border-b">
                    Based on product weight
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b">International</td>
                  <td className="py-3 px-4 border-b">1-2 weeks</td>
                  <td className="py-3 px-4 border-b">
                    Based on product weight
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Shipment Confirmation & Order Tracking
          </h2>
          <p className="text-gray-600">
            You will receive a Shipment Confirmation email once your order has
            shipped containing your tracking number(s). The tracking number will
            be active within 24 hours.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Customs, Duties, and Taxes
          </h2>
          <p className="text-gray-600">
            Arfa & Maryam's is not responsible for any customs and taxes applied
            to your order. All fees imposed during or after shipping are the
            responsibility of the customer (tariffs, taxes, etc.).
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Damages</h2>
          <p className="text-gray-600">
            Arfa & Maryam's is not liable for any products damaged or lost
            during shipping. If you received your order damaged, please contact
            the shipment carrier to file a claim. Please save all packaging
            materials and damaged goods before filing a claim.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
