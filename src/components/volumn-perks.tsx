import React from "react";
import { FaCheck } from "react-icons/fa";

const VolumnPerks = ({
  perks,
  account_size,
}: {
  perks: string[];
  account_size: string;
}) => {
  return (
    <div className="hidden md:block w-[65%]">
      <div>
        {" "}
        <h4 className="text-2xl md:text-3xl text-white font-bold mb-3">
          {account_size} Evaluation account includes:
        </h4>
      </div>
      <ul className="flex flex-col gap-2">
        {perks.map((p, i) => (
          <li
            key={i}
            className="flex border-b border-b-gray-400 py-3  items-center cursor-default gap-2 text-base text-white font-semibold hover:text-yellow-400 hover:transition-colors"
          >
            <FaCheck className="w-5 h-5" />
            <p>{p}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VolumnPerks;
