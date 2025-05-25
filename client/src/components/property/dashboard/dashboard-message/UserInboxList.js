"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@/hooks/auth";
import Pagination from "@/components/common/Pagination";

const getTimeAgo = (createdAt) => {
  try {
    const created = new Date(createdAt);
    const now = new Date();
    const diffMs = now - created;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) {
      return `${diffSeconds} sec${diffSeconds === 1 ? "" : "s"} ago`;
    } else if (diffMinutes < 60) {
      return `${diffMinutes} min${diffMinutes === 1 ? "" : "s"} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
    } else if (diffDays < 30) {
      return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
    } else {
      // For dates > 30 days, show formatted date
      return created.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  } catch (error) {
    console.error("Failed to parse created_at:", error);
    return "Unknown time";
  }
};

const UserItem = ({ user }) => {
  return (
    <div
      style={{
        padding: "12px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <a
        href="#"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
          <div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "4px",
              }}
            >
              {user?.title || "Untitled"}
            </div>
            <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
              {user?.message || "No message"}
            </p>
          </div>
          <div
            style={{
              marginLeft: "auto",
              textAlign: "right",
            }}
          >
            <small style={{ fontSize: "12px", color: "#6b7280" }}>
              {getTimeAgo(user.created_at)}
            </small>
          </div>
        </div>
      </a>
    </div>
  );
};

const UserInboxList = () => {
  const { token } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);

  const fetchNotifications = async (page = 1) => {
    const response = await axios.get(
      `https://erp.samironbarai.xyz/v1/notifications?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["notifications", currentPage],
    queryFn: () => fetchNotifications(currentPage),
  });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      {isLoading ? (
        <p style={{ textAlign: "center", padding: "24px", color: "#4b5563" }}>
          Loading notifications...
        </p>
      ) : error ? (
        <p
          style={{
            textAlign: "center",
            padding: "24px",
            color: "#dc2626",
          }}
        >
          Error: {error.message}
        </p>
      ) : !data?.data?.length ? (
        <p style={{ textAlign: "center", padding: "24px", color: "#4b5563" }}>
          No notifications available.
        </p>
      ) : (
        <>
          {data.data.map((user, index) => (
            <UserItem key={user.id || index} user={user} />
          ))}
          {data.meta && (
            <div style={{ padding: "16px 0", textAlign: "center" }}>
              <Pagination meta={data.meta} onPageChange={handlePageChange} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserInboxList;
