import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import ContactForm from "@/components/pages/contact/ContactForm";

export const metadata = {
  title: "Contact  || The Premium Homes LTD",
};

const Contact = () => {
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Our Contact With Map */}
      <section className="p-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3648.419635385954!2d90.311326!3d23.874734000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sbd!4v1748192153649!5m2!1sen!2sbd"
          loading="lazy"
          className="home8-map contact-page"
          title="Google Map Location"
        ></iframe>
      </section>
      {/* End Our Contact With Map */}

      {/* Start Our Contact Form */}
      <section></section>
      {/* End Our Contact Form */}

      {/* Contact form start here */}
      <section className="container">
        <ContactForm />
      </section>
      {/* Contact form end here */}

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

export default Contact;
