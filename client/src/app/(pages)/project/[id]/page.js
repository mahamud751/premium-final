"use client";
import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import CategoryContent from "@/components/home/home-v1/CategoryContent";
import { useAuth } from "@/hooks/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";

const Project = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);

  const fetchSingleProduct = async (id, token, page = 1) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/products?_project_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["single-project-product", id, currentPage],
    queryFn: () => fetchSingleProduct(id, token, currentPage),
  });

  const fetchSingleProject = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/projects`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  };

  const { data: projectData } = useQuery({
    queryKey: ["single-project-data"],
    queryFn: () => fetchSingleProject(),
  });

  const mainProject = projectData?.data?.find((project) => project.id == id);

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
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : (
              <CategoryContent
                product={data?.data}
                meta={data?.meta}
                onPageChange={handlePageChange}
                mainProject={mainProject}
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

export default Project;
