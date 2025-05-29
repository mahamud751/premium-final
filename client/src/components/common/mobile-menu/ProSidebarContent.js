import mobileMenuItems from "@/data/mobileMenuItems";
import { useAuth } from "@/hooks/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";

const ProSidebarContent = () => {
  const path = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { token, logoutUser } = useAuth();

  const handleLinkClick = () => {
    setIsCollapsed(true);
  };

  if (!logoutUser) {
    throw new Error(
      "AuthContext is undefined. Please ensure you are using UserProvider."
    );
  }

  const handleLogout = () => {
    try {
      logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Modify mobileMenuItems based on token
  const updatedMenuItems = token
    ? mobileMenuItems.map((item) =>
        item.link === "/login"
          ? { ...item, label: "Log Out", link: "#", onClick: handleLogout }
          : item
      )
    : mobileMenuItems;

  return (
    <Sidebar
      width="100%"
      backgroundColor="#fff"
      className="my-custom-class"
      collapsed={isCollapsed}
      onBackdropClick={() => setIsCollapsed(true)}
    >
      <Menu>
        {updatedMenuItems?.map((item, index) => (
          <MenuItem
            key={index}
            component={
              item.onClick ? (
                <button
                  onClick={item?.onClick}
                  className={item?.link === path ? "active" : ""}
                >
                  {item?.label}
                </button>
              ) : (
                <Link
                  href={item?.link}
                  className={item?.link === path ? "active" : ""}
                  onClick={handleLinkClick}
                />
              )
            }
          >
            {item?.label}
          </MenuItem>
        ))}
      </Menu>
    </Sidebar>
  );
};

export default ProSidebarContent;
