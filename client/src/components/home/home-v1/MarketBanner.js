"use client";

import Slider from "react-slick";

const MarketBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="container">
      <Slider {...settings}>
        <div>
          <img
            className="object-cover"
            style={{
              width: "100%",
              height: "300px",
              border: "4px solid #00C194",
              borderRadius: "10px",
            }}
            src="https://mymarketplacebuilder.com/wp-content/uploads/2021/10/local-online-marketplaces.jpg"
            alt="scroll image"
          />
        </div>
        <div>
          <img
            className="object-cover"
            style={{
              width: "100%",
              height: "300px",
              border: "4px solid #00C194",
              borderRadius: "10px",
            }}
            src="https://www.ecommerceceo.com/wp-content/uploads/2016/01/Best-Online-Marketplaces.jpg"
            alt="scroll image"
          />
        </div>
        <div>
          <img
            className="object-cover"
            style={{
              width: "100%",
              height: "300px",
              border: "4px solid #00C194",
              borderRadius: "10px",
            }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz82LBUzEf4TO7P5rK7butQb7A1Z9VMx94Q&s"
            alt="scroll image"
          />
        </div>
        <div>
          <img
            className="object-cover"
            style={{
              width: "100%",
              height: "300px",
              border: "4px solid #00C194",
              borderRadius: "10px",
            }}
            src="https://cedcommerce.com/blog/wp-content/uploads/2020/06/Blog-banner-1.jpg"
            alt="scroll image"
          />
        </div>
      </Slider>
    </div>
  );
};

export default MarketBanner;
