"use client";
import ScrollToTop from "@/components/common/ScrollTop";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Aos from "aos";
import "aos/dist/aos.css";
import { DM_Sans, Poppins } from "next/font/google";
import { useEffect } from "react";
import "react-rangeslider/lib/index.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../../node_modules/react-modal-video/scss/modal-video.scss";
import "../../public/scss/main.scss";
import "./global.css";
import Providers from "./provider";
if (typeof window !== "undefined") {
  import("bootstrap");
}

// DM_Sans font
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--body-font-family",
});

// Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--title-font-family",
});

export default function RootLayout({ children }) {
  const queryClient = new QueryClient();
  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <html lang="en">
      <body
        className={`body  ${poppins.variable} ${dmSans.variable}`}
        cz-shortcut-listen="false"
      >
        <QueryClientProvider client={queryClient}>
          <div className="wrapper ovh">
            <Providers>{children}</Providers>
          </div>

          <ScrollToTop />
        </QueryClientProvider>
      </body>
    </html>
  );
}
