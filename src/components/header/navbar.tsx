"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { IoMdArrowDropdown } from "react-icons/io";
import { usePathname } from "next/navigation";
import { nav } from "../../../data";

const NavbarReact = () => {
  const pathname = usePathname();

  const [navData, setNavData] = useState(nav);

  useEffect(() => {
    if (pathname) {
      setNavData((state) => {
        const newState = [...state];

        newState.map((s) => {
          if (s.items) {
            s.isActive =
              s.items.filter((item) => {
                if (item.link == pathname) {
                  item.isActive = true;
                  return true;
                } else {
                  item.isActive = false;
                  return false;
                }
              }).length > 0
                ? true
                : false;
          } else {
            s.isActive = pathname == s.link;
          }
        });

        return newState;
      });
    }
  }, [pathname]);
  return (
    <div className="hidden lg:block">
      <nav className="bg-white/5 backdrop-blur-xl px-4 py-2.5 rounded-full border border-white/10 flex items-center shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:border-[#FFD700]/20 transition-all duration-300">
        {navData.map((menu, i) => {
          if (menu.items) {
            return (
              <div key={i}>
                <HoverCard openDelay={100}>
                  <HoverCardTrigger
                    className={`text-[13px] font-medium cursor-pointer mr-3 lg:mr-4 flex gap-1 items-center transition-all duration-200 hover:text-[#FFD700] ${
                      menu.isActive ? "text-[#FFD700]" : "text-gray-300"
                    } `}
                  >
                    {menu.label} <IoMdArrowDropdown className="w-4 h-4" />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-max z-[102] bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                    <ul className="flex flex-col gap-1">
                      {menu.items.map((submenu, j) => (
                        <li key={j}>
                          <Link
                            href={submenu.link}
                            className={`block px-4 py-2 rounded-lg text-[13px] transition-all duration-200 ${
                              submenu.isActive
                                ? "text-[#FFD700] bg-[#FFD700]/10"
                                : "text-gray-300 hover:bg-[#FFD700]/10 hover:text-[#FFD700]"
                            }`}
                          >
                            {submenu.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </HoverCardContent>
                </HoverCard>
              </div>
            );
          }
          return (
            <Link
              href={menu.link}
              key={i}
              className={`text-[13px] font-medium mr-3 lg:mr-4 tracking-tight transition-all duration-200 hover:text-[#FFD700] ${
                menu.isActive ? "text-[#FFD700]" : "text-gray-300"
              } `}
            >
              {menu.label}
            </Link>
          );
        })}
        {/* <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className=" flex items-center gap-5 justify-center">
              {navData.map((menu, i) =>
                menu.items ? (
                  <NavDropdown
                    className="flex !flex-col"
                    title={menu.label}
                    id="basic-nav-dropdown"
                    key={i}
                  >
                    {menu.items.map((submenu, j) => (
                      <NavDropdown.Item
                        key={j}
                        href={submenu.link}
                        className="block hover:bg-[#AD800A] hover:transition-colors px-2 py-1 rounded-sm"
                      >
                        {submenu.label}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                ) : (
                  <Nav.Link href={menu.link} key={i}>
                    {menu.label}
                  </Nav.Link>
                )
              )}
            </Nav>
          </Navbar.Collapse>
        </Container> */}
      </nav>
    </div>
  );
};

export default NavbarReact;
