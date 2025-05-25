"use client";
import { useState, useEffect, use } from "react";
import UseFetch from "@/hooks/useFetch";

import styles from "../../../app/Slider.module.css";

const Slider = () => {
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
    <div className={styles.sliderContainer}>
      <div className={styles.slide}>
        {items?.map((item) => (
          <div
            key={item?.id}
            className={styles.item}
            style={{
              background: `url('${item?.image[0]}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        ))}
      </div>
      <div className={styles.button}>
        <button onClick={handlePrev} className={styles.prev}>
          <i className="fa-solid fa-arrow-left bg-white hover:text-black px-2 rounded"></i>
        </button>{" "}
        &nbsp;
        <button onClick={handleNext} className={styles.next}>
          <i className="fa-solid fa-arrow-right bg-white px-2 rounded hover:text-black"></i>
        </button>
      </div>
    </div>
  );
};

export default Slider;
