"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

function RelatedBlogs() {
  const fetchBlogs = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/v1/blogs`
    );
    return response.data.data;
  };

  const { data: blogsData } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold text-gray-900 md:mb-6">
        Related Articles
      </h2>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".blogs-next__active",
          prevEl: ".blogs-prev__active",
        }}
        pagination={{
          el: ".blogs-pagination__active",
          clickable: true,
        }}
        slidesPerView={1}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {blogsData?.map((post, index) => (
          <SwiperSlide key={index}>
            <Link href={`/blogs/${post?.slug}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                {post?.image?.[0] ? (
                  <Image
                    width={386}
                    height={271}
                    className="w-full h-72 object-cover"
                    src={post.image[0]}
                    alt={post?.title || "Blog image"}
                    onError={(e) => {
                      e.target.src = "/fallback-image.jpg";
                    }}
                  />
                ) : (
                  <Image
                    width={386}
                    height={271}
                    className="w-full h-72 object-cover"
                    src="/fallback-image.jpg"
                    alt="No image available"
                  />
                )}
                <div className="p-4">
                  <Link
                    href={`/blogs/${post?.slug}`}
                    className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                  >
                    {post.title.slice(0, 20)}
                  </Link>
                  <p className="text-gray-600 text-sm mt-2">{post.excerpt}</p>
                  <Link
                    href={`/blogs/${post?.slug}`}
                    className="mt-4 inline-block text-blue-600 font-semibold hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="row align-items-center justify-content-center mt-4">
        <div className="col-auto">
          <button className="blogs-prev__active swiper_button">
            <i className="far fa-arrow-left-long" />
          </button>
        </div>
        <div className="col-auto">
          <div className="pagination swiper--pagination blogs-pagination__active" />
        </div>
        <div className="col-auto">
          <button className="blogs-next__active swiper_button">
            <i className="far fa-arrow-right-long" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RelatedBlogs;
