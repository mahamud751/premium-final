import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import FaqContent from "@/components/pages/faq/FaqContent";

export const metadata = {
  title: "Faq  || The Premium Homes Ltd",
};

const Faq = () => {
  return (
    <>
      <DefaultHeader />
      <MobileMenu />

      <section className="breadcumb-section">
        <div className="container">
          <div className="row"></div>
        </div>
      </section>

      <FaqContent />

      <CallToActions />

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default Faq;
