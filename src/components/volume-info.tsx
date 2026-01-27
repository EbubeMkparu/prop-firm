import React from "react";
import { RiAccountBox2Fill } from "react-icons/ri";
import { MdOutlinePayment } from "react-icons/md";

interface VolumnInfoProps {
  account_size: string;
  onetime_fee: string;
}
const VolumeInfo = ({ account_size, onetime_fee }: VolumnInfoProps) => {
  return (
    <div className="border-1 w-full md:w-[35%] py-6 border-yellow-400 rounded-[15px] px-8 flex flex-col justify-center items-center gap-5  p-2  text-yellow-400 transition-all">
      <div>
        <div className="flex items-center gap-2">
          <RiAccountBox2Fill className="w-8 md:w-9 h-8 md:h-9" />{" "}
          <span className="text-base md:text-lg text-foreground font-semibold">
            Your Account Size
          </span>
        </div>
        <h3 className=" my-1 text-center text-5xl lg:text-[60px] font-extrabold tracking-tight bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent">
          {account_size}
        </h3>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <MdOutlinePayment className="w-8 md:w-9 h-8 md:h-9" />{" "}
          <span className="text-base md:text-lg text-foreground font-semibold">
            One Time Fee
          </span>
        </div>
        <h3 className="my-1 text-center text-5xl lg:text-[60px] font-extrabold tracking-tight bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent">
          {onetime_fee}
        </h3>
      </div>
    </div>
  );
};

export default VolumeInfo;
