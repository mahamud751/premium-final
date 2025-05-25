"use client";
import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import ReviewContent from "@/components/home/home-v1/ReviewContent";
import { useAuth } from "@/hooks/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const Reviews = () => {
  const { token } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch paginated reviews
  const fetchReviews = async (page = 1) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/reviews?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["reviews", currentPage],
    queryFn: () => fetchReviews(currentPage),
  });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <DefaultHeader />
      <MobileMenu />

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {isLoading ? (
              <p className="text-center py-12">Loading reviews...</p>
            ) : error ? (
              <p className="text-center py-12 text-red-600">
                Error: {error.message}
              </p>
            ) : (
              <ReviewContent
                reviews={data?.data || []}
                meta={data?.meta || {}}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>

      <CallToActions />

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default Reviews;
