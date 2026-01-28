import Link from "next/link";
import React from "react";
import { FaYoutube, FaDiscord } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";

import logo from "@/../public/logo.svg";
import Image from "next/image";

import { Contact as ContactData } from "../../../data/page/contact";

const Contact = () => {
  return (
    <div>
      <div>
        <Link href="/" className="text-lg uppercase text-foreground font-bold">
          <Image src={logo} alt="pipzen" className="w-[120px] md:w-[140px]" />
        </Link>

        <h3 className="text-white text-lg md:text-xl uppercase leading-relaxed font-semibold mt-2 tracking-wide">
          Contact US
        </h3>
      </div>
      <div className="mt-3 lg:mt-5">
        <a
          href={`mailto:support@pipzen.io`}
          className="text-sm lg:text-lg font-semibold text-gray-300 hover:text-[#FFD700] transition-colors duration-200"
        >
          support@pipzen.io
        </a>

        <div className="mt-2 flex items-center gap-1">
          {/* {ContactData?.facebook && (
            <ContactLink
              label="Facebook"
              link={ContactData?.facebook}
              Icon={FaFacebook}
            />
          )} */}

          {ContactData.youtube && (
            <ContactLink
              label="Youtube"
              link={ContactData.youtube}
              Icon={FaYoutube}
            />
          )}

          {ContactData.telegram && (
            <ContactLink
              label="Discord"
              link={ContactData.discord}
              Icon={FaDiscord}
            />
          )}

          {ContactData.x && (
            <ContactLink label="X" link={ContactData.x} Icon={FaXTwitter} />
          )}

          {ContactData.instagram && (
            <ContactLink
              label="Instagram"
              link={ContactData.instagram}
              Icon={RiInstagramFill}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;

const ContactLink = ({
  Icon,
  label,
  link,
}: {
  Icon: React.ElementType;
  label: string;
  link: string;
}) => {
  return (
    <a
      title={label}
      href={link}
      target="_blank"
      className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-[#FFD700] hover:border-[#FFD700]/30 hover:bg-[#FFD700]/10 transition-all duration-300"
    >
      <Icon className="w-4 h-4" />
    </a>
  );
};
