// components/ContactForm.js
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const ContactForm = () => {
  return (
    <div className=" rounded-lg bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-semibold text-center text-gray-800 mb-12">
          Contact Us
        </h1>

        <div className="flex flex-col lg:flex-row lg:gap-12">
          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-8 mb-10 lg:mb-0">
            <h2 className="text-2xl font-medium text-gray-700">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <FaPhoneAlt className="text-2xl text-[#00C194] mt-1" />
                <div>
                  <p className="text-lg font-semibold text-gray-800">Call Us</p>
                  <p className="text-gray-600">HOTLINE:- 09617-777-000</p>
                  <p className="text-gray-600">MOBILE:- +880 1901-310845</p>
                  <p className="text-gray-600">MOBILE:- +880 1901-310846</p>
                  <p className="text-gray-600">MOBILE:- +880 1901-365040</p>
                  <p className="text-gray-600">MOBILE:- +880 1740 362 000</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FaEnvelope className="text-2xl text-[#00C194] mt-1" />
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Email Us
                  </p>
                  <p className="text-gray-600">contact@realestate.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt className="text-2xl text-[#00C194] mt-1" />
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Visit Us
                  </p>
                  <p className="text-gray-600">
                    CORPORATE OFFICE: 23/2, SEL HUQ SKY PARK, LEVEL- 4, SHYMOLI,
                    DHAKA.
                  </p>
                  <p className="text-gray-600">
                    SITE OFFICE:- 2ND & 3RD FLOOR, TOKYO PLAZA, AMIN MOHAMMAD
                    MODEL TOWN, DHAKA
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-medium text-gray-700 mb-6">
              Send a Message
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C194]"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="johndoe@example.com"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C194]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Your message here..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C194]"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#10572A] text-white text-lg font-semibold rounded-lg transition duration-200 focus:outline-none"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
