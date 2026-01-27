/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import VolumnMetrics from "./volumn-metrics";
import VolumnPerks from "./volumn-perks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import VolumeInfo from "./volume-info";
import VolumnTriggers from "./volumn-triggers";
import { useEvaluationSelect } from "@/lib/store.zustand";
import { useEffect } from "react";
import Link from "next/link";
import PrimaryButton from "./buttons/primary-button";

const Volumn = ({ plans }: { plans: any }) => {
  const accountsSize = plans.map((plan: any) => plan.account_size);

  const findPlanIdBySize = (size: string) => {
    const plan = plans.find((plan: any) => plan.account_size == size);
    return plan.planid;
  };

  const findPlan = (size: string) => {
    const plan = plans.find((plan: any) => plan.account_size == size);
    return plan;
  };

  const { setPlanid, planid } = useEvaluationSelect((state) => state);

  useEffect(() => {
    if (plans && accountsSize) {
      setPlanid(findPlanIdBySize(accountsSize[0]));
    }
  }, []);

  return (
    <>
      <Tabs defaultValue={accountsSize[0]} className="w-full">
        <TabsList className=" w-full bg-transparent mt-5 md:mt-8">
          <VolumnTriggers
            Triggers={accountsSize.map((size: any, i: number) => (
              <TabsTrigger
                onClick={() => setPlanid(findPlanIdBySize(size))}
                className="w-full !py-2 md:!py-3 px-4 md:px-10 lg:px-8"
                value={size.toLowerCase()}
                key={i}
              >
                {size}
              </TabsTrigger>
            ))}
          />
        </TabsList>

        {accountsSize.map((size: any, i: number) => {
          const plan = findPlan(size.toLowerCase());
          return (
            <div key={i}>
              <TabsContent value={size.toLowerCase()} key={i}>
                <div className="flex flex-col gap-0 md:gap-5 md:flex-row mt-0 md:mt-3">
                  <div className="md:border-1 w-full md:w-[75%] py-8 lg:py-10 px-0 md:px-2 lg:px-4 gap-12 border-yellow-400 rounded-[15px] flex ">
                    <VolumeInfo
                      account_size={plan.account_size}
                      onetime_fee={plan.onetime_fee}
                    />
                    <VolumnPerks
                      account_size={plan.account_size}
                      perks={plan.perks}
                    />
                  </div>
                  <VolumnMetrics metrics={plan.metrics} />
                </div>
              </TabsContent>
            </div>
          );
        })}
      </Tabs>
      {planid && (
        <div className="flex justify-center items-center  mt-5 ">
          <Link href={`/challenges?planId=${planid}`}>
            <PrimaryButton>Get Started</PrimaryButton>
          </Link>
        </div>
      )}
    </>
  );
};

export default Volumn;
