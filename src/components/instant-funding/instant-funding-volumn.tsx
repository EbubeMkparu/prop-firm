/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Volumn from "@/components/Volumn";

const InstantFundingVolumns = ({
  instantFundingVolumns,
}: {
  instantFundingVolumns: any;
}) => {
  return (
    <div>
      <div className="bg-[#FFD700] w-full py-3 md:py-4 lg:py-5 rounded-2xl my-2 ">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black text-center">
          Instant Funded X
        </h2>
      </div>

      <div className=" border-2 border-yellow-400 w-full rounded-[15px] px-3 py-6 md:p-4 lg:p-6">
        <Volumn plans={instantFundingVolumns} />
      </div>
    </div>
  );
};

export default InstantFundingVolumns;
