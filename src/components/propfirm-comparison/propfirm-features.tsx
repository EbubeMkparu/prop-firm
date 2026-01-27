import Image from "next/image";
import React from "react";

import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { PropFirmCompany } from "./propfirm-comparison";

const PropfirmFeatures = ({ company }: { company: PropFirmCompany }) => {
  return (
    <div className=" overflow-x-auto">
      <div className="grid grid-cols-1 gap-3 min-w-[650px] border border-[#FFD700] rounded-2xl px-3">
        <div className=" h-[70px] lg:h-[85px] rounded-lg grid grid-cols-4 items-center">
          <div></div>
          {company.companies.map((company, i) => (
            <div key={i} title={company.name}>
              <Image
                src={company.image}
                className="w-[90px] lg:w-[100px] mx-auto"
                alt="Pipzen"
              />
            </div>
          ))}
        </div>

        {company.services.map((service, i) => (
          <div
            className={`bg-[#070606] h-[70px] lg:h-[85px] rounded-lg grid grid-cols-4 items-center ${i%2 === 0 ? "border border-[#FFD700]" : ""}`}
            key={i}
          >
            <div className="text-center">
              <span className="text-sm font-normal text-[#CCCCCC]">
                {service.name}
              </span>
            </div>
            <div className="w-max lg:w-full h-[40px] lg:h-[60px] flex items-center justify-center rounded-2xl border border-[#FFD700] text-center text-[#ffd700]">
              <span className="font-semibold text-sm ">
                {typeof service.values.value1 == "string" ? (
                  service.values.value1
                ) : service.values.value1 == true ? (
                  <FaRegCheckCircle className="w-5 h-5 lg:w-7 lg:h-7 text-[#ffd700] mx-auto" />
                ) : (
                  <IoMdCloseCircleOutline className="w-5 h-5 lg:w-7 lg:h-7 text-[#ffd700] mx-auto" />
                )}
              </span>
            </div>
            <div className="text-centerw-max lg:w-full h-[40px] lg:h-[60px] flex items-center justify-center">
              <span className="text-sm font-semibold text-[#CCCCCC]">
                {typeof service.values.value2 == "string" ? (
                  service.values.value2
                ) : service.values.value2 == true ? (
                  <FaRegCheckCircle className="w-5 h-5 lg:w-7 lg:h-7 mx-auto" />
                ) : (
                  <IoMdCloseCircleOutline className="w-5 h-5 lg:w-7 lg:h-7 mx-auto " />
                )}
              </span>
            </div>
            <div className="text-center w-max lg:w-full h-[40px] lg:h-[60px] flex items-center justify-center">
              <span className="text-sm font-semibold text-[#CCCCCC]">
                {typeof service.values.value3 == "string" ? (
                  service.values.value3
                ) : service.values.value3 == true ? (
                  <FaRegCheckCircle className="w-5 h-5 lg:w-7 lg:h-7 mx-auto" />
                ) : (
                  <IoMdCloseCircleOutline className="w-5 h-5 lg:w-7 lg:h-7 mx-auto" />
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropfirmFeatures;