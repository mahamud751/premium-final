"use client";

import { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";

export default function PopupModalVideo() {
  const [show, setShow] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const alreadyClosed = sessionStorage.getItem("popupClosed");
    if (!alreadyClosed) {
      setShow(true);
    }

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closePopup();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  const closePopup = () => {
    setShow(false);
    sessionStorage.setItem("popupClosed", "true");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999999] bg-black/60 flex items-center justify-center p-2 md:p-4">
      <div
        ref={modalRef}
        className="relative bg-white rounded shadow-lg p-1 md:p-2 w-full max-w-[600px]"
      >
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 bg-black/70 p-2 rounded-md m-1 hover:scale-105 duration-300 cursor-pointer text-black text-xl hover:text-red-600"
        >
          <FiX color="white" />
        </button>
        {/* Responsive Video */}
        <div className="w-full aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/4jnzf1yj48M?si=u-gQTz821x0Sep4-"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
