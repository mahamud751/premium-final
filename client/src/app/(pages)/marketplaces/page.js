"use client";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import { useAuth } from "@/hooks/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auction = () => {
  const { token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [auctionAmount, setAuctionAmount] = useState();

  const fetchProducts = async () => {
    const response = await axios.get(
      `https://erp.samironbarai.xyz/v1/available-for-biding`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data?.data;
  };

  const {
    data: listings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["actions"],
    queryFn: fetchProducts,
  });

  const getSingleImage = (images) => {
    if (Array.isArray(images)) {
      return images[0] || "/path/to/fallback-image.jpg";
    }
    return images || "/path/to/fallback-image.jpg";
  };

  const handleActionClick = (listing) => {
    setSelectedProduct(listing);
    setAuctionAmount();
    setIsModalOpen(true);
  };

  const handleSubmitAuction = async () => {
    if (!selectedProduct) return;

    const payload = {
      auction_id: selectedProduct.id,
      bid_amount: auctionAmount,
    };

    try {
      const response = await axios.post(
        `https://erp.samironbarai.xyz/v1/bids`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Auction submitted successfully!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit auction. Please try again."
      );
    }
  };

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
          Discover the best properties in the market
        </p>
      </div>
      <section className="pt0 pb90 bg-red">
        <div className="container">
          <div className="row">
            {listings.length > 0 ? (
              listings?.map((listing) => {
                console.log("listing", listing);
                return (
                  <div className="item col-lg-4 market_page" key={listing.id}>
                    <div className="listing-style1">
                      <div className="list-thumb">
                        <Link href={`/property/${listing?.product?.id}`}>
                          <Image
                            width={1000}
                            height={1000}
                            className="w-100 h-96 cover"
                            src={getSingleImage(listing?.product?.images)}
                            alt="listing"
                          />
                        </Link>
                      </div>
                      <div className="list-content">
                        <h6 className="list-title fw-bold">
                          <Link href={`/property/${listing?.product?.id}`}>
                            {listing?.product?.description?.slice(0, 60) ||
                              "Property Listing"}
                          </Link>
                        </h6>
                        <Link href={`/property/${listing?.product?.id}`}>
                          <div className="flex items-center gap-4 px-4 py-2 my-3 transition-colors duration-200 rounded-lg bg-gray-50 hover:bg-gray-100">
                            <a
                              href="#"
                              className="flex items-center text-gray-700 transition-colors duration-200 hover:text-teal-600"
                            >
                              <i className="mr-1 text-teal-500 fas fa-layer-group"></i>
                              {listing?.product?.floor_number
                                ? `${listing?.product?.floor_number} Floor`
                                : "N/A Floor"}
                            </a>
                            <a
                              href="#"
                              className="flex items-center text-gray-700 transition-colors duration-200 hover:text-blue-600"
                            >
                              <i className="mr-1 text-blue-500 fas fa-bed"></i>
                              {listing?.product?.product?.bedroom
                                ? `${listing?.product?.bedroom} bed`
                                : "N/A bed"}
                            </a>
                            <a
                              href="#"
                              className="flex items-center text-gray-700 transition-colors duration-200 hover:text-green-600"
                            >
                              <i className="mr-1 text-green-500 fas fa-bath"></i>
                              {listing?.product?.bathroom
                                ? `${listing?.product?.bathroom} bath`
                                : "N/A bath"}
                            </a>
                            <a
                              href="#"
                              className="flex items-center text-gray-700 transition-colors duration-200 hover:text-purple-600"
                            >
                              <i className="mr-1 text-purple-500 fas fa-ruler-combined"></i>
                              {listing?.product?.flat_size
                                ? `${listing?.product?.flat_size} sqft`
                                : "N/A sqft"}
                            </a>
                          </div>
                        </Link>
                        <Link href={`/property/${listing.id}`}>
                          <div className="mb-2 d-flex justify-content-between">
                            <p
                              className="fw-bold"
                              style={{ fontSize: "15px", color: "#00C194" }}
                            >
                              {listing?.product?.total_price?.toLocaleString()}{" "}
                              ৳
                            </p>
                            <p
                              className="fw-bold"
                              style={{ fontSize: "15px", color: "#00C194" }}
                            >
                              {listing?.product?.status || "N/A"}
                            </p>
                          </div>
                        </Link>
                        <div
                          className="d-flex justify-content-center"
                          style={{
                            backgroundColor: "#00C194",
                            padding: "8px 0",
                            borderRadius: "10px",
                          }}
                        >
                          <button
                            style={{
                              border: 0,
                              background: "none",
                              fontSize: "20px",
                              color: "white",
                            }}
                            onClick={() => handleActionClick(listing)}
                          >
                            Auction
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center">No properties found</p>
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <h2 className="mb-4 text-xl font-bold">Confirm Auction</h2>
            <p className="mb-4">
              Place an auction for{" "}
              <strong>{selectedProduct?.description?.slice(0, 60)}</strong>.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Auction Amount (৳)
              </label>
              <input
                type="number"
                value={auctionAmount}
                onChange={(e) => setAuctionAmount(e.target.value)}
                className="block w-full my-3 mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter auction amount"
                min="1"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                onClick={handleSubmitAuction}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="pb-0 footer-style1 pt60">
        <Footer />
      </section>

      <ToastContainer />
    </>
  );
};

export default Auction;
