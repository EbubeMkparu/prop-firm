/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import SectionHeader from "@/components/section-header";
import CertifiedCards from "./certified-cards";

interface CertifiedProveProps {
  certificates: any[];
  title: string;
}
const CertifiedProve = ({ certificates, title }: CertifiedProveProps) => {
  return (
    <section className="pt-[100px] md:pt-[420px] lg:pt-24 container  ">
      <SectionHeader title={title} />
      <CertifiedCards certificates={certificates} />
    </section>
  );
};

export default CertifiedProve;
