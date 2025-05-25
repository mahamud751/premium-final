"use client";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";

import DefaultHeader from "@/components/common/DefaultHeader";
import ProductDetails from "@/components/property/ProductDetails";
import { useParams } from "next/navigation";

const ProductDetailsPage = () => {
  const { id } = useParams();
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      <section className="pt-0 pb60">
        <div className="container">
          <ProductDetails id={id} />
        </div>
      </section>

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default ProductDetailsPage;
