"use client";

import { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";

export default function PopupModalVideo() {
  const [show, setShow] = useState(false);
  const modalRef = useRef(null);
  const iframeRef = useRef(null);

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
      // Try to unmute after a short delay if autoplay was blocked
      const timer = setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src += "&mute=0";
        }
      }, 1000);
      return () => clearTimeout(timer);
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
        className="relative bg-white rounded-lg shadow-lg p-1 md:p-2 w-full max-w-[600px] overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 bg-black/70 p-2 rounded-full m-1 hover:scale-105 duration-300 cursor-pointer z-10"
        >
          <FiX color="white" size={20} />
        </button>

        {/* Responsive Video with rounded corners */}
        <div className="w-full aspect-video rounded-lg overflow-hidden">
          <iframe
            ref={iframeRef}
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/8fbwq7b4SFk?autoplay=1&mute=1"
            title="ঢাকাতে স্বপ্নের বাড়ি  ! RJ Kebria I The Premium Homes Ltd I"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
