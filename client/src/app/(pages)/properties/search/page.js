"use client";
import DefaultHeader from "@/components/common/DefaultHeader";

import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import MarketListing from "@/components/home/home-v1/MarketListing";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const fetchProducts = async (bedroom, bathroom, _project_id) => {
  const params = new URLSearchParams();
  if (bedroom) params.set("_bedroom", bedroom);
  if (bathroom) params.set("_bathroom", bathroom);
  if (_project_id) params.set("_project_id", _project_id);

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/v1/products?${params.toString()}`
  );
  return response.data.data;
};

const Market = () => {
  const searchParams = useSearchParams();
  const bedroom = searchParams.get("_bedroom");
  const bathroom = searchParams.get("_bathroom");
  const product = searchParams.get("_project_id");
  const {
    data: listings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", bedroom, bathroom, product],
    queryFn: () => fetchProducts(bedroom, bathroom, product),
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
    <>
      <DefaultHeader />
      <MobileMenu />
      <div className="my-10 text-center">
        <p className="text-bolder text-[60px]">
          {" "}
          Discover the best properties in the market
        </p>
      </div>
      <section className="pt0 pb90 bg-red">
        <div className="container">
          <div className="row">
            <MarketListing listings={listings} />
          </div>
        </div>
      </section>

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default Market;
