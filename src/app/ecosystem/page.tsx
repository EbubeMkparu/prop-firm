"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HiOutlineArrowUpRight,
  HiOutlineArrowLeft,
  HiOutlineBolt,
  HiOutlineArrowTrendingUp,
  HiOutlineBuildingOffice2,
  HiOutlineCpuChip,
  HiOutlineGlobeAlt,
  HiOutlineChevronRight,
  HiOutlineSparkles,
} from "react-icons/hi2";
import logo from "@/../public/logo.png";

interface Colony {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  color: string;
  glowColor: string;
  url: string;
  features: string[];
}

export default function EcosystemPage() {
  const [activeColony, setActiveColony] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const colonies: Colony[] = [
    {
      id: "pipzen",
      name: "PIPZEN",
      tagline: "Prop Trading Firm",
      description:
        "Get funded up to $400K and trade with our capital. Keep up to 90% of your profits with instant payouts.",
      icon: HiOutlineArrowTrendingUp,
      color: "from-[#FFD700] to-orange-500",
      glowColor: "shadow-[#FFD700]/50",
      url: "https://pipzen.io",
      features: ["$400K Funding", "90% Profit Split", "Instant Payouts", "No Time Limits"],
    },
    {
      id: "crymadx",
      name: "CRYMADX",
      tagline: "Crypto Exchange",
      description:
        "Next-generation crypto exchange with lightning-fast execution, institutional-grade security, and advanced trading tools.",
      icon: HiOutlineBolt,
      color: "from-cyan-400 to-blue-500",
      glowColor: "shadow-cyan-500/50",
      url: "https://crymadx.io",
      features: ["500+ Pairs", "0.05% Fees", "Instant Swaps", "Copy Trading"],
    },
    {
      id: "crymadcash",
      name: "CRYMAD CASH",
      tagline: "Digital Banking",
      description:
        "The future of digital banking. Virtual cards, instant global transfers, and seamless crypto-to-fiat conversion.",
      icon: HiOutlineBuildingOffice2,
      color: "from-emerald-400 to-green-500",
      glowColor: "shadow-emerald-500/50",
      url: "https://production-crmdx.web.app/sign-up",
      features: ["Virtual Cards", "Global Transfers", "Multi-Currency", "Crypto Debit"],
    },
    {
      id: "crymadhash",
      name: "CRYMAD HASH",
      tagline: "Cloud Mining",
      description:
        "Enterprise-grade cloud mining infrastructure. Earn passive income without expensive hardware or electricity costs.",
      icon: HiOutlineCpuChip,
      color: "from-purple-400 to-pink-500",
      glowColor: "shadow-purple-500/50",
      url: "https://crymadhsh.tech",
      features: ["Cloud Mining", "Daily Payouts", "No Hardware", "Auto-Compound"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#030303] relative overflow-hidden">
      {/* Futuristic Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Cyber Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,215,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Scanning Line Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent animate-pulse" style={{ top: "30%", animationDuration: "3s" }} />
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-pulse" style={{ top: "60%", animationDuration: "4s", animationDelay: "1s" }} />
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FFD700]/8 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: "2s" }} />

        {/* Mouse Follow Gradient */}
        <div
          className="absolute w-[300px] h-[300px] rounded-full bg-[#FFD700]/10 blur-[80px] transition-all duration-700 ease-out"
          style={{
            left: mousePosition.x - 150,
            top: mousePosition.y - 150,
          }}
        />

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#FFD700]/20" />
        <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-[#FFD700]/20" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-[#FFD700]/20" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#FFD700]/20" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-2xl border-b border-[#FFD700]/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-3">
              <Image src={logo} alt="Pipzen" className="w-[100px] md:w-[120px]" />
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:text-[#FFD700] hover:bg-[#FFD700]/10 hover:border-[#FFD700]/30 transition-all duration-300"
              >
                <HiOutlineArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <Link
                href="/signin"
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#FFD700] to-orange-500 text-black text-sm font-bold hover:shadow-lg hover:shadow-[#FFD700]/30 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-28 md:pt-36 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section - CryptoMadness */}
          <div className="text-center mb-16 md:mb-24">
            {/* Futuristic Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#FFD700]/5 border border-[#FFD700]/30 mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse shadow-[0_0_10px_#FFD700]" />
              <span className="text-xs md:text-sm font-semibold text-[#FFD700] tracking-widest uppercase">The Parent Ecosystem</span>
              <div className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse shadow-[0_0_10px_#FFD700]" />
            </div>

            {/* Main Title with Glow */}
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-yellow-300 to-orange-400 blur-[80px] opacity-20" />
              <h1 className="relative text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-yellow-300 to-orange-400 drop-shadow-[0_0_30px_rgba(255,215,0,0.4)]">
                  CRYPTO
                </span>
                <span className="text-white">MADNESS</span>
              </h1>
            </div>

            <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              Powering the future of digital finance. One vision. Multiple platforms. Infinite possibilities.
            </p>

            {/* CryptoMadness Link */}
            <a
              href="https://www.cryptomadness.info"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FFD700]/10 to-orange-500/10 border border-[#FFD700]/30 hover:border-[#FFD700]/60 hover:shadow-[0_0_30px_rgba(255,215,0,0.2)] transition-all duration-500"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#FFD700] to-orange-500 shadow-lg shadow-[#FFD700]/30">
                <HiOutlineGlobeAlt className="w-5 h-5 text-black" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Visit Headquarters</p>
                <span className="text-sm md:text-base font-bold text-white group-hover:text-[#FFD700] transition-colors">www.cryptomadness.info</span>
              </div>
              <HiOutlineArrowUpRight className="w-5 h-5 text-[#FFD700] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Section Divider */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-[#FFD700]/50" />
            <p className="text-xs font-bold tracking-[0.3em] text-[#FFD700]/60 uppercase">The Colony</p>
            <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-[#FFD700]/50" />
          </div>

          {/* Colony Cards - Bento Grid */}
          <div className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
            {colonies.map((colony, index) => (
              <div
                key={colony.id}
                className={`group relative ${index === 0 ? "md:col-span-2" : ""}`}
                onMouseEnter={() => setActiveColony(colony.id)}
                onMouseLeave={() => setActiveColony(null)}
              >
                {/* Animated Border Glow */}
                <div className={`absolute -inset-[1px] bg-gradient-to-r ${colony.color} rounded-2xl opacity-0 group-hover:opacity-60 blur-sm transition-all duration-500`} />

                <div className="relative">
                  <div
                    className={`relative p-6 md:p-8 rounded-2xl border backdrop-blur-sm transition-all duration-500 overflow-hidden ${
                      activeColony === colony.id
                        ? `bg-black/80 border-white/20 shadow-2xl ${colony.glowColor}`
                        : "bg-black/40 border-white/10 hover:border-white/20"
                    }`}
                  >
                    {/* Background Glow */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 bg-gradient-to-br ${colony.color}`}
                      style={{ opacity: activeColony === colony.id ? 0.08 : 0 }}
                    />

                    {/* Cyber Corner */}
                    <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-white/10 rounded-tr-2xl" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-white/10 rounded-bl-2xl" />

                    {/* Content */}
                    <div className="relative">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center gap-4">
                          <div className={`p-3.5 rounded-xl bg-gradient-to-br ${colony.color} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                            <colony.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                              {colony.name}
                            </h3>
                            <p className={`text-sm font-medium bg-gradient-to-r ${colony.color} bg-clip-text text-transparent`}>
                              {colony.tagline}
                            </p>
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 group-hover:bg-[#FFD700]/10 group-hover:border-[#FFD700]/30 transition-all duration-300">
                          <HiOutlineArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#FFD700] transition-colors" />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 text-sm md:text-base mb-5 leading-relaxed">
                        {colony.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {colony.features.map((feature, i) => (
                          <div
                            key={i}
                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 group-hover:bg-white/10 group-hover:border-white/20 transition-all"
                          >
                            <span className="flex items-center gap-1.5">
                              <HiOutlineSparkles className="w-3 h-3 text-[#FFD700]" />
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a
                          href={colony.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r ${colony.color} text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300`}
                        >
                          <span>Launch Platform</span>
                          <HiOutlineArrowUpRight className="w-4 h-4" />
                        </a>
                        <a
                          href={colony.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-3.5 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <span>Learn More</span>
                          <HiOutlineChevronRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Decorative Corner Glow */}
                    <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[60px] bg-gradient-to-br ${colony.color} opacity-0 group-hover:opacity-25 transition-opacity duration-500`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 md:mt-24 text-center">
            <div className="relative inline-flex flex-col items-center gap-6 px-8 md:px-12 py-8 rounded-2xl bg-black/40 border border-[#FFD700]/20 backdrop-blur-sm">
              {/* Decorative Lines */}
              <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent" />
              <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent" />

              <div className="flex items-center gap-2 text-gray-400">
                <HiOutlineSparkles className="w-4 h-4 text-[#FFD700]" />
                <span className="text-sm">Powered by CryptoMadness Ecosystem</span>
                <HiOutlineSparkles className="w-4 h-4 text-[#FFD700]" />
              </div>

              <a
                href="https://www.cryptomadness.info"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#FFD700] via-yellow-400 to-orange-500 text-black font-bold text-sm md:text-base shadow-lg shadow-[#FFD700]/30 hover:shadow-xl hover:shadow-[#FFD700]/50 hover:scale-[1.02] transition-all duration-300"
              >
                <HiOutlineGlobeAlt className="w-5 h-5" />
                <span>Explore CryptoMadness</span>
                <HiOutlineArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <p className="text-xs text-gray-500 max-w-sm">
                Join the revolution. Build your future with the most comprehensive digital finance ecosystem.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-6">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} CryptoMadness. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
