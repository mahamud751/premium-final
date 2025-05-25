"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@/hooks/auth";
import { FaMoneyBill, FaBuilding, FaCalendarAlt } from "react-icons/fa";

const TopStateBlock = () => {
  const { token } = useAuth();

  const fetchStatistics = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/dashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-statistics"],
    queryFn: fetchStatistics,
  });

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      console.error("Failed to parse date:", error);
      return "N/A";
    }
  };

  const cards = data
    ? [
        {
          text: "Total Payment",
          title: `৳${data?.data?.totalPayment || "0"}`,
          IconComponent: FaMoneyBill,
          iconColor: "#16a34a",
          gradient: "linear-gradient(135deg, #fee2e2, #fecaca)",
        },
        {
          text: "Total Products",
          title: data?.data?.totalProduct || "0",
          IconComponent: FaBuilding,
          iconColor: "#16a34a",
          gradient: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
        },
        {
          text: "Next Payment Date",
          title: formatDate(data?.data?.nextPaymentDate),
          IconComponent: FaCalendarAlt,
          iconColor: "#2563eb",
          gradient: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
        },
      ]
    : [];

  return (
    <div
      className="w-full"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "24px",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "24px",
      }}
    >
      {isLoading ? (
        <p style={{ textAlign: "center", color: "#4b5563", width: "100%" }}>
          Loading statistics...
        </p>
      ) : error ? (
        <p style={{ textAlign: "center", color: "#dc2626", width: "100%" }}>
          Error: {error.message}
        </p>
      ) : !data ? (
        <p style={{ textAlign: "center", color: "#4b5563", width: "100%" }}>
          No statistics available.
        </p>
      ) : (
        cards.map((card, index) => (
          <div
            key={index}
            className="flex-1 w-full max-w-[calc(33.333%-16px)] min-w-[340px] md:min-w-[250px]"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "24px",
                background: card.gradient,
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#1f2937",
                    marginBottom: "12px",
                    textTransform: "uppercase",
                  }}
                >
                  {card.text}
                </div>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: card.iconColor,
                  }}
                >
                  {card.title}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "56px",
                  height: "56px",
                  background: "#ffffff",
                  borderRadius: "50%",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <card.IconComponent
                  style={{
                    fontSize: "28px",
                    color: card.iconColor,
                  }}
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TopStateBlock;
