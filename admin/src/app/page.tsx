"use client";
import { Grid } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import UseFetch from "@/services/hooks/UseRequest";
import dynamic from "next/dynamic";
import { Admin } from "@/services/types";

const SchoolAnimation = dynamic(
  () => import("@/components/dynamics/animations/SchoolAnimation"),
  { ssr: false }
);

const TotalEcommerceAnimation = dynamic(
  () => import("@/components/dynamics/animations/TotalEcommerceAnimation"),
  { ssr: false }
);

const TotalAmountAnimation = dynamic(
  () => import("@/components/dynamics/animations/TotalAmountAnimation"),
  { ssr: false }
);

const GreenBarAnimation = dynamic(
  () => import("@/components/dynamics/animations/GreenBarAnimation"),
  { ssr: false }
);

const DeliveryAnimation = dynamic(
  () => import("@/components/dynamics/animations/DeliveryAnimation"),
  { ssr: false }
);

const Page = () => {
  const { data: userData } = UseFetch<{ data: Admin }>("admin/dashboard");

  const theme = useTheme();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <div
            className={`rounded-[15px] p-5 bg-gradient-to-r ${
              theme.palette.mode === "dark"
                ? "from-[#181818] to-[#218f87]"
                : "from-[#111111] to-[#218f87]"
            }`}
          >
            <div className="flex p-3">
              <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] rounded-full p-5 ">
                <TotalEcommerceAnimation />
              </div>
              <div className="flex items-center justify-center ms-3 text-white">
                <div>
                  <p className="fs-5 text-[20px]">Total Projects</p>
                  <p className="fw-bold text-[14px]">
                    {userData?.data?.numberOfProjects ?? "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div
            className={`rounded-[15px] p-5 bg-gradient-to-r ${
              theme.palette.mode === "dark"
                ? "from-[#121112] to-[#a449cb]"
                : "from-[#0e0e0e] to-[#a83bc8]"
            }`}
          >
            <div className="flex p-3">
              <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] rounded-full p-5 ">
                <TotalAmountAnimation />
              </div>
              <div className="flex items-center justify-center ms-3 text-white">
                <div>
                  <p className="fs-5 text-[20px]">Total Sold Flats</p>
                  <p className="fw-bold text-[14px]">
                    {userData?.data?.totalSoldFlats ?? "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div
            className={`rounded-[15px] p-5 bg-gradient-to-r ${
              theme.palette.mode === "dark"
                ? "from-[#020202] to-[#4e4f5d]"
                : "from-[#111111] to-[#474773]"
            }`}
          >
            <div className="flex py-3">
              <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] rounded-full p-5 ">
                <GreenBarAnimation />
              </div>
              <div className="flex items-center ms-3 text-white">
                <div>
                  <p className="fs-5 text-[20px]">Total Available Flats</p>
                  <p className="fw-bold text-[14px]">
                    {userData?.data?.totalAvailableFlats ?? "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 5 }}>
        <Grid item xs={12} sm={6} md={4}>
          <div
            className={`rounded-[15px] p-5 bg-gradient-to-r ${
              theme.palette.mode === "dark"
                ? "from-[#181818] to-[#d94b4b]"
                : "from-[#080808] to-[#ec4646]"
            }`}
          >
            <div className="flex py-3">
              <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] rounded-full p-5 ">
                <SchoolAnimation />
              </div>
              <div className="flex items-center ms-3 text-white">
                <div>
                  <p className="fs-5 text-[20px]">Total Clients</p>
                  <p className="fw-bold text-[14px]">
                    {userData?.data?.numberOfClients ?? "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div
            className={`rounded-[15px] p-5 bg-gradient-to-r ${
              theme.palette.mode === "dark"
                ? "from-[#0c0c0c] to-[#80dc5c]"
                : "from-[#121111] to-[#7ad758]"
            }`}
          >
            <div className="flex py-3">
              <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] rounded-full p-5 ">
                <DeliveryAnimation />
              </div>
              <div className="flex items-center ms-3 text-white">
                <div>
                  <p className="fs-5 text-[20px]">Number Of Project Area</p>
                  <p className="fw-bold text-[14px]">
                    {userData?.data?.numberOfProjectsInArea ?? "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Page;
