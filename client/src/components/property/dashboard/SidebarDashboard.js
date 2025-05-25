"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const SidebarDashboard = () => {
  const { user, token, logoutUser } = useAuth();
  const pathname = usePathname();

  if (!logoutUser) {
    throw new Error(
      "AuthContext is undefined. Please ensure you are using UserProvider."
    );
  }

  // Fetch totals for My Properties
  const fetchProperties = async () => {
    const response = await axios.get(
      "${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/orders",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.total || 0;
  };

  // Fetch totals for Auctions
  const fetchAuctions = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/v1/eligible-for-auction`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.total || 0;
  };

  // Fetch totals for Notifications
  const fetchNotifications = async () => {
    const response = await axios.get(
      "${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/notifications",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.meta?.total || 0;
  };

  // Fetch totals for Bids (assuming an endpoint exists)
  const fetchBids = async () => {
    try {
      const response = await axios.get(
        "${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/bids",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.total || 0;
    } catch {
      return 0; // Fallback if endpoint doesn't exist
    }
  };

  const { data: propertiesTotal = 0 } = useQuery({
    queryKey: ["propertiesTotal"],
    queryFn: fetchProperties,
    enabled: !!token,
  });

  const { data: auctionsTotal = 0 } = useQuery({
    queryKey: ["auctionsTotal"],
    queryFn: fetchAuctions,
    enabled: !!token,
  });

  const { data: notificationsTotal = 0 } = useQuery({
    queryKey: ["notificationsTotal"],
    queryFn: fetchNotifications,
    enabled: !!token,
  });

  const { data: bidsTotal = 0 } = useQuery({
    queryKey: ["bidsTotal"],
    queryFn: fetchBids,
    enabled: !!token,
  });

  const handleLogout = () => {
    try {
      logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const sidebarItems = [
    {
      items: [
        {
          href: "/dashboard-home",
          icon: "fas fa-tachometer-alt",
          text: "Dashboard",
        },
        {
          href: "/dashboard-my-properties",
          icon: "fas fa-home",
          text: "My Properties",
          total: propertiesTotal,
        },
        {
          href: "/dashboard-my-auctions",
          icon: "fas fa-gavel",
          text: "Auctions",
          total: auctionsTotal,
        },
        {
          href: "/dashboard-my-bids",
          icon: "fas fa-hand-holding-usd",
          text: "Bids",
          total: bidsTotal,
        },
        {
          href: "/dashboard-notifications",
          icon: "fas fa-bell",
          text: "Notifications",
          total: notificationsTotal,
        },
        {
          href: "/dashboard-my-profile",
          icon: "fas fa-user",
          text: "My Profile",
        },
        {
          href: "#",
          icon: "fas fa-sign-out-alt",
          text: "Logout",
          isLogout: true,
        },
      ],
    },
    {
      items: [],
    },
  ];

  const iconStyles = {
    "fas fa-tachometer-alt": "color: #2563eb;",
    "fas fa-home": "color: #16a34a;",
    "fas fa-gavel": "color: #7c3aed;",
    "fas fa-hand-holding-usd": "color: #14b8a6;",
    "fas fa-bell": "color: #f59e0b;",
    "fas fa-user": "color: #db2777;",
    "fas fa-sign-out-alt": "color: #dc2626;",
  };

  return (
    <div
      className="dashboard__sidebar d-none d-lg-block"
      style={{
        background: "#ffffff",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        minWidth: "240px",
      }}
    >
      <div className="dashboard_sidebar_list">
        <div className="flex justify-between px-2 items-center mb-6">
          <h6 className="text-[14px] font-semibold text-gray-900">
            {user?.name}
          </h6>
          {user?.image?.[0] ? (
            <Image
              src={user.image[0]}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full object-cover w-10 h-10"
            />
          ) : (
            <i
              className="far fa-user-circle fz16"
              style={{ color: "#10572A" }}
            />
          )}
        </div>
        {sidebarItems.map((section, sectionIndex) => (
          <div key={sectionIndex} style={{ marginBottom: "24px" }}>
            {section.title && (
              <p
                className={`fz15 fw400 ff-heading ${
                  sectionIndex === 0 ? "" : "mt30"
                }`}
                style={{
                  color: "#374151",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  fontSize: "14px",
                }}
              >
                {section.title}
              </p>
            )}
            {section.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="sidebar_list_item"
                style={{ marginBottom: "8px" }}
              >
                {item.isLogout ? (
                  <button
                    onClick={handleLogout}
                    className={`items-center w-full text-left ${
                      pathname === item.href ? "-is-active" : ""
                    }`}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "8px",
                      color: pathname === item.href ? "#1e3a8a" : "#4b5563",
                      background:
                        pathname === item.href ? "#e0f2fe" : "transparent",
                      transition: "background 0.2s, color 0.2s",
                      fontSize: "15px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f3f4f6")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        pathname === item.href ? "#e0f2fe" : "transparent")
                    }
                  >
                    <i
                      className={`${item.icon} mr15`}
                      style={{
                        color: iconStyles[item.icon] || "#6b7280",
                        fontSize: "18px",
                      }}
                    />
                    {item.text}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`items-center ${
                      pathname === item.href ? "-is-active" : ""
                    }`}
                    style={{
                      display: "flex",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      color: pathname === item.href ? "#1e3a8a" : "#4b5563",
                      background:
                        pathname === item.href ? "#e0f2fe" : "transparent",
                      transition: "background 0.2s, color 0.2s",
                      fontSize: "15px",
                      fontWeight: "500",
                      alignItems: "center",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f3f4f6")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        pathname === item.href ? "#e0f2fe" : "transparent")
                    }
                  >
                    <i
                      className={`${item.icon} mr15`}
                      style={{
                        color: iconStyles[item.icon] || "#6b7280",
                        fontSize: "18px",
                      }}
                    />
                    {item.text}
                    {item.total >= 0 && (
                      <span
                        style={{
                          marginLeft: "auto",
                          backgroundColor: "#10572A",
                          color: "white",
                          borderRadius: "999px",
                          padding: "2px 8px",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {item.total}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarDashboard;
