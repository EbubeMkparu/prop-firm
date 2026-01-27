/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import SectionHeader from "@/components/section-header";
import InstantFundingVolumns from "./instant-funding-volumn";

interface InstantFundingProps {
  funding: {
    title: string;
    description: string;
    instantFundingVolumns: any;
  };
}
const InstantFunding = ({ funding }: InstantFundingProps) => {
  const { description, title, instantFundingVolumns } = funding;
  return (
    <section className="container pt-[120px] md:pt-[420px] lg:pt-24">
      <SectionHeader title={title} shortDescription={description} />
      <InstantFundingVolumns instantFundingVolumns={instantFundingVolumns} />
    </section>
  );
};

export default InstantFunding;
