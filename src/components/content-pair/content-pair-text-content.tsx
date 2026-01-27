import React from "react";
import { FaCircleCheck } from "react-icons/fa6";

interface ContentPairTextContentProps {
  title: string;
  features: string[];
}
const ContentPairTextContent = ({
  title,
  features,
}: ContentPairTextContentProps) => {
  return (
    <div className="flex flex-col justify-center flex-1">
      <h3 className="text-2xl md:text-3xl lg:text-4xl tracking-tighter font-bold bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent">
        {title}
      </h3>
      <ul className="p-3 lg:p-5">
        {features.map((feature, i) => (
          <li
            key={i}
            className="flex items-center gap-1 text-base lg:text-lg font-bold text-white tracking-tighter"
          >
            <FaCircleCheck className="w-5 h-5 text-[#FFD700]" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentPairTextContent;
