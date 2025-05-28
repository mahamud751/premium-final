import DefaultHeader from "@/components/common/DefaultHeader";

import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import ProjectFiltering from "@/components/listing/ProjectFiltering";

export const metadata = {
  title: "The Premium Homes Ltd",
};

const Market = () => {
  return (
    <>
      <DefaultHeader />
      <MobileMenu />
      <div className="my-10 text-center">
        <p className="text-bolder text-2xl md:text-[60px] text-[#10572A]"> Projects</p>
      </div>
      <ProjectFiltering />

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default Market;
