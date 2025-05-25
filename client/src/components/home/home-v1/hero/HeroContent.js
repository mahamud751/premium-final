"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import Marquee from "react-fast-marquee";
const HeroContent = () => {
  const router = useRouter();

  return (
    <div className="advance-search-tab mt70  animate-up-3">
      <div className="row ">
        <div
          className="col-lg-6"
          style={{
            textAlign: "left",
          }}
        >
          <h3
            className="text-white "
            style={{
              marginTop: "100px",
            }}
          >
            Earn up to 10% per year by claiming your piece of property.
          </h3>
          <button>Buy Now</button>
        </div>
        <div className="col-lg-6 banner_left_part d-none d-md-block d-lg-block">
          <div className="row">
            <div
              className="col-lg-6 slide_1"
              style={
                {
                  // paddingTop: "198px",
                }
              }
            >
              <Marquee direction="down" autoFill={true}>
                <Image
                  className="mt-2"
                  width={245}
                  height={370}
                  src="/images/home/slideImg1.png"
                  alt="Pic"
                />

                <Image
                  className="mt-2"
                  width={245}
                  height={370}
                  src="/images/home/slideImg2.png"
                  alt="Pic"
                />
              </Marquee>
            </div>

            <div
              className="col-lg-6 slide_2"
              style={
                {
                  // paddingTop: "150px",
                }
              }
            >
              <Marquee direction="up" autoFill={true}>
                <div className="mb-2">
                  <Image
                    width={245}
                    height={370}
                    src="/images/home/slideImg1.png"
                    alt="Pic"
                  />
                </div>
                <div className="mb-2">
                  <Image
                    width={245}
                    height={370}
                    src="/images/home/slideImg2.png"
                    alt="Pic"
                  />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
