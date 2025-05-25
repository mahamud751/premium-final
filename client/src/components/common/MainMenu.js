"use client";
import { useAuth } from "@/hooks/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MainMenu = () => {
  const { user } = useAuth();
  const pathname = usePathname();

  // Function to determine if a menu item is active
  const isActive = (path) => {
    return pathname === path || (path !== "/" && pathname.startsWith(path));
  };

  return (
    <ul className="ace-responsive-menu">
      <li className="visible_list dropitem">
        <Link className="list-item" href="/">
          <span className={`title ${isActive("/") ? "text-[#10572A]" : ""}`}>
            Home
          </span>
        </Link>
      </li>

      {user && (
        <li className="visible_list dropitem">
          <Link className="list-item" href="/marketplaces">
            <span
              className={`title ${
                isActive("/marketplaces") ? "text-[#10572A]" : ""
              }`}
            >
              MarketPlaces
            </span>
          </Link>
        </li>
      )}

      <li className="visible_list dropitem">
        <Link className="list-item" href="/properties">
          <span
            className={`title ${
              isActive("/properties") ? "text-[#10572A]" : ""
            }`}
          >
            Properties
          </span>
        </Link>
      </li>

      <li className="visible_list dropitem">
        <Link className="list-item" href="/projects">
          <span
            className={`title ${isActive("/projects") ? "text-[#10572A]" : ""}`}
          >
            Projects
          </span>
        </Link>
      </li>

      <li className="visible_list dropitem">
        <Link className="list-item" href="/reviews">
          <span
            className={`title ${isActive("/reviews") ? "text-[#10572A]" : ""}`}
          >
            Reviews
          </span>
        </Link>
      </li>

      <li className="megamenu_style dropitem">
        <Link className="list-item" href="/about">
          <span
            className={`title ${isActive("/about") ? "text-[#10572A]" : ""}`}
          >
            About
          </span>
        </Link>
      </li>

      <li className="visible_list dropitem">
        <Link className="list-item" href="/contact">
          <span
            className={`title ${isActive("/contact") ? "text-[#10572A]" : ""}`}
          >
            Contact
          </span>
        </Link>
      </li>

      <li className="visible_list dropitem">
        <Link className="list-item" href="/faq">
          <span className={`title ${isActive("/faq") ? "text-[#10572A]" : ""}`}>
            Faq
          </span>
        </Link>
      </li>

      <li className="megamenu_style dropitem">
        <Link className="list-item" href="/blogs">
          <span
            className={`title ${isActive("/blogs") ? "text-[#10572A]" : ""}`}
          >
            Blogs
          </span>
        </Link>
      </li>
    </ul>
  );
};

export default MainMenu;
