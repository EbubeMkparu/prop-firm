/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import SectionHeader from "../section-header";
import PropfirmFeatures from "./propfirm-features";

interface Service {
  name: string;
  values: {
    value1: string | boolean | number;
    value2: string | boolean | number;
    value3: string | boolean | number;
  };
}

export interface PropFirmCompany {
  companies: {
    name: string;
    image: any;
  }[];
  services: Service[];
}

interface PropfirmComparisonProps {
  title: string;
  description: string;
  company: PropFirmCompany;
}

const PropfirmComparison = ({
  title,
  description,
  company,
}: PropfirmComparisonProps) => {
  return (
    <section className="container pt-[120px] md:pt-[420px] lg:pt-24">
      <SectionHeader title={title} shortDescription={description} />
      <div className="max-w-full p-3 md:p-5 mt-3 lg:mt-5 rounded-lg ">
        <PropfirmFeatures company={company} />
      </div>
    </section>
  );
};

export default PropfirmComparison;
