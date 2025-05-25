"use client";

import { useAuth } from "@/hooks/auth";
import axios from "axios";
import { useEffect, useState } from "react";
import CctvStream from "./CctvStream";
import { useQuery } from "@tanstack/react-query";

const OrderDetailsCard = ({ id }) => {
  const { token } = useAuth();
  const [order, setOrder] = useState(null); // Changed to null instead of []
  const [payments, setPayments] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch order and payments
  useEffect(() => {
    const fetchOrderAndPayments = async () => {
      try {
        setLoading(true);
        const orderRes = await axios.get(
          `https://erp.samironbarai.xyz/v1/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrder(orderRes.data.data);

        const paymentsRes = await axios.get(
          `https://erp.samironbarai.xyz/v1/payments?_entity_type=Product&_entity_id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPayments(paymentsRes?.data?.data);
      } catch (err) {
        setError("Failed to fetch order or payments data");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderAndPayments();
  }, [id, token]);

  // Fetch purchases once order.project_id is available
  useEffect(() => {
    const fetchPurchases = async () => {
      if (order?.project_id) {
        try {
          const purchaseRes = await axios.get(
            `https://erp.samironbarai.xyz/v1/purchases?_project_id=${order.project_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setPurchases(purchaseRes?.data?.data);
        } catch (err) {
          setError("Failed to fetch purchases data");
        }
      }
    };

    fetchPurchases();
  }, [order?.project_id, token]);

  const fetchSingleProject = async () => {
    const response = await axios.get(
      `https://erp.samironbarai.xyz/v1/projects`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  };

  const { data: projectData } = useQuery({
    queryKey: ["single-project-data"],
    queryFn: () => fetchSingleProject(),
  });

  const mainProject = projectData?.data?.find(
    (project) => project.id == order?.project_id
  );
  const totalProgress =
    mainProject?.progress_timeline
      ?.filter((item) => item.status === "true")
      ?.reduce((sum, item) => sum + parseInt(item.progress), 0) || 0;

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full text-center">
          <p className="text-lg text-gray-600 animate-pulse">
            Loading Order...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full text-center">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-0 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
          Order Details - Flat {order?.flat_type || "N/A"}
        </h1>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">
            CC Camera
          </h2>
          <CctvStream order={order}></CctvStream>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center mt-2">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">Progress</h2>
          <p className="text-2xl font-bold text-yellow-500">{totalProgress}%</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center mt-2">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">
            Project Documents
          </h2>
          <div className="space-y-3">
            {order?.project?.documents?.length > 0 ? (
              order.project.documents.map((doc, index) => (
                <p key={index} className="text-gray-700">
                  <a
                    href={doc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Document {index + 1}
                  </a>
                </p>
              ))
            ) : (
              <p className="text-gray-500">No project documents available.</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 md:pt-0 pb-4">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-lg font-semibold text-white mb-2">
              EMI Amount
            </h2>
            <p className="text-2xl font-bold text-white drop-shadow-md">
              ৳{order?.emi_amount?.toLocaleString() || "0"}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-lg font-semibold text-white mb-2">
              Paid Amount
            </h2>
            <p className="text-2xl font-bold text-white drop-shadow-md">
              ৳{order?.paid_amount?.toLocaleString() || "0"}
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-lg font-semibold text-white mb-2">
              Due Amount
            </h2>
            <p className="text-2xl font-bold text-white drop-shadow-md">
              ৳{order?.due_amount?.toLocaleString() || "0"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Flat Information */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold text-red-700 mb-4 flex items-center">
              <i className="fas fa-home text-red-600 mr-2"></i> Flat Information
            </h2>
            <div className="space-y-3">
              <p className="text-gray-700 flex items-center">
                <i className="fas fa-building text-blue-500 mr-2"></i>
                <span className="font-medium">Flat Type:</span>{" "}
                {order?.flat_type || "N/A"}
              </p>
              <p className="text-gray-700 flex items-center">
                <i className="fas fa-layer-group text-orange-500 mr-2"></i>
                <span className="font-medium">Floor:</span>{" "}
                {order?.floor_number || "N/A"}
              </p>
              <p className="text-gray-700 flex items-center">
                <i className="fas fa-ruler-combined text-green-500 mr-2"></i>
                <span className="font-medium">Size:</span>{" "}
                {order?.flat_size ? `${order.flat_size} sq.ft` : "N/A"}
              </p>
              <p className="text-gray-700 flex items-center">
                <i className="fas fa-bed text-purple-500 mr-2"></i>
                <span className="font-medium">Bedrooms:</span>{" "}
                {order?.bedroom || "N/A"}
              </p>
              <p className="text-gray-700 flex items-center">
                <i className="fas fa-bath text-pink-500 mr-2"></i>
                <span className="font-medium">Bathrooms:</span>{" "}
                {order?.bathroom || "N/A"}
              </p>
              <p className="text-gray-700 flex items-center">
                <i className="fas fa-file-alt text-teal-500 mr-2"></i>
                <span className="font-medium">Description:</span>{" "}
                {order?.description || "No description available"}
              </p>
            </div>
          </div>

          {/* Card 2: Pricing Details */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold text-green-700 mb-4 flex items-center">
              <i className="fas fa-money-bill-wave text-green-600 mr-2"></i>{" "}
              Pricing Details
            </h2>
            <div className="space-y-3">
              <p className="text-gray-700 flex items-center">
                <i className="fas fa-tag text-yellow-500 mr-2"></i>
                <span className="font-medium">Total Price:</span> BDT{" "}
                {order?.total_price?.toLocaleString() || "N/A"}
              </p>
              <p className="text-gray-700 flex items-center">
                <i className="fas fa-file-signature text-cyan-500 mr-2"></i>
                <span className="font-medium">
                  Land Registration & Mutation:
                </span>{" "}
                BDT {order?.land_registration_amount?.toLocaleString() || "N/A"}
              </p>
              <p className="text-gray-700 flex items-center">
                <i className="fas fa-hand-holding-usd text-red-500 mr-2"></i>
                <span className="font-medium">Service charge:</span> BDT{" "}
                {order?.service_charge?.toLocaleString() || "N/A"}
              </p>
              <p className="text-gray-700 flex items-center">
                <i className="fas fa-credit-card text-indigo-500 mr-2"></i>
                <span className="font-medium">Payment Status:</span>{" "}
                {order?.payment_status || "N/A"}
              </p>
            </div>
          </div>

          {/* Card 3: Features & Amenities */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold text-violet-600 mb-4 flex items-center">
              <i className="fas fa-star text-violet-500 mr-2"></i> Features &
              Amenities
            </h2>
            <div className="space-y-3">
              <p className="text-gray-700 flex items-center">
                <i className="fas fa-utensils text-lime-500 mr-2"></i>
                <span className="font-medium">Kitchen:</span>{" "}
                {order?.kitchen || "N/A"}
              </p>
              <p className="text-gray-700 flex items-center">
                <i className="fas fa-couch text-amber-500 mr-2"></i>
                <span className="font-medium">Drawing Room:</span>{" "}
                {order?.drawing_room || "N/A"}
              </p>
              <p className="text-gray-700 flex items-center">
                <i className="fas fa-chair text-blue-500 mr-2"></i>
                <span className="font-medium">Dining Room:</span>{" "}
                {order?.dining_room || "N/A"}
              </p>
              <p className="text-gray-700 flex items-center">
                <i className="fas fa-door-open text-pink-500 mr-2"></i>
                <span className="font-medium">Balcony:</span>{" "}
                {order?.balcony || "N/A"}
              </p>
              <p className="text-gray-700 flex items-center">
                <i className="fas fa-leaf text-green-500 mr-2"></i>
                <span className="font-medium">Rooftop Gardening:</span>{" "}
                {order?.rooftop_gardening ? "Yes" : "No"}
              </p>
              <p className="text-gray-700 flex items-center">
                <i className="fas fa-car text-purple-500 mr-2"></i>
                <span className="font-medium">Car Parking:</span>{" "}
                {order?.car_parking ? "Yes" : "No"}
              </p>
              <p className="text-gray-700 flex items-center">
                <i className="fas fa-elevator text-orange-500 mr-2"></i>
                <span className="font-medium">Passenger Lift:</span>{" "}
                {order?.passenger_lift || "N/A"}
              </p>
              <p className="text-gray-700 flex items-center">
                <i className="fas fa-bolt text-teal-500 mr-2"></i>
                <span className="font-medium">Generator:</span>{" "}
                {order?.generator ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center">
        <button className="bg-blue-600 mt-5 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Payments Details
        </button>
      </div>
      {/* payment history */}
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Transaction ID</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Method</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Note</th>
                <th className="p-3 text-left">Document</th>
              </tr>
            </thead>
            <tbody>
              {payments?.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-3">
                    {new Date(p.payment_date).toLocaleDateString()}
                  </td>
                  <td className="p-3 font-medium text-blue-600">
                    {p.transaction_id}
                  </td>
                  <td className="p-3 text-green-600">৳{p.amount || 0}</td>
                  <td className="p-3">{p.payment_method}</td>
                  <td className="p-3">{p.payment_type}</td>
                  <td className="p-3">{p.payment_note}</td>
                  <td className="p-3">
                    <a
                      href={p.documents}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {payments.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No payments found.
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 text-center">
        <button className="bg-blue-600 mt-5 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Purchase Details
        </button>
      </div>
      {/* purchase history */}
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="p-3 text-left">Created At</th>
                <th className="p-3 text-left">Qty</th>
                <th className="p-3 text-left">Total Price</th>
                <th className="p-3 text-left">Unit Price</th>
                <th className="p-3 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {purchases?.map((purchase) =>
                purchase.items?.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-3">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3 font-medium text-blue-600">
                      {item.qty}
                    </td>
                    <td className="p-3 text-green-600">৳{item.total_price}</td>
                    <td className="p-3">৳{item.unit_price}</td>
                    <td className="p-3">{item.description}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {purchases.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No purchases found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderDetailsCard;
