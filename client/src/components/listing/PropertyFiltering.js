"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MarketListing from "../home/home-v1/MarketListing";

const fetchProducts = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/v1/products`
  );
  return response.data.data;
};

const ProperteyFiltering = () => {
  const {
    data: listings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <section className="pt0 pb90 bg-red">
        <div className="container">
          <p className="text-center">Loading Properties...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="pt0 pb90 bg-red">
        <div className="container">
          <p className="text-center text-red-600">Error loading properties</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt0 pb90 bg-red">
      <div className="container">
        <div className="row">
          <MarketListing listings={listings} />
        </div>
      </div>
    </section>
  );
};

export default ProperteyFiltering;
