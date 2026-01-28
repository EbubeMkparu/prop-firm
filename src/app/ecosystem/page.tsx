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
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,215,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.03) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#FFD700]/10 rounded-full blur-[200px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[200px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[250px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Floating Particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#FFD700] rounded-full animate-bounce opacity-60" style={{ animationDelay: "0s", animationDuration: "3s" }} />
        <div className="absolute top-40 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-bounce opacity-50" style={{ animationDelay: "0.5s", animationDuration: "2.5s" }} />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: "1s", animationDuration: "3.5s" }} />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce opacity-50" style={{ animationDelay: "1.5s", animationDuration: "2.8s" }} />
        <div className="absolute bottom-1/4 right-10 w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce opacity-40" style={{ animationDelay: "2s", animationDuration: "3.2s" }} />

        {/* Mouse Follow Gradient */}
        <div
          className="absolute w-[400px] h-[400px] rounded-full bg-[#FFD700]/8 blur-[100px] transition-all duration-1000 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 200,
            top: mousePosition.y - 200,
          }}
        />

        {/* Animated Lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#FFD700]/20 to-transparent opacity-30" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent opacity-20" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <Image src={logo} alt="Pipzen" className="w-[120px]" />
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                  <HiOutlineArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back to Home</span>
                </button>
              </Link>
              <Link href="/login">
                <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-orange-500 text-black text-sm font-bold hover:shadow-lg hover:shadow-[#FFD700]/30 transition-all">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero Section - CryptoMadness as THE HEAD */}
          <div className="text-center mb-24">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#FFD700]/10 to-orange-500/10 border border-[#FFD700]/30 mb-10 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
              <span className="text-sm font-semibold text-[#FFD700] tracking-wide">THE PARENT ECOSYSTEM</span>
              <div className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
            </div>

            {/* Main Logo/Title */}
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-yellow-300 to-orange-400 blur-[100px] opacity-30" />
              <h1 className="relative text-7xl md:text-9xl lg:text-[12rem] font-black leading-[0.85] tracking-tighter">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-yellow-300 to-orange-400 drop-shadow-[0_0_50px_rgba(255,215,0,0.5)]">
                  CRYPTO
                </span>
                <br />
                <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">MADNESS</span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              The <span className="text-white font-semibold">parent ecosystem</span> powering the future of digital finance.
              One vision. Multiple platforms. Infinite possibilities.
            </p>

            {/* CryptoMadness Link - Premium Style */}
            <a
              href="https://www.cryptomadness.info"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FFD700]/20 to-orange-500/20 border border-[#FFD700]/40 hover:border-[#FFD700] hover:shadow-[0_0_40px_rgba(255,215,0,0.3)] transition-all duration-500"
            >
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#FFD700] to-orange-500">
                <HiOutlineGlobeAlt className="w-6 h-6 text-black" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Visit Headquarters</p>
                <span className="text-lg font-bold text-white group-hover:text-[#FFD700] transition-colors">www.cryptomadness.info</span>
              </div>
              <HiOutlineArrowUpRight className="w-6 h-6 text-[#FFD700] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Ecosystem Label */}
          <div className="text-center mb-12">
            <p className="text-sm font-bold tracking-[0.3em] text-gray-500 mb-2">
              THE COLONY
            </p>
            <div className="w-20 h-1 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
          </div>

          {/* Colony Cards - Bento Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {colonies.map((colony, index) => (
              <div
                key={colony.id}
                className={`group relative ${index === 0 ? "md:col-span-2" : ""}`}
                onMouseEnter={() => setActiveColony(colony.id)}
                onMouseLeave={() => setActiveColony(null)}
              >
                {/* Animated Border Glow */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${colony.color} rounded-3xl opacity-0 group-hover:opacity-75 blur transition-all duration-500 group-hover:duration-200`} />

                <div className="relative">
                  <div
                    className={`relative p-8 md:p-10 rounded-3xl border transition-all duration-500 overflow-hidden ${
                      activeColony === colony.id
                        ? `bg-[#0a0a0a] border-white/20 shadow-2xl ${colony.glowColor}`
                        : "bg-[#0a0a0a]/90 border-white/10 hover:border-white/20"
                    }`}
                  >
                    {/* Background Glow */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 bg-gradient-to-br ${colony.color}`}
                      style={{ opacity: activeColony === colony.id ? 0.1 : 0 }}
                    />

                    {/* Content */}
                    <div className="relative">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-4 rounded-2xl bg-gradient-to-br ${colony.color} shadow-lg`}
                          >
                            <colony.icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-3xl font-black text-white tracking-tight">
                              {colony.name}
                            </h3>
                            <p
                              className={`text-sm font-medium bg-gradient-to-r ${colony.color} bg-clip-text text-transparent`}
                            >
                              {colony.tagline}
                            </p>
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                          <HiOutlineArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                        {colony.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-3 mb-8">
                        {colony.features.map((feature, i) => (
                          <div
                            key={i}
                            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 group-hover:bg-white/10 group-hover:border-white/20 transition-all"
                          >
                            <span className="flex items-center gap-2">
                              <HiOutlineSparkles className="w-3 h-3 text-[#FFD700]" />
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <a
                          href={colony.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r ${colony.color} text-white font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-[${colony.glowColor}] hover:scale-[1.02] transition-all duration-300 group/btn`}
                        >
                          <span>Launch Platform</span>
                          <HiOutlineArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </a>
                        <a
                          href={colony.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-4 rounded-2xl border-2 border-white/20 text-white font-semibold hover:bg-white/10 hover:border-white/40 transition-all flex items-center justify-center gap-2"
                        >
                          <span>Learn More</span>
                          <HiOutlineChevronRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Decorative Corner */}
                    <div
                      className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] bg-gradient-to-br ${colony.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-24 text-center">
            <div className="relative inline-flex flex-col items-center gap-8 p-12 rounded-3xl bg-gradient-to-br from-[#FFD700]/5 to-orange-500/5 border border-[#FFD700]/20">
              {/* Decorative Elements */}
              <div className="absolute -top-px left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
              <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />

              <div className="flex items-center gap-2 text-gray-400">
                <HiOutlineSparkles className="w-5 h-5 text-[#FFD700]" />
                <span className="text-lg">Powered by the CryptoMadness Ecosystem</span>
                <HiOutlineSparkles className="w-5 h-5 text-[#FFD700]" />
              </div>

              <a
                href="https://www.cryptomadness.info"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-4 px-10 py-5 rounded-2xl bg-gradient-to-r from-[#FFD700] via-yellow-400 to-orange-500 text-black font-bold text-lg shadow-lg shadow-[#FFD700]/30 hover:shadow-xl hover:shadow-[#FFD700]/50 hover:scale-[1.02] transition-all duration-300"
              >
                <HiOutlineGlobeAlt className="w-6 h-6" />
                <span>Explore CryptoMadness</span>
                <HiOutlineArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <p className="text-sm text-gray-500 max-w-md">
                Join the revolution. Build your future with the most comprehensive digital finance ecosystem.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CryptoMadness. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
