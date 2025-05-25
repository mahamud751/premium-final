"use client";
import Image from "next/image";

const HolderBenifits = () => {
  return (
    <>
      <div className="row">
        <div className="col-lg-6 text-center">
          {" "}
          <h2
            style={{
              fontSize: "35px",
              color: "#EB6753",

              paddingTop: "30px",
            }}
          >
            Our Token Holders' Benefit
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "#EB6753",
            }}
          >
            From high returns and low volatility
          </p>
          <div className="">
            <Image
              width={500}
              height={231}
              src="/images/home/holder-benifits-left.png"
              alt="trusted"
            />
          </div>
        </div>
        <div className="col-lg-6 pt-4">
          <Image
            width={568}
            height={434}
            src="/images/home/holder-benifis-right.png"
            alt="trusted"
          />
        </div>
      </div>
    </>
  );
};

export default HolderBenifits;
