import DefaultHeader from "@/components/common/DefaultHeader";

import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import ProperteyFiltering from "@/components/listing/PropertyFiltering";

export const metadata = {
  title: "The Premium Homes Ltd",
};

const Market = () => {
  return (
    <>
      <DefaultHeader />
      <MobileMenu />
      <div className="my-10 text-center">
        <p className="text-bolder text-2xl md:text-[60px] text-[#10572A]">
          {" "}
          Discover the best properties in the market
        </p>
      </div>
      <ProperteyFiltering />

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default Market;
