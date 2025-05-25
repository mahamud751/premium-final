"use client";
import { useAuth } from "@/hooks/auth";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const getStatusStyle = (status) => {
  switch (status) {
    case "pending":
      return "pending-style style1";
    case "active":
      return "pending-style style2";
    default:
      return "";
  }
};

const PropertyDataTable = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://erp.samironbarai.xyz/v1/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response?.data?.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch order data");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <section className="pt-20 py-12 md:px-4">
        <div className="container mx-auto max-w-7xl text-center">
          Loading Orders...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pt-20 py-12 md:px-4">
        <div className="container mx-auto max-w-7xl text-center text-red-600">
          {error}
        </div>
      </section>
    );
  }

  return (
    <table className="table-style3 table at-savesearch">
      <thead className="t-head">
        <tr>
          <th>Listing title</th>
          <th>Flat Size</th>
          <th>Status</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody className="t-body">
        {orders?.map((property) => (
          <tr key={property.id}>
            <th scope="row">
              <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                <div className="list-thumb">
                  <Image
                    width={110}
                    height={94}
                    className="w-100"
                    src={`${property?.images[0]}`}
                    alt="Flat"
                  />
                </div>
                <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                  <div className="h6 list-title">
                    <Link href={`/orders/${property?.id}`}>
                      Flat No: {property?.id} — {property?.flat_type} Type
                    </Link>
                  </div>
                  <p className="list-text mb-0">{property?.description}</p>
                  <div className="list-price">
                    <a href="#">৳ {property.total_price}</a>
                  </div>
                </div>
              </div>
            </th>
            <td className="vam">{property?.flat_size} sqft</td>
            <td className="vam">
              <span className={getStatusStyle(property?.status.toLowerCase())}>
                {property?.status}
              </span>
            </td>
            <td className="vam">৳ {property.total_price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PropertyDataTable;
