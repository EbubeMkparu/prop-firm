import React from "react";

type ButtonProps = React.HTMLAttributes<HTMLSpanElement> & {
  className?: string;
};

const PrimaryButton: React.FC<ButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <span
      {...props}
      className={`relative inline-flex items-center justify-center bg-gradient-to-r from-[#FFD700] to-[#F4B400] text-black font-bold px-8 py-4 rounded-[48px]
        shadow-[0_0_20px_rgba(255,215,0,0.4),0_0_40px_rgba(255,215,0,0.2)]
        hover:shadow-[0_0_30px_rgba(255,215,0,0.6),0_0_60px_rgba(255,215,0,0.3)]
        hover:scale-105 hover:-translate-y-0.5
        transition-all duration-300 ease-out cursor-pointer
        text-sm md:text-base lg:text-lg whitespace-nowrap w-max
        before:absolute before:inset-0 before:rounded-[48px] before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity ${className}`}
    >
      {children}
    </span>
  );
};

export default PrimaryButton;
