"use client";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

export default function TrustedWorld() {
  return (
    <>
      <section className="" style={{ backgroundColor: " #F7F7F7" }}>
        <h2
          style={{
            fontSize: "35px",
            color: "#00C194",
            textAlign: "center",
          }}
        >
          Trusted by the world’s best
        </h2>

        <div
          className="container trusted_world"
          style={{
            marginTop: "70px",
            textAlign: "center",
            paddingRight: 0,
            paddingLeft: 0,
          }}
        >
          <Swiper
            spaceBetween={0}
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
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
                slidesPerView: 6,
              },
            }}
          >
            <SwiperSlide>
              <div>
                <Image
                  width={84}
                  height={26}
                  // className="w-100 h-100 cover"
                  src="/images/home/1.png"
                  alt="trusted"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Image
                  width={84}
                  height={26}
                  // className="w-100 h-100 cover"
                  src="/images/home/1.png"
                  alt="trusted"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Image
                  width={84}
                  height={26}
                  // className="w-100 h-100 cover"
                  src="/images/home/1.png"
                  alt="trusted"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Image
                  width={84}
                  height={26}
                  // className="w-100 h-100 cover"
                  src="/images/home/1.png"
                  alt="trusted"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Image
                  width={84}
                  height={26}
                  // className="w-100 h-100 cover"
                  src="/images/home/1.png"
                  alt="trusted"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Image
                  width={84}
                  height={26}
                  // className="w-100 h-100 cover"
                  src="/images/home/1.png"
                  alt="trusted"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Image
                  width={84}
                  height={26}
                  // className="w-100 h-100 cover"
                  src="/images/home/1.png"
                  alt="trusted"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Image
                  width={84}
                  height={26}
                  // className="w-100 h-100 cover"
                  src="/images/home/1.png"
                  alt="trusted"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
}
