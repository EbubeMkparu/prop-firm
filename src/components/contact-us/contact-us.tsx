import React from "react";
import SecondaryButton from "../buttons/secondary-button";
import { RiDiscordFill } from "react-icons/ri";
import { Contact } from "../../../data/page/contact";

const ContactUs = () => {
  return (
    <section className="pt-[100px] md:pt-[420px] lg:pt-24 container  ">
      <div className="flex flex-col items-center">
        <h4 className="text-foreground font-bold text-lg md:text-xl lg:text-2xl tracking-wide">
          Contact Us! We are here for you 24/5
        </h4>
        <h3 className="text-3xl text-center md:text-4xl lg:text-5xl font-bold tracking-wide bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent">
          Join our Telegram chat community
        </h3>
        <a href={Contact.discord}>
          <SecondaryButton className=" mt-5 lg:mt-8 ">
            <RiDiscordFill className="text-foreground w-5 h-5 lg:w-6 lg:h-6" />{" "}
            JOIN NOW
          </SecondaryButton>
        </a>
      </div>
      <div className="mt-12 md:mt-16 lg:mt-20">
        <p className="text-foreground  text-sm font-normal mb-7 lg:mb-12 ">
          <b>DISCLAIMER:</b> PIPZEN is an affiliate of Forest Park FX LTD.
          Forest Park FX LTD offers fee-based simulated trading assessments for
          Potential Traders. All funding assessments are provided by Forest Park
          FX LTD and all assessment fees are paid to Forest Park FX LTD. If you
          qualify for a Funded Account, you will be required to enter into a
          Trader Agreement with Forest Park FX LTD. Forest Park FX LTD does not
          provide any trading education or other services.
        </p>
      </div>
    </section>
  );
};

export default ContactUs;
