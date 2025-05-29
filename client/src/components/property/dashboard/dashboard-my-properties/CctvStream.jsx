"use client";

import { useEffect, useRef } from "react";

const CCTVStream = ({ order }) => {
  const { cc_camera_urls = [] } = order || {};
  console.log("order", order);

  // Create a ref for each video element dynamically
  const videoRefs = useRef(cc_camera_urls?.map(() => null));

  useEffect(() => {
    // Dynamically import hls.js for each video stream
    const hlsInstances = [];

    import("hls.js").then((Hls) => {
      cc_camera_urls?.forEach((videoSrc, index) => {
        const video = videoRefs.current[index];
        if (!video) return;

        if (Hls.default.isSupported()) {
          const hls = new Hls.default();
          hls.loadSource(videoSrc);
          hls.attachMedia(video);
          hlsInstances[index] = hls;
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = videoSrc;
        }
      });
    });

    return () => {
      // Cleanup all HLS instances
      hlsInstances.forEach((hls) => {
        if (hls) hls.destroy();
      });
    };
  }, [cc_camera_urls]);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-4">Live CCTV Streams</h1>
      {cc_camera_urls?.length > 0 ? (
        cc_camera_urls?.map((url, index) => (
          <div key={index} className="mb-8 w-full flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Camera {index + 1}</h2>
            <video
              ref={(el) => (videoRefs?.current[index] = el)}
              className={`w-full lg:w-3/4`}
              controls
              autoPlay
              muted // Add muted to ensure autoplay works in most browsers
            />
          </div>
        ))
      ) : (
        <p className="text-lg text-gray-500">No camera streams available.</p>
      )}
    </div>
  );
};

export default CCTVStream;
