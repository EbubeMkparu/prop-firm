import React from "react";

interface SectionHeaderProps {
  title: string;
  shortDescription?: string;
}
const SectionHeader = ({ title, shortDescription }: SectionHeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center mb-5 md:mb-8 lg:mb-12">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent max-w-[350px] md:max-w-[450px] text-center">
        {title}
      </h2>
      {shortDescription && (
        <p className="text-lg text-gray-400 mt-2 text-center">
          {shortDescription}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
