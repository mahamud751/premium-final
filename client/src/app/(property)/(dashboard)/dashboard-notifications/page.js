import DefaultHeader from "@/components/common/DefaultHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import UserInboxList from "@/components/property/dashboard/dashboard-message/UserInboxList";
export const metadata = {
  title: "Dashboard Message || Homez - Real Estate NextJS Template",
};

const DashboardMessage = () => {
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

              <div className="row mb40">
                <div className="col-lg-8 col-xl-8 col-xxl-8">
                  <div className="message_container">
                    <div className="inbox_user_list">
                      <div className="iu_heading pr35"></div>

                      <div className="chat-member-list pr20">
                        <UserInboxList />
                      </div>
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

export default DashboardMessage;
