import { Public_Sans } from "next/font/google";
import Providers from "./provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import { Metadata } from "next";
import "./globals.css";

const roboto = Public_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Premium Home Admin",
  description:
    "Discover unique products and inspiring blogs at The Premium Home Ltd.",
  keywords: [
    "e-commerce",
    "The Premium Home Ltd",
    "shopping",
    "admin",
    "blogs",
    "fashion",
    "accessories",
    "medicine",
  ],
  authors: [{ name: "Mahamud Pino", url: "https://admin.korbojoy.shop" }],
  openGraph: {
    title: "The Premium Home Ltd",
    description: "Explore a world of unique products and insightful blogs.",
    url: "https://admin.korbojoy.shop",
    siteName: "The Premium Home Ltd",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://i.ibb.co/CMkLbff/Icon.png",
        width: 800,
        height: 600,
        alt: "The Premium Home Ltd Banner",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AppRouterCacheProvider options={{ prepend: true }}>
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
