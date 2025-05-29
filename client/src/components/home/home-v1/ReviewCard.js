"use client";
import lgVideo from "lightgallery/plugins/video";
import LightGallery from "lightgallery/react";
import Image from "next/image";
import { FaPlayCircle } from "react-icons/fa";

import "lightgallery/css/lg-video.css";
import "lightgallery/css/lightgallery.css";

const ReviewCard = ({ review, index }) => {
  const getSingleImage = (image) => {
    return image || "/fallback-image.jpg";
  };

  return (
    <div className="bg-white flex flex-col gap-4 rounded-xl border p-4 shadow-sm transition-all duration-300 hover:shadow-lg">
      {/* Video Section */}
      <LightGallery
        speed={500}
        plugins={[lgVideo]}
        elementClassNames="video-wrapper flex-shrink-0"
      >
        <a
          href={review?.link || "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
          data-lg-size="1280-720"
          data-video={JSON.stringify({
            source: [
              {
                src:
                  review?.link || "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                type: "youtube",
              },
            ],
            attributes: { preload: false, controls: true },
          })}
          className="relative block w-full h-[180px] md:h-[225px] rounded-lg overflow-hidden group"
        >
          <Image
            src={getSingleImage(review?.image?.[0])}
            alt="Review Video Thumbnail"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
            priority={index === 0}
          />
          <FaPlayCircle className="absolute inset-0 m-auto text-white text-5xl opacity-80 group-hover:scale-110 transition-transform duration-200" />
        </a>
      </LightGallery>

      {/* Message Content */}
      <div className="flex flex-col justify-center">
        <p className="text-gray-600 text-base md:text-lg leading-relaxed p-4 bg-gray-100 rounded-lg">
          {review?.message?.length > 100
            ? review?.message.slice(0, 100) + "..."
            : review?.message || "No message provided"}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
