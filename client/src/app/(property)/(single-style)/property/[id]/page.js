"use client";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import OverView from "@/components/property/property-single-style/common/OverView";
import PropertyDetails from "@/components/property/property-single-style/common/PropertyDetails";
import PropertyHeader from "@/components/property/property-single-style/common/PropertyHeader";
import ProperytyDescriptions from "@/components/property/property-single-style/common/ProperytyDescriptions";
import ContactWithAgent from "@/components/property/property-single-style/sidebar/ContactWithAgent";
import ScheduleTour from "@/components/property/property-single-style/sidebar/ScheduleTour";
import PropertyGallery from "@/components/property/property-single-style/single-v1/PropertyGallery";
import FilterProperties from "@/components/home/home-v1/FilterProperties";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination as SwiperPagination } from "swiper";
import Image from "next/image";

import axios from "axios";
import { useAuth } from "@/hooks/auth";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import "swiper/swiper-bundle.min.css";
import React from "react";

const Propery = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const fetchSingleProduct = async (id, token) => {
    const response = await axios.get(
      `https://erp.samironbarai.xyz/v1/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  };

  const { data: product } = useQuery({
    queryKey: ["single-product", id],
    queryFn: () => fetchSingleProduct(id, token),
  });

  // Ensure layout_images and documents are arrays
  const layoutImages = Array.isArray(product?.layout_images)
    ? product.layout_images
    : [];
  const documents = Array.isArray(product?.documents) ? product.documents : [];

  return (
    <>
      <DefaultHeader />
      <MobileMenu />
      <section className="pt60 pb90 bgc-f7">
        <div className="container">
          <div className="row">
            <PropertyHeader product={product} />
          </div>

          <div className="row mb30 mt30">
            <PropertyGallery product={product} />
          </div>

          <div className="row wrap">
            <div className="col-lg-8">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Overview</h4>
                <div className="row">
                  <OverView product={product} />
                </div>
              </div>

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Property Description</h4>
                <ProperytyDescriptions product={product} />

                {/* Layout Images Slider */}
                {layoutImages.length > 0 && (
                  <div className="mt50 mb30">
                    <h4 className="title fz17 mb30">Layout Images</h4>
                    <Swiper
                      spaceBetween={30}
                      modules={[Navigation, SwiperPagination]}
                      navigation={{
                        nextEl: ".layout-images-next__active",
                        prevEl: ".layout-images-prev__active",
                      }}
                      pagination={{
                        el: ".layout-images-pagination__active",
                        clickable: true,
                      }}
                      slidesPerView={1}
                      breakpoints={{
                        300: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 2 },
                        1200: { slidesPerView: 2 },
                      }}
                      className="mySwiper"
                    >
                      {layoutImages.map((image, index) => (
                        <SwiperSlide key={index}>
                          <div className="relative w-full h-80 rounded-lg overflow-hidden">
                            <Image
                              width={600}
                              height={450}
                              className="w-full h-full object-cover"
                              src={image}
                              alt={`Layout Image ${index + 1}`}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <div className="row align-items-center justify-content-center mt-4">
                      <div className="col-auto">
                        <button className="layout-images-prev__active swiper_button">
                          <i className="far fa-arrow-left-long" />
                        </button>
                      </div>
                      <div className="col-auto">
                        <div className="pagination swiper--pagination layout-images-pagination__active" />
                      </div>
                      <div className="col-auto">
                        <button className="layout-images-next__active swiper_button">
                          <i className="far fa-arrow-right-long" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Documents Links */}
                {documents.length > 0 && (
                  <div className="mt50 mb30">
                    <h4 className="title fz17 mb30">Documents</h4>
                    <ul className="list-group">
                      {documents.map((doc, index) => (
                        <li key={index} className="list-group-item">
                          <a
                            href={doc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Document {index + 1} (PDF)
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <h4 className="title fz17 mb30 mt50">Property Details</h4>
                <div className="row">
                  <PropertyDetails product={product} />
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="column">
                <div className="default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                  <h4 className="form-title mb5">Book A Free Consultation</h4>
                  <ScheduleTour product={product} />
                </div>

                <div className="agen-personal-info position-relative bgc-white default-box-shadow1 bdrs12 p30 mt30">
                  <div className="widget-wrapper mb-0">
                    <h6 className="title fz17 mb30">Get More Information</h6>
                    <ContactWithAgent />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="property-city-slider">
                <FilterProperties />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default Propery;
