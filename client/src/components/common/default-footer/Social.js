import React from "react";

const Social = () => {
  const socialLinks = [
    {
      icon: "fab fa-facebook-f",
      url: "https://www.facebook.com/share/1AsfQSkYMn/",
    },
    {
      icon: "fab fa-linkedin-in",
      url: "https://www.linkedin.com/company/thepremiumhomes/",
    },
    {
      icon: "fab fa-youtube",
      url: "https://youtube.com/@thepremiumhomesltd?si=BrRtNVVgNQPH4irj",
    },
  ];

  return (
    <div className="social-style1">
      {socialLinks?.map((social, index) => (
        <a
          key={index}
          href={social?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="list-inline-item"
        >
          <i className={social?.icon} />
        </a>
      ))}
    </div>
  );
};

export default Social;
