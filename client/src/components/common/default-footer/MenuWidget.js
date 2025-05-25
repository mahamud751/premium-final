"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@/hooks/auth";

const MenuWidget = () => {
  const { token } = useAuth();

  const fetchLocations = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/v1/projects`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  };

  const {
    data: locations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchLocations,
  });

  const menuSections = [
    {
      title: "Projects",
      links: isLoading
        ? [{ label: "Loading...", href: "#" }]
        : isError
        ? [{ label: "Error loading projects", href: "#" }]
        : locations
        ? locations.map((city) => ({
            label: (
              <p className="text-[#bebdbd] block font-title font-semibold leading-[40px] relative transition-all duration-300 ease-in-out hover:underline">
                {city.name}
              </p>
            ),
            href: `/project/${city.id}`,
            isNextLink: true,
          }))
        : [{ label: "No projects available", href: "#" }],
    },
    {
      title: "Quick Links",
      links: [
        { label: "Terms of Use", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Our Services", href: "/properties" },
        { label: "Careers", href: "#" },
        { label: "FAQs", href: "/faq" },
      ],
    },
    {
      title: "Live Chat",
      links: [
        {
          label: (
            <img
              src="/img/whastapp.png"
              alt="WhatsApp Live Chat"
              style={{ width: 40, height: 40 }}
            />
          ),
          href: "https://wa.me/+8801689584336",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      ],
    },
  ];

  return (
    <>
      {menuSections.map((section, index) => (
        <div className="col-auto" key={index}>
          <div className="link-style1 mb-3">
            <h6 className="text-white mb25">{section.title}</h6>
            <ul className="ps-0">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  {link.isNextLink ? (
                    <Link href={link.href} className="text-decoration-none">
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      target={link.target || "_self"}
                      rel={link.rel || ""}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default MenuWidget;
