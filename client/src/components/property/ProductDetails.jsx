"use client";

import { useAuth } from "@/hooks/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const ProductDetails = ({ id }) => {
  console.log(id);
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const fetchSingleProduct = async (id, token) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  };

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["single-product", id],
    queryFn: () => fetchSingleProduct(id, token),
    enabled: !!id && !!token,
  });

  if (isLoading) {
    return (
      <section className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full text-center">
          <p className="text-lg text-gray-500 animate-pulse">
            Loading Product...
          </p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full text-center">
          <p className="text-lg text-red-400 font-medium">{isError}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 text-gray-800">
            <h1 className="text-3xl font-bold">
              Flat {product?.flat_type} - {product?.floor_number} Floor
            </h1>
            <p className="mt-2 text-lg text-gray-600">{product?.description}</p>
          </div>

          {/* Main Content */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div>
              <img
                src={product?.images}
                alt={`Flat ${product?.flat_type}`}
                className="w-full h-96 object-cover rounded-lg shadow-sm"
              />
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Property Details
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500">Flat Size</p>
                    <p className="text-lg font-medium text-gray-900">
                      {product?.flat_size} sqft
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Bedrooms</p>
                    <p className="text-lg font-medium text-gray-900">
                      {product?.bedroom}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Bathrooms</p>
                    <p className="text-lg font-medium text-gray-900">
                      {product?.bathroom}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Balconies</p>
                    <p className="text-lg font-medium text-gray-900">
                      {product?.balcony}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Pricing
                </h2>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-500">Total Price</p>
                    <p className="text-lg font-medium text-gray-900">
                      ৳{product?.total_price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">Unit Price</p>
                    <p className="text-lg font-medium text-gray-900">
                      ৳{product?.unit_price.toLocaleString()}/sqft
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">Parking Charge</p>
                    <p className="text-lg font-medium text-gray-900">
                      ৳{product?.parking_charge.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">Utility Charge</p>
                    <p className="text-lg font-medium text-gray-900">
                      ৳{product?.utility_charge.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">Other Charges</p>
                    <p className="text-lg font-medium text-gray-900">
                      ৳{product?.other_charge.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Amenities Section */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Amenities
                </h2>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">✔</span>
                    <span className="text-gray-600">
                      {product?.car_parking
                        ? "Car Parking Available"
                        : "No Car Parking"}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">✔</span>
                    <span className="text-gray-600">
                      {product?.rooftop_gardening
                        ? "Rooftop Gardening"
                        : "No Rooftop Gardening"}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">✔</span>
                    <span className="text-gray-600">
                      {product?.generator ? "Generator Backup" : "No Generator"}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">✔</span>
                    <span className="text-gray-600">
                      {product?.passenger_lift} Passenger Lift
                    </span>
                  </li>
                </ul>
              </div>

              {/* Payment Status */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Payment Status
                </h2>
                <div className="mt-4">
                  <p className="text-gray-500">
                    Status:{" "}
                    <span
                      className={`font-medium ${
                        product?.payment_status === "pending"
                          ? "text-yellow-400"
                          : "text-blue-400"
                      }`}
                    >
                      {product?.payment_status}
                    </span>
                  </p>
                  <p className="text-gray-500">
                    Due Amount:{" "}
                    <span className="font-medium text-gray-900">
                      ৳{product?.due_amount}
                    </span>
                  </p>
                  <p className="text-gray-500">
                    Paid Amount:{" "}
                    <span className="font-medium text-gray-900">
                      ৳{product?.paid_amount}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex justify-end space-x-4">
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Contact Agent
              </button>
              <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                Save Property
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white text-black rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4">
            Book A Free Consultation
          </h2>
          <div className="flex justify-center space-x-4 mb-4 text-sm">
            <span>📞 16604</span>
            <span>📱 +880961391919</span>
            <span>📧 info@pino.org</span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-1/2 p-2 bg-gray-200 text-black rounded"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-1/2 p-2 bg-gray-200 text-black rounded"
                required
              />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full p-2 bg-gray-200 text-black rounded flex items-center"
              required
            />
            <textarea
              name="message"
              placeholder="Type Message..."
              className="w-full p-2 bg-gray-200 text-black rounded h-20 resize-none"
            />
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
