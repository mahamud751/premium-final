"use client";
import DefaultHeader from "@/components/common/DefaultHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import NotSaleProperty from "@/components/property/dashboard/dashboard-home/NotSaleProperty";
import TopStateBlock from "@/components/property/dashboard/dashboard-home/TopStateBlock";
import { useAuth } from "@/hooks/auth";

const DashboardHome = () => {
  const { user } = useAuth();
  return (
    <>
      <DefaultHeader />
      <MobileMenu />
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-xl">
          <SidebarDashboard />

          <div className="dashboard__main pl0-md ">
            <div className="dashboard__content bgc-f7">
              <div className="row pb40">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>

                <div className="col-lg-12 text-center">
                  <div className="dashboard_title_area">
                    <h2 className="text-3xl font-bold">{user?.name}!</h2>
                    <p className="text">We are glad to see you again!</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <TopStateBlock />
              </div>
              <div className="row">
                <NotSaleProperty />
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
