"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

import PrimaryButton from "../../buttons/primary-button";
import SecondaryButton from "../../buttons/secondary-button";
import { RiDiscordFill } from "react-icons/ri";
import { FaStar, FaShieldAlt } from "react-icons/fa";
import { HiTrendingUp } from "react-icons/hi";
import { BsLightningChargeFill } from "react-icons/bs";

interface HeroProps {
  hero: {
    title1: string;
    title2: string;
    title3: string;
    description: string;
    buttons: {
      label: string;
      link: string;
    }[];
    youtubeVideoLink: string;
  };
}

const Hero = ({ hero }: HeroProps) => {
  const { title1, title2, title3, description, buttons } = hero;

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // Animated counters
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const timer1 = setInterval(() => {
      setCount1((prev) => (prev < 50 ? prev + 1 : 50));
    }, interval);

    const timer2 = setInterval(() => {
      setCount2((prev) => (prev < 15 ? prev + 0.25 : 15));
    }, interval);

    const timer3 = setInterval(() => {
      setCount3((prev) => (prev < 90 ? prev + 1.5 : 90));
    }, interval);

    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
      clearInterval(timer3);
    };
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 50;
        const y = (e.clientY - rect.top - rect.height / 2) / 50;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a]"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="hidden sm:block absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] sm:bg-[size:80px_80px]" />

        {/* Gradient Orbs with Parallax */}
        <div
          className="absolute top-[10%] left-[10%] w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-[#FFD700]/20 rounded-full blur-[100px] sm:blur-[150px] md:blur-[200px] animate-pulse-slow"
          style={{
            transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
          }}
        />
        <div
          className="absolute bottom-[20%] right-[10%] w-[250px] sm:w-[300px] md:w-[400px] h-[250px] sm:h-[300px] md:h-[400px] bg-orange-500/15 rounded-full blur-[80px] sm:blur-[120px] md:blur-[150px] animate-pulse-slow"
          style={{
            animationDelay: "1s",
            transform: `translate(${-mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px)`,
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-yellow-500/5 rounded-full blur-[150px] sm:blur-[200px] md:blur-[250px]" />

        {/* Additional accents */}
        <div
          className="absolute top-[60%] left-[5%] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-purple-500/10 rounded-full blur-[80px] sm:blur-[120px] animate-float"
          style={{
            animationDuration: "15s",
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        />
        <div
          className="hidden md:block absolute top-[30%] right-[20%] w-[250px] h-[250px] bg-cyan-500/8 rounded-full blur-[100px] animate-float"
          style={{ animationDuration: "20s", animationDelay: "5s" }}
        />
      </div>

      {/* Mouse spotlight effect */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x * 50 + 50}% ${mousePosition.y * 50 + 50}%, rgba(255,215,0,0.04), transparent 40%)`,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 container pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 min-h-[calc(100vh-200px)]">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 animate-fade-in-up">
              <BsLightningChargeFill className="w-3 h-3 sm:w-4 sm:h-4 text-[#FFD700]" />
              <span className="text-xs sm:text-sm font-medium text-[#FFD700]">
                Trusted by 15,000+ Traders
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3 sm:space-y-4 animate-fade-in-up delay-100">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1]">
                <span className="inline-block bg-gradient-to-r from-[#FFD700] via-yellow-400 to-orange-500 bg-clip-text text-transparent animate-gradient">
                  {title1}
                </span>{" "}
                {title2}
                <span className="block bg-gradient-to-r from-[#FFD700] via-yellow-400 to-orange-500 bg-clip-text text-transparent animate-gradient">
                  {title3}
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-lg mx-auto lg:mx-0">
                {description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-in-up delay-200">
              {buttons[0] && (
                <Link href={buttons[0].link}>
                  <PrimaryButton className="w-full sm:w-auto animate-glow">
                    {buttons[0].label}
                  </PrimaryButton>
                </Link>
              )}
              {buttons[1] && (
                <a href={buttons[1].link} target="_blank" rel="noopener noreferrer">
                  <SecondaryButton className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm">
                    <RiDiscordFill className="text-foreground w-5 h-5 lg:w-6 lg:h-6" />
                    {buttons[1].label}
                  </SecondaryButton>
                </a>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-2 sm:pt-4 justify-center lg:justify-start animate-fade-in-up delay-300">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#FFD700]/30 to-orange-500/30 border-2 border-[#0a0a0a] flex items-center justify-center"
                    >
                      <span className="text-xs text-white font-bold">{i}</span>
                    </div>
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-gray-400">
                  +15K traders
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FaStar
                    key={i}
                    className="w-3 h-3 sm:w-4 sm:h-4 fill-[#FFD700] text-[#FFD700]"
                  />
                ))}
                <span className="text-xs sm:text-sm text-gray-400 ml-1 sm:ml-2">
                  4.9/5 rating
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="lg:w-1/2 relative mt-8 lg:mt-0 animate-fade-in-up delay-200">
            {/* Main Stats Card */}
            <div
              className="relative p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl transition-transform duration-300"
              style={{
                transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
              }}
            >
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700]/20 via-orange-500/20 to-[#FFD700]/20 rounded-2xl sm:rounded-3xl blur-xl opacity-50" />

              <div className="relative space-y-4 sm:space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#FFD700] to-orange-500">
                      <HiTrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-400">
                        Live Statistics
                      </p>
                      <p className="text-sm sm:text-base text-white font-semibold">
                        Real-time Data
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-green-500">Live</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#FFD700]/20 transition-colors">
                    <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
                      ${Math.round(count1)}M+
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1">
                      Total Payouts
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#FFD700]/20 transition-colors">
                    <p className="text-2xl sm:text-3xl md:text-4xl font-black text-[#FFD700]">
                      {count2.toFixed(0)}K+
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1">
                      Funded Traders
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#FFD700]/20 transition-colors">
                    <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
                      {Math.round(count3)}%
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1">
                      Profit Split
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FFD700]/20 to-orange-500/10 border border-[#FFD700]/30">
                    <p className="text-2xl sm:text-3xl md:text-4xl font-black text-[#FFD700]">
                      24h
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1">
                      Fast Payouts
                    </p>
                  </div>
                </div>

                {/* Bottom Banner */}
                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <FaShieldAlt className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-white">
                          Zero Risk Trading
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-400">
                          Trade with our capital, not yours
                        </p>
                      </div>
                    </div>
                    <div className="text-green-500 text-[10px] sm:text-xs font-bold whitespace-nowrap">
                      GUARANTEED
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Mini Cards */}
            <div
              className="hidden md:block absolute -left-4 lg:-left-8 top-1/4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/10 shadow-xl animate-float"
              style={{
                animationDuration: "6s",
                transform: `translate(${mousePosition.x * -0.8}px, ${mousePosition.y * -0.8}px)`,
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <span className="text-green-500 text-xs sm:text-sm">✓</span>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    Challenge Passed
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-white">
                    $100K Funded
                  </p>
                </div>
              </div>
            </div>

            <div
              className="hidden md:block absolute -right-2 lg:-right-4 bottom-1/4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/10 shadow-xl animate-float"
              style={{
                animationDuration: "8s",
                animationDelay: "2s",
                transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px)`,
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                  <span className="text-[#FFD700] text-xs sm:text-sm">$</span>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    Withdrawal
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-[#FFD700]">
                    +$4,250
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
};

export default Hero;
