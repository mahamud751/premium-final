"use client";
import { useAuth } from "@/hooks/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const PropertyByCities = () => {
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

  const { data: locations, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchLocations,
  });

  if (isLoading) {
    return (
      <section className="our-faq pt-0 py-12 md:px-4">
        <div className="container mx-auto max-w-7xl">
          <p className="text-center">Loading Locations...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="our-faq pt-0 md:px-4">
      <div>
        <div className="main-title2">
          <h2 className="text-2xl md:text-3xl font-bold">
            Our Projects Section
          </h2>
        </div>
        <Swiper
          spaceBetween={30}
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".cities-next__active",
            prevEl: ".cities-prev__active",
          }}
          pagination={{
            el: ".cities-pagination__active",
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
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 4,
            },
          }}
        >
          {locations?.map((city) => (
            <SwiperSlide key={city?.id}>
              <div className="home9-city-style">
                <Link href={`/project/${city?.id}`}>
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    {city?.images &&
                      Array.isArray(city?.images) &&
                      city?.images[0] && (
                        <Image
                          src={city?.images[0]}
                          alt={city?.name || "City image"}
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          width={400}
                          height={300}
                        />
                      )}
                  </div>
                  <div className="mt-3">
                    <h6 className="text-lg font-semibold">{city?.name}</h6>
                    <p className="text-sm text-gray-600">{city?.address}</p>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="row align-items-center justify-content-center mt-4">
          <div className="col-auto">
            <button className="cities-prev__active swiper_button">
              <i className="far fa-arrow-left-long" />
            </button>
          </div>
          <div className="col-auto">
            <div className="pagination swiper--pagination cities-pagination__active" />
          </div>
          <div className="col-auto">
            <button className="cities-next__active swiper_button">
              <i className="far fa-arrow-right-long" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyByCities;
