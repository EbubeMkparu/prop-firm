import React from "react";
import Nav from "./nav";
import Legal from "./legal";
import Contact from "./contact";

const Footer = () => {
  return (
    <footer className="relative container pt-[120px] md:pt-[420px] lg:pt-24 pb-[70px] border-t border-t-white/10">
      {/* Subtle gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />

      <div className="gap-10 md:gap-0 grid grid-cols-2 lg:grid-cols-3">
        <Contact />
        <Nav />
        <Legal />
      </div>

      <div className="mt-15 w-[300px] mx-auto border-t border-t-white/10 py-4">
        <p className="text-gray-500 text-center text-sm font-normal mb-2 tracking-wide">
          © Copyright 2025 Pipzen
        </p>
      </div>
    </footer>
  );
};

export default Footer;
