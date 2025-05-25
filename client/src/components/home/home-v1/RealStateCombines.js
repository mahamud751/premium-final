"use client";
import apartmentType from "@/data/apartmentType";
import Link from "next/link";
import React from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

const RealStateCombines = () => {
  const cardsData = [
    {
      imageSrc: "/images/home/Value-appreciation.png",
      title: "Value appreciation",
      description:
        "In addition to monthly passive income, property appreciates in value like equities, creating long-term wealth for property owners",
      avatarSrc: "/images/home/review-avator.png",
      name: "Leslie Alexander",
      company: "Nintendo",
    },
    {
      imageSrc: "/images/home/Hedgefor-inflation.png",
      title: "Hedge for inflation",
      description:
        "Property is the oldest asset class in history and has always been a great hedge during inflation times, just like gold",
      avatarSrc: "/images/home/review-avator.png",
      name: "Leslie Alexander",
      company: "Nintendo",
    },
    {
      imageSrc: "/images/home/Passive-income.png",
      title: "Passive income",
      description: `Property generates a
      consistent passive income
      like bonds, in the form of
      reliable monthly rental
      payments`,
      avatarSrc: "/images/home/review-avator.png",
      name: "Leslie Alexander",
      company: "Nintendo",
    },
    {
      imageSrc: "/images/home/Storeholdof-wealth.png",
      title: "Storehold of wealth",
      description: `Everybody aspires to own a
        home, making property a
        tangible store of wealth
        with a very high recovery
        value`,
      avatarSrc: "/images/home/review-avator.png",
      name: "Leslie Alexander",
      company: "Nintendo",
    },
    // Add more data for additional cards as needed
  ];
  return (
    <div className="row row-cols-lg-4 row-cols-md-2 row-cols-1 mt-3 g-3">
      {cardsData.map((card, index) => (
        <div key={index} className="col">
          <div style={{ backgroundColor: "#FEF4F3", padding: "20px" }}>
            <Image width={30} height={30} src={card.imageSrc} alt="Pic" />
            <h6 className="mt-2">{card.title}</h6>
            <p>{card.description}</p>
            <div>
              <FaStar style={{ color: "#ff7700" }} />
              <FaStar style={{ color: "#ff7700" }} />
              <FaStar style={{ color: "#ff7700" }} />
              <FaStar style={{ color: "#ff7700" }} />
              <FaStar style={{ color: "#ff7700" }} />
            </div>
            <hr />
            <div className="d-flex gap-3 justify-items-center">
              <div>
                <Image width={60} height={60} src={card.avatarSrc} alt="Pic" />
              </div>
              <div>
                <p>{card.name}</p>
                <p style={{ lineHeight: 0 }}>{card.company}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RealStateCombines;
