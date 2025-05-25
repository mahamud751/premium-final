"use client";
import React from "react";

const ContactMeta = () => {
  const contactInfoList = [
    {
      title: "Total Free Customer Care",
      phone: `
      +880 1901-310845
      +880 1901-310846
      +880 1901-365040
      +880 1740 362 000`,
      phoneLink: "tel:+880 1901-310845", // Updated to a valid number for linking
    },
    {
      title: "Need Live Support?",
      mail: "info@dpremiumhomes.com",
      mailLink: "mailto:info@dpremiumhomes.com", // Corrected to use mailto:
    },
  ];

  return (
    <div className="row mb-4 mb-lg-5">
      {contactInfoList.map((contact, index) => (
        <div className="col-auto" key={index}>
          <div className="contact-info rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
            <p className="info-title text-lg font-semibold text-gray-900 mb-2">
              {contact.title}
            </p>
            {contact.phone && (
              <div className="info-phone flex flex-col gap-1">
                {contact.phone
                  .trim()
                  .split("\n")
                  .map((phoneNumber, idx) => (
                    <a
                      key={idx}
                      href={contact.phoneLink}
                      className="text-base text-gray-600 hover:text-[#10572A] transition-colors duration-200"
                    >
                      {phoneNumber.trim()}
                    </a>
                  ))}
              </div>
            )}
            {contact.mail && (
              <h6 className="info-mail">
                <a
                  href={contact.mailLink}
                  className="text-base text-gray-600 hover:text-[#10572A] transition-colors duration-200"
                >
                  {contact.mail}
                </a>
              </h6>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactMeta;
