"use client";
import React from "react";
import FeatureCards from "./feature-cards";
import Watch from "../icon/watch";
import Chart from "../icon/chart";
import Rocket from "../icon/rocket";
import Atom from "../icon/atom";
import Image from "next/image";

import users_profile from "@/../public/user-profiles.png";

const data = [
  {
    icon: Watch,
    text: "No Mininum or Maximum Trading Days",
  },
  {
    icon: Chart,
    text: "StaticDrawdown for All Evaluations",
  },
  {
    icon: Rocket,
    text: "Instant First Payout",
  },
  {
    icon: Atom,
    text: "Up to 90% Profit Split",
  },
];

const FeatureHighlights = () => {
  return (
    <section className="container pt-[120px] md:pt-[420px] lg:pt-24">
      <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent">
        Why Traders Love Us
      </h2>
      <div className="flex items-center justify-center pt-5 md:pt-6 lg:pt-10">
        <Image
          src={users_profile}
          alt="users"
          className="w-[260px] md:w-[280px] mx-auto h-auto"
        />
      </div>
      <FeatureCards data={data} />
    </section>
  );
};

export default FeatureHighlights;
