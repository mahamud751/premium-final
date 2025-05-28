"use client";
import UseFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";

const MobileSlider = () => {
  const { data } = UseFetch("v1/banners");
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (data && data.data) {
      setItems(data.data);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.push(newItems.shift());
      return newItems;
    });
  };

  const handlePrev = () => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.unshift(newItems.pop());
      return newItems;
    });
  };

  return (
    <div className="relative w-full h-[300px] md:h-[600px] overflow-hidden">
      <div className="flex w-full h-full transition-transform duration-500 ease-in-out">
        {items?.map((item) => (
          <div
            key={item?.id}
            className="flex-none w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${item?.image[0]}')`,
            }}
          ></div>
        ))}
      </div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        <button
          onClick={handlePrev}
          className="bg-white px-2 rounded hover:text-black"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button
          onClick={handleNext}
          className="bg-white px-2 rounded hover:text-black"
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default MobileSlider;
