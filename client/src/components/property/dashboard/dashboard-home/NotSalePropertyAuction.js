"use client";
import { useAuth } from "@/hooks/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotSalePropertyAuction = () => {
  const { token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [auctionAmount, setAuctionAmount] = useState();

  const fetchLocations = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/v1/eligible-for-auction`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  };

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["actions"],
    queryFn: fetchLocations,
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
      project_id: selectedProduct.project_id,
      product_id: selectedProduct.id,
      auction_amount: auctionAmount,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/auctions`,
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
      <section className="our-faq pt-20 py-12 md:px-4">
        <div className="container mx-auto max-w-7xl">
          <p className="text-center">Loading Banners...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="our-faq pt-20 py-12 md:px-4">
        <div className="container mx-auto max-w-7xl">
          <p className="text-center text-red-600">Error loading properties</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="row">
        <div className="col-lg-12" data-aos="fade-up" data-aos-delay="300">
          <div className="tab-content">
            <div className="row">
              <Swiper
                spaceBetween={30}
                modules={[Navigation, Pagination]}
                navigation={{
                  nextEl: ".featured-next__active",
                  prevEl: ".featured-prev__active",
                }}
                pagination={{
                  el: ".featured-pagination__active",
                  clickable: true,
                }}
                slidesPerView={1}
                breakpoints={{
                  300: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 2,
                  },
                  1200: {
                    slidesPerView: 3,
                  },
                }}
              >
                {products?.map((listing) => (
                  <SwiperSlide key={listing.id}>
                    <div className="item">
                      <div className="listing-style7 mb10">
                        <div className="list-thumb">
                          <Link href={`/property/${listing.id}`}>
                            <Image
                              width={382}
                              height={248}
                              className="w-100 h-80 cover"
                              src={getSingleImage(listing.images)}
                              alt="listings"
                            />
                          </Link>
                          <div className="sale-sticker-wrap">
                            <div className="list-tag2 rounded-0 fz12">
                              FOR SALE
                            </div>
                          </div>
                          <div className="list-meta">
                            <a href="#" className="mr5">
                              <span className="flaticon-fullscreen" />
                            </a>
                            <a href="#" className="mr5">
                              <span className="flaticon-new-tab" />
                            </a>
                            <a href="#">
                              <span className="flaticon-like" />
                            </a>
                          </div>
                        </div>
                        <div className="list-content">
                          <h6 className="list-title">
                            <Link href={`/property/${listing.id}`}>
                              {listing.description}
                            </Link>
                          </h6>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="list-price">
                              {listing.total_price.toLocaleString()}{" "}
                              <span>৳</span>
                            </div>
                            <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                              <a
                                href="#"
                                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
                              >
                                <i className="fas fa-bed text-blue-500 mr-1"></i>
                                {listing?.bedroom || "N/A"}
                              </a>
                              <a
                                href="#"
                                className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-200"
                              >
                                <i className="fas fa-bath text-green-500 mr-1"></i>
                                {listing?.bathroom || "N/A"}
                              </a>
                              <a
                                href="#"
                                className="flex items-center text-gray-700 hover:text-purple-600 transition-colors duration-200"
                              >
                                <i className="fas fa-ruler-combined text-purple-500 mr-1"></i>
                                {listing?.flat_size
                                  ? `${listing.flat_size} sqft`
                                  : "N/A"}
                              </a>
                            </div>
                          </div>
                          <div
                            className="d-flex justify-content-center"
                            style={{
                              backgroundColor: "#00C194",
                              padding: "8px 0",
                              borderRadius: "10px",
                              marginTop: "10px",
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
                              Sell on Auction
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <button className="featured-prev__active swiper_button">
                    <i className="far fa-arrow-left-long" />
                  </button>
                </div>
                <div className="col-auto">
                  <div className="pagination swiper--pagination featured-pagination__active" />
                </div>
                <div className="col-auto">
                  <button className="featured-next__active swiper_button">
                    <i className="far fa-arrow-right-long" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <h2 className="mb-4 text-xl font-bold">Confirm Auction</h2>
            <p className="mb-4">
              Place an auction for{" "}
              <strong>{selectedProduct?.description.slice(0, 60)}</strong>.
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

      <ToastContainer />
    </>
  );
};

export default NotSalePropertyAuction;
