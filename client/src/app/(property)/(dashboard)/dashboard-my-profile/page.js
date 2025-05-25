"use client";
import DefaultHeader from "@/components/common/DefaultHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import PersonalInfo from "@/components/property/dashboard/dashboard-profile/PersonalInfo";
import ProfileBox from "@/components/property/dashboard/dashboard-profile/ProfileBox";
import { useState } from "react";

const DashboardMyProfile = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageChange = (file) => {
    setUploadedImage(file);
  };

  return (
    <>
      <DefaultHeader />
      <MobileMenu />
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-xl">
          <SidebarDashboard />
          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              <div className="row pb40">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
              </div>
              <div className="row align-items-center pb40">
                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2>My Profile</h2>
                    <p className="text">We are glad to see you again!</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    {/* <div className="col-xl-7">
                      <ProfileBox onImageChange={handleImageChange} />
                    </div> */}
                    <div className="col-lg-12">
                      <PersonalInfo
                        uploadedImage={uploadedImage}
                        onImageChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardMyProfile;
