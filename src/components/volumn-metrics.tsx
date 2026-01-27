import React from "react";
import { FaCircleInfo } from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Metric {
  label: string;
  value: "10%";
  additional: "";
}
interface EvaluationsMetricsProps {
  metrics: Metric[];
}
const VolumnMetrics = ({ metrics }: EvaluationsMetricsProps) => {
  return (
    <div className="border-yellow-400 w-full md:w-[25%]  border-1 py-6 px-4 rounded-2xl">
      <ul className="flex flex-col gap-4 pt-5">
        {metrics.map((m, i) => (
          <li
            key={i}
            className="flex items-center justify-between text-base  font-semibold text-white"
          >
            <div className="flex items-center justify-center gap-1">
              <span>{m.label}</span>
              {m.additional || (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <FaCircleInfo className="w-3 h-3 cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{m.additional}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>

            <span className=" text-white">{m.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VolumnMetrics;
