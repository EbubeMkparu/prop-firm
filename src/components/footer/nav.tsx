import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const data = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "About",
    link: "/about-us",
  },
  {
    label: "Affiliate",
    link: "/affiliates",
  },
  {
    label: "Contact Us",
    link: "/contact-us",
  },
  {
    label: "FAQS",
    link: "/crypto-faq",
  },
];

const Nav = () => {
  return (
    <div>
      <h4 className="text-base lg:text-lg font-semibold text-white">
        Navigations
      </h4>

      <ul className="mt-5 flex flex-col gap-3">
        {data.map((nav, i) => (
          <li key={i}>
            <Link
              href={nav.link}
              className="footer-nav-link text-sm text-gray-400 flex gap-2 items-center font-normal hover:text-[#FFD700] transition-colors duration-200 group"
            >
              {nav.label}{" "}
              <FaArrowRightLong className="w-3 h-3 footer-nav-icon opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
