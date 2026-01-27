/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

// import { TabItem, Tabs } from "flowbite-react";
// import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
// import { MdDashboard } from "react-icons/md";

import SectionHeader from "../section-header";
import EvaluationsContent from "./evaluations-content";
// import EvaluationsTab from "./evaluations-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FadeIn } from "../fade-in";

// import { TabContextProvider } from "@/contenxt/tabContext";

interface EvaluationsProps {
  evaluations: {
    title: string;
    description: string;
    evaluationsPlans: any;
  };
}
const Evaluations = ({ evaluations }: EvaluationsProps) => {
  const { title, description, evaluationsPlans } = evaluations;
  return (
    <FadeIn>
      <section className="container mt-[380px] md:mt-[420px] lg:mt-24">
        <SectionHeader title={title} shortDescription={description} />

        <Tabs defaultValue={"forex"} className="w-full">
          <TabsList className="flex bg-transparent w-full gap-3">
            {evaluationsPlans.map((plan: any, i: any) => (
              <TabsTrigger key={i} value={plan.model.toLowerCase()}>
                {plan.model}
              </TabsTrigger>
            ))}
          </TabsList>
          {evaluationsPlans.map((plan: any, i: any) => (
            <TabsContent key={i} value={plan.model.toLowerCase()}>
              <EvaluationsContent data={plan} />
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </FadeIn>
  );
};

export default Evaluations;
