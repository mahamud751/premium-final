import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Partner from "@/components/common/Partner";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import AboutContent from "@/components/pages/about/AboutContent";
import Link from "next/link";

export const metadata = {
  title: "About ",
};

const About = () => {
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcrumb Sections */}
      <section
        className="breadcumb-section2 p-0"
        style={{
          backgroundImage: "url(/img/1.jpg",
          height: "600px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></section>
      {/* End Breadcrumb Sections */}

      {/* About page content start here */}
      <div className="container">
        <AboutContent />
      </div>
      {/* About page content end here */}

      {/* Our Partners */}
      <section className="our-partners">
        <div className="container">
          <div className="row">
            <div className="col-lg-12" data-aos="fade-up">
              <div className="main-title text-center">
                <h2 className="text-3xl font-bold">
                  Trusted by the world’s best
                </h2>
              </div>
            </div>
            <div className="col-lg-12 text-center">
              <div
                className="dots_none nav_none"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <Partner />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Our Partners */}

      {/* Our CTA */}
      <CallToActions />
      {/* Our CTA */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default About;
