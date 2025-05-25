import {
  FaBuilding,
  FaCheckCircle,
  FaGlobeAmericas,
  FaUsers,
} from "react-icons/fa";
import FunFact from "./FunFact";

export default function AboutContent() {
  return (
    <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
        <p className="text-lg text-center max-w-2xl mx-auto mb-12 text-gray-800">
          The Premium Homes Ltd is a real estate and land development company
          dedicated to providing unparalleled property solutions to its clients
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              Icon: FaBuilding,
              title: "Premium Properties",
              desc: "Discover handpicked listings featuring the finest residential and commercial spaces designed for modern lifestyles.",
            },
            {
              Icon: FaUsers,
              title: "Expert Team",
              desc: "Our experienced agents are dedicated to guiding you through every step — from discovery to deal closure.",
            },
            {
              Icon: FaGlobeAmericas,
              title: "Global Reach",
              desc: "With an international network, we bring you investment opportunities and relocations across borders.",
            },
          ].map(({ Icon, title, desc }, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl shadow  transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <Icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
              <p className="text-gray-800">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Funfact */}
      <section className="pt-0">
        <div className="container">
          <div
            className="row justify-content-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <FunFact />
          </div>
        </div>
      </section>
      {/* End Funfact */}

      <section className=" px-6 py-16">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-center">
          <img
            src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c"
            alt="Modern Real Estate"
            className="w-full lg:w-1/2 rounded-2xl shadow-lg object-cover"
          />
          <div>
            <h2 className="text-3xl font-bold mb-4">The Premium Homes Ltd?</h2>
            <p className="mb-4 text-gray-800">
              We're not just another real estate agency — we’re your trusted
              advisors. With deep market insight and an unwavering commitment to
              integrity, our team ensures a seamless and rewarding experience.
            </p>
            <ul className="space-y-3">
              {[
                "Trusted by 10,000+ happy homeowners",
                "Tailored solutions for buyers and sellers",
                "Dedicated post-sale support",
                "Virtual tours & 24/7 support",
                "Transparent pricing with no hidden fees",
              ].map((text, idx) => (
                <li key={idx} className="flex items-center text-base">
                  <FaCheckCircle className="text-green-500 mr-2" />{" "}
                  <span className="text-gray-700">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
