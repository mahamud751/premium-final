"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

const DboardMobileNavigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const sidebarItems = [
    {
      title: "MAIN",
      items: [
        {
          href: "/dashboard-home",
          icon: "flaticon-discovery",
          text: "Dashboard",
        },
      ],
    },
    {
      title: "MANAGE LISTINGS",
      items: [
        {
          href: "/dashboard-my-properties",
          icon: "flaticon-home",
          text: "My Properties",
        },
        {
          href: "/dashboard-my-auctions",
          icon: "fas fa-gavel",
          text: "Auctions",
        },
        {
          href: "/dashboard-my-bids",
          icon: "fas fa-hand-holding-usd",
          text: "Bids",
        },
        {
          href: "/dashboard-notifications",
          icon: "flaticon-protection",
          text: "Notifications",
        },
      ],
    },
    {
      title: "MANAGE ACCOUNT",
      items: [
        {
          href: "/dashboard-my-profile",
          icon: "flaticon-user",
          text: "My Profile",
        },
        {
          href: "#",
          icon: "flaticon-logout",
          text: "Logout",
          isLogout: true,
        },
      ],
    },
  ];

  return (
    <div className="dashboard_navigationbar d-block d-lg-none">
      <div className="dropdown">
        <button
          className="dropbtn"
          onClick={() => setIsDropdownOpen((prevOpen) => !prevOpen)}
        >
          <i className="fa fa-bars pr10" /> Dashboard Navigation
        </button>
        <ul className={`dropdown-content ${isDropdownOpen ? "show" : ""}`}>
          {sidebarItems?.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <p
                className={`fz15 fw400 ff-heading mt30 pl30 ${
                  sectionIndex === 0 ? "mt-0" : "mt30"
                }`}
              >
                {section.title}
              </p>
              {section?.items?.map((item, itemIndex) => (
                <div key={itemIndex} className="sidebar_list_item">
                  <Link
                    href={item.href}
                    className={`items-center   ${
                      pathname == item?.href ? "-is-active" : ""
                    } `}
                  >
                    <i className={`${item?.icon} mr15`} />
                    {item.text}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DboardMobileNavigation;
