"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const fetchProducts = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/v1/products`
  );
  return response.data.data;
};

const FilterProperties = () => {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const getSingleImage = (images) => {
    if (Array.isArray(images)) {
      return images[0] || "/path/to/fallback-image.jpg";
    }
    return images || "/path/to/fallback-image.jpg";
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
          <p className="text-center text-red-600">Failed to load properties</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="row wow fadeInUp" data-wow-delay="100ms">
        <div className="col-lg-12">
          <div className="main-title2 flex justify-between items-center w-full">
            <h2 className="text-[22px] md:text-3xl font-bold">
              All Available Properties
            </h2>
            <Link
              href="/properties"
              className="bg-[#10572A] text-white px-2 md:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              View All
            </Link>
          </div>
        </div>
      </div>

      <div className="row px-2">
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
                {products?.map((listing) => {
                  return (
                    <SwiperSlide key={listing.id}>
                      <Link href={`/property/${listing.id}`}>
                        <div className="item">
                          <div className="listing-style7 mb10">
                            <div className="list-thumb">
                              <Image
                                width={382}
                                height={248}
                                className="w-100 h-80 cover"
                                src={getSingleImage(listing?.images)}
                                alt="listings"
                              />
                              <div className="sale-sticker-wrap">
                                <div
                                  className="list-tag2 rounded-0 fz12"
                                  style={{
                                    background: listing?.user_id
                                      ? "red"
                                      : "green",
                                  }}
                                >
                                  {listing?.user_id ? (
                                    <p style={{ color: "white" }}>SOLD</p>
                                  ) : (
                                    <p style={{ color: "white" }}>FOR SALE</p>
                                  )}
                                </div>
                              </div>

                              <div className="list-meta">
                                <Link
                                  href={`/property/${listing.id}`}
                                  className="mr5"
                                >
                                  <span className="flaticon-fullscreen" />
                                </Link>
                                {/* <a href="#" className="mr5">
                                  <span className="flaticon-new-tab" />
                                </a> */}
                                {/* <a href="#">
                                  <span className="flaticon-like" />
                                </a> */}
                              </div>
                            </div>
                            <div className="list-content">
                              <h6 className="list-title">
                                <Link href={`/product/${listing?.id}`}>
                                  {listing?.flat_type}-{listing?.floor_number}
                                </Link>
                              </h6>

                              <div className="d-flex justify-content-between align-items-center">
                                <div className="list-price">
                                  <p className="text-[#10572A]">
                                    {" "}
                                    {listing?.total_price} ৳
                                  </p>
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
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
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
    </>
  );
};

export default FilterProperties;
