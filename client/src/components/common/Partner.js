"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const fetchPartnerImages = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/v1/vendors`
  );
  return response?.data?.data;
};

const Partner = () => {
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    setShowSlider(true);
  }, []);

  const {
    data: partnerImages,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["vendor-images"],
    queryFn: fetchPartnerImages,
  });

  // Define a placeholder image URL
  const placeholderImage = "https://i.ibb.co/9mZNvqtX/jpg-11.jpg"; // Adjust this path to your placeholder image

  if (isLoading) {
    return (
      <section className="our-faq pt-20 py-12 md:px-4">
        <div className="container mx-auto max-w-7xl">
          <p className="text-center">Loading Vendors...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="our-faq pt-20 py-12 md:px-4">
        <div className="container mx-auto max-w-7xl">
          <p className="text-center text-red-600">Error loading vendors</p>
        </div>
      </section>
    );
  }

  return (
    <section className="our-faq pt-20 py-12 md:px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="main-title2 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Our Partners</h2>
        </div>
        {showSlider && (
          <Swiper
            spaceBetween={30}
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: ".partners-next__active",
              prevEl: ".partners-prev__active",
            }}
            pagination={{
              el: ".partners-pagination__active",
              clickable: true,
            }}
            slidesPerView={6}
            breakpoints={{
              0: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              992: { slidesPerView: 4 },
              1200: { slidesPerView: 6 },
            }}
            loop={false}
            className="swiper-container"
          >
            {partnerImages?.map((vendor) => (
              <SwiperSlide key={vendor?.id}>
                <div className="partner_item text-center">
                  <div className="relative w-full h-40 rounded-lg overflow-hidden">
                    {vendor?.image &&
                    ((Array.isArray(vendor?.image) && vendor?.image[0]) ||
                      (!Array.isArray(vendor?.image) &&
                        vendor?.image &&
                        !vendor?.image.endsWith("/storage"))) ? (
                      <Image
                        src={
                          Array.isArray(vendor?.image)
                            ? vendor?.image[0]
                            : vendor?.image
                        }
                        alt={vendor?.name || "Vendor image"}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        width={222}
                        height={40}
                        style={{ objectFit: "contain" }}
                        className="m-auto"
                      />
                    ) : (
                      <Image
                        src={placeholderImage}
                        alt="Placeholder image"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        width={122}
                        height={24}
                        style={{ objectFit: "contain" }}
                        className="m-auto"
                      />
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <div className="row align-items-center justify-content-center mt-4">
          <div className="col-auto">
            <button className="partners-prev__active swiper_button">
              <i className="far fa-arrow-left-long" />
            </button>
          </div>
          <div className="col-auto">
            <div className="pagination swiper--pagination partners-pagination__active" />
          </div>
          <div className="col-auto">
            <button className="partners-next__active swiper_button">
              <i className="far fa-arrow-right-long" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partner;
