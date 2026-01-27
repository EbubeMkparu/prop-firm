"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Volumn from "../Volumn";

interface EvaluationsContentProps {
  data: any;
}
const EvaluationsContent = ({ data }: EvaluationsContentProps) => {
  const stepNames = data.steps.map((step: any) => step.stepName);

  const findPlans = (stepName: string) => {
    const plans = data.steps.find(
      (step: any) => step.stepName.toLowerCase() == stepName
    )?.plans;
    console.log({ plans });
    return plans;
  };

  return (
    <div>
      <div className="w-full mt-5 px-3 py-6 md:p-4 lg:p-6 text-yellow-400 font-roboto text-[32px] font-semibold leading-[32px] flex justify-center items-center gap-5  border-2 border-yellow-400 rounded-[15px] transition-all">
        <Tabs defaultValue={stepNames[0].toLowerCase()} className="w-full">
          <TabsList className="flex bg-transparent w-full gap-3">
            {stepNames.map((step: any, i: number) => (
              <TabsTrigger value={step.toLowerCase()} key={i}>
                {step}
              </TabsTrigger>
            ))}
          </TabsList>

          {stepNames.map((step: any, i: number) => (
            <TabsContent value={step.toLowerCase()} key={i}>
              <Volumn plans={findPlans(step.toLowerCase())} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default EvaluationsContent;
