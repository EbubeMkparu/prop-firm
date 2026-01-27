"use client";
import React, { useEffect } from "react";
import Brand from "./brand";
import Navbar from "./navbar";
import HeaderActionButtons from "./header-action-buttons";

import NavbarSm from "./navbar-sm";

const Header = () => {
  const [showHeader, setShowHeader] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // scrolling down
        setShowHeader(false);
      } else {
        // scrolling up
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed flex justify-between items-center py-2 lg:py-4 px-3 md:px-5 lg:px-20 w-full z-[100] transition-all duration-500 ease-out ${
        showHeader ? "top-0" : "-top-24"
      } before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/80 before:via-black/50 before:to-transparent before:backdrop-blur-xl before:-z-10`}
    >
      <Brand />
      <Navbar />
      <div className="flex items-center gap-4">
        <HeaderActionButtons />
        <NavbarSm />
      </div>
    </header>
  );
};

export default Header;
