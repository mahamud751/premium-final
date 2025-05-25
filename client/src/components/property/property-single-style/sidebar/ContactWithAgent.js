import Image from "next/image";
import Link from "next/link";
import React from "react";

const ContactWithAgent = () => {
  return (
    <>
      <div className="agent-single d-sm-flex align-items-center pb25">
        <div className="single-img mb30-sm">
          <Image
            width={90}
            height={90}
            className="w90"
            src="/images/logo2.jpg"
            alt="avatar"
          />
        </div>
        <div className="single-contant ml20 ml0-xs">
          <h6 className="title mb-1">The Premium Homes LTD</h6>
          <div className="agent-meta mb10 d-md-flex align-items-center">
            <a className="text fz15" href="#">
              <i className="flaticon-call pe-1" />
              +880 1767 490 372
            </a>
          </div>
        </div>
      </div>
      {/* End agent-single */}

      <div className="d-grid">
        <button className="ud-btn btn-white2">
          Contact US
          <i className="fal fa-arrow-right-long" />
        </button>
      </div>
    </>
  );
};

export default ContactWithAgent;
