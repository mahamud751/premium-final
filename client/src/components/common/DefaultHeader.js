"use client";

import MainMenu from "@/components/common/MainMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import LoginSignupModal from "@/components/common/login-signup-modal";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";

const DefaultHeader = () => {
  const { token, user } = useAuth();
  console.log("user in header", user);
  const [navbar, setNavbar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsWideScreen(window.innerWidth >= 1536);
    };

    checkScreenWidth(); // Initial check
    window.addEventListener("resize", checkScreenWidth);
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);
  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <>
      <header
        className={`header-nav nav-homepage-style light-header menu-home4 main-menu ${
          navbar ? "sticky slideInDown animated" : ""
        }`}
      >
        <nav className="posr">
          <div
            className={`${
              isWideScreen ? "container" : "w-full px-3"
            } posr menu_bdrt1`}
          >
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos mr40">
                    <Link className="header-logo logo1" href="/">
                      <Image
                        width={246}
                        height={44}
                        src="/images/logo.png"
                        alt="Header Logo"
                      />
                    </Link>
                    <Link className="header-logo logo2" href="/">
                      <Image
                        width={246}
                        height={44}
                        src="/images/logo.png"
                        alt="Header Logo"
                      />
                    </Link>
                  </div>

                  <MainMenu />
                </div>
              </div>

              <div className="col-auto w-48">
                <div className="d-flex align-items-center">
                  {!token ? (
                    <a
                      href="#"
                      className="login-info d-flex align-items-cente"
                      data-bs-toggle="modal"
                      data-bs-target="#loginSignupModal"
                      role="button"
                      onClick={openModal}
                    >
                      <i
                        className="far fa-user-circle fz16 me-2"
                        style={{
                          color: "#00C194",
                        }}
                      />{" "}
                      <span className="d-none d-xl-block">Login</span>
                    </a>
                  ) : (
                    <Link className="mx-2" href="/dashboard-home">
                      {user?.image?.[0] ? (
                        <Image
                          src={user.image[0]}
                          alt="User Avatar"
                          width={40}
                          height={40}
                          className="rounded-full mr-2 object-cover w-10 h-10"
                        />
                      ) : (
                        <i
                          className="far fa-user-circle fz16 mr-2"
                          style={{ color: "white" }}
                        />
                      )}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="signup-modal">
        {isModalOpen && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex={-1}
            aria-labelledby="loginSignupModalLabel"
            aria-hidden={!isModalOpen}
          >
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
              <LoginSignupModal closeModal={closeModal} />
            </div>
          </div>
        )}
        {isModalOpen && (
          <div
            className="modal-backdrop fade show"
            onClick={closeModal}
            style={{ zIndex: 1040 }}
          />
        )}
      </div>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div>
    </>
  );
};

export default DefaultHeader;
