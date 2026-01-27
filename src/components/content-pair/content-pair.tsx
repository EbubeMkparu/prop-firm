/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import ContentPairImages from "./content-pair-images";
import ContentPairTextContent from "./content-pair-text-content";

interface ContentPairProps {
  images: any[];
  title: string;
  features: string[];
}

const ContentPair = ({ images, title, features }: ContentPairProps) => {
  return (
    <div className="content-pair-bg mt-10 lg:mt-20">
      <section className="pt-[100px] md:pt-[420px] lg:pt-24 container flex flex-col lg:flex-row gap-8 items-center lg:justify-between pb-[100px] md:pb-[420px] lg:pb-24">
        <ContentPairImages images={images} />
        <ContentPairTextContent title={title} features={features} />
      </section>
    </div>
  );
};

export default ContentPair;
