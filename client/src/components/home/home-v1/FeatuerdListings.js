"use client";
import listings from "@/data/listings";
import Image from "next/image";
import Link from "next/link";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import Slider from "react-rangeslider";
import { useState } from "react";
import UseFetch from "@/hooks/useFetch";

const FeaturedListings = () => {
  const { data: property } = UseFetch(`property`);
  const [value, setValue] = useState(50);

  const handleChangeStart = () => {
    console.log("Change event started");
  };

  const handleChange = (value) => {
    setValue(value);
  };

  const handleChangeComplete = () => {
    console.log("Change event completed");
  };
  return (
    <>
      <Swiper
        spaceBetween={20}
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
        {property.slice(0, 4).map((listing) => (
          <SwiperSlide key={listing.id} className="item-range">
            <div className="item">
              <div className="listing-style1">
                {/* <div className="list-thumb">
                  <Image
                    width={382}
                    height={248}
                    className="w-100 h-100 cover"
                    src={listing.image}
                    alt="listings"
                  />
                </div> */}
                {listing.documents?.map((doc) => (
                  <div className="list-thumb">
                    <Image
                      width={382}
                      height={248}
                      className="w-100 h-100 cover"
                      src={`https://investment-server-om2a.onrender.com/public/uploads/${doc.url}`}
                      alt="listings"
                    />
                  </div>
                ))}
                <div className="list-content">
                  <h6 className="list-title fw-bold">
                    <Link href={`/single-v1/${listing.id}`}>
                      {listing.propertyTitle}
                    </Link>
                  </h6>
                  <p className="list-text">{listing.address}</p>
                  <div className="list-meta d-flex align-items-center">
                    <a href="#">
                      <span className="mr-2">
                        <HiOutlineBuildingOffice2 />
                      </span>
                      10 Floor
                    </a>
                    <a href="#">
                      <span className="flaticon-bed" /> {listing?.totalBedRoom}{" "}
                      bed
                    </a>
                    <a href="#">
                      <span className="flaticon-shower" />{" "}
                      {listing?.totalBathRooms} bath
                    </a>
                    <a href="#">
                      <span className="flaticon-expand" />{" "}
                      {listing?.proertySize} sqft
                    </a>
                  </div>
                  <div className="d-flex justify-content-between mt-2 ">
                    <div className="d-flex justify-items-center gap-2">
                      <p
                        className="fw-bold"
                        style={{ fontSize: "15px", color: "#00C194" }}
                      >
                        13% IRR
                      </p>
                      <div>
                        <Image
                          width={15}
                          height={15}
                          // className="w-100 h-100 cover"
                          src="/images/listings/informationIcon.png"
                          alt="listings"
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-items-center gap-2">
                      <p
                        className="fw-bold"
                        style={{ fontSize: "15px", color: "#00C194" }}
                      >
                        11% ERY
                      </p>
                      <div>
                        <Image
                          width={15}
                          height={15}
                          // className="w-100 h-100 cover"
                          src="/images/listings/informationIcon.png"
                          alt="listings"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="slider"
                    style={{
                      marginTop: "-20px",
                    }}
                  >
                    <Slider
                      min={0}
                      max={100}
                      value={value}
                      onChangeStart={handleChangeStart}
                      onChange={handleChange}
                      onChangeComplete={handleChangeComplete}
                    />
                  </div>
                  <div className="d-flex justify-content-between  ">
                    <p
                      className="fw-bold"
                      style={{ fontSize: "15px", color: "#00C194" }}
                    >
                      95%
                    </p>

                    <p
                      className="fw-bold"
                      style={{ fontSize: "15px", color: "#00C194" }}
                    >
                      4 Points left
                    </p>
                  </div>

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
                    >
                      Buy Now
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
        {/* End prev */}

        <div className="col-auto">
          <div className="pagination swiper--pagination featured-pagination__active" />
        </div>
        {/* End pagination */}

        <div className="col-auto">
          <button className="featured-next__active swiper_button">
            <i className="far fa-arrow-right-long" />
          </button>
        </div>
        {/* End Next */}
      </div>
      {/* End .col for navigation and pagination */}
    </>
  );
};

export default FeaturedListings;
