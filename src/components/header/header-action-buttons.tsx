import React from "react";
import OutlineButton from "../buttons/outline.button";
import Link from "next/link";

const HeaderActionButtons = () => {
  return (
    <div className="flex gap-3 items-center">
      <Link
        href="/signin"
        className="text-center uppercase justify-center hover:underline text-white text-xs lg:text-sm font-medium font-['Inter'] leading-normal"
      >
        TRADER LOGIN
      </Link>
      <Link href="/challenges">
        <OutlineButton>GET FUNDED</OutlineButton>
      </Link>
    </div>
  );
};

export default HeaderActionButtons;
