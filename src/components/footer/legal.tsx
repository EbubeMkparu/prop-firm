import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const data = [
  {
    label: "Terms and Conditions",
    link: "https://dashboardanalytix.com/client-terms-and-policies",
  },
  {
    label: "Refund Policy",
    link: "/refund-policy",
  },
  {
    label: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    label: "Cookie Policy",
    link: "https://dashboardanalytix.com/cookie-policy/?v=c419b06b4c65",
  },
];

const Legal = () => {
  return (
    <div>
      <h4 className="text-base lg:text-lg font-semibold text-white">Legals</h4>

      <ul className="mt-5 flex flex-col gap-3">
        {data.map((nav, i) => (
          <li key={i}>
            <a
              href={nav.link}
              className="footer-nav-link text-sm text-gray-400 font-normal hover:text-[#FFD700] transition-colors duration-200 flex gap-2 items-center group"
            >
              {nav.label}{" "}
              <FaArrowRightLong className="w-3 h-3 footer-nav-icon opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legal;
