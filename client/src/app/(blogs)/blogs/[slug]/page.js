"use client";

import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import BlogContent from "@/components/home/home-v1/blog/BlogContent";
import { useAuth } from "@/hooks/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";

const fetchSingleBlog = async (slug, token) => {
  const response = await axios.get(
    `https://erp.samironbarai.xyz/v1/blogs/${slug}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data?.data;
};

const SingleBlog = () => {
  const { slug } = useParams();
  const { token } = useAuth();

  const { data: blog, isLoading } = useQuery({
    queryKey: ["single-blog-details", slug],
    queryFn: () => fetchSingleBlog(slug, token),
  });

  return (
    <>
      <DefaultHeader />

      <MobileMenu />

      {isLoading ? (
        <div className="text-center py-10">Loading blog...</div>
      ) : blog ? (
        <BlogContent blog={blog} />
      ) : (
        <div className="text-center py-10 text-red-500">Blog not found.</div>
      )}

      <CallToActions />

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default SingleBlog;
