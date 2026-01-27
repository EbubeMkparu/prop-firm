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
        "Get funded up to $200K and trade with our capital. Keep up to 90% of your profits.",
      icon: HiOutlineArrowTrendingUp,
      color: "from-[#FFD700] to-orange-500",
      glowColor: "shadow-[#FFD700]/50",
      url: "https://www.pipzen.io",
      features: ["$200K Funding", "90% Profit Split", "24hr Payouts"],
    },
    {
      id: "crymadx",
      name: "CRYMADX",
      tagline: "Crypto Exchange",
      description:
        "Trade crypto with lightning-fast execution, low fees, and advanced charting tools.",
      icon: HiOutlineBolt,
      color: "from-cyan-400 to-blue-500",
      glowColor: "shadow-cyan-500/50",
      url: "https://www.crymadx.io",
      features: ["100+ Pairs", "0.1% Fees", "Instant Swaps"],
    },
    {
      id: "crymadcash",
      name: "CRYMADCASH",
      tagline: "Virtual Banking",
      description:
        "Your digital wallet for the future. Send, receive, and manage your crypto assets.",
      icon: HiOutlineBuildingOffice2,
      color: "from-emerald-400 to-green-500",
      glowColor: "shadow-emerald-500/50",
      url: "https://production-crmdx.web.app/sign-up",
      features: ["Virtual Cards", "Instant Transfers", "Multi-Currency"],
    },
    {
      id: "crymadhash",
      name: "CRYMADHASH",
      tagline: "Cloud Mining",
      description:
        "Mine cryptocurrency without the hardware. Earn passive income with our mining pools.",
      icon: HiOutlineCpuChip,
      color: "from-purple-400 to-pink-500",
      glowColor: "shadow-purple-500/50",
      url: "https://www.crymadhash.tech",
      features: ["Cloud Mining", "Daily Payouts", "No Hardware"],
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

        {/* Mouse Follow Gradient */}
        <div
          className="absolute w-[400px] h-[400px] rounded-full bg-[#FFD700]/5 blur-[100px] transition-all duration-1000 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 200,
            top: mousePosition.y - 200,
          }}
        />
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
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <HiOutlineSparkles className="w-4 h-4 text-[#FFD700]" />
              <span className="text-sm text-gray-400">Explore The Future</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-yellow-300 to-orange-400">
                CRYPTO
              </span>
              <br />
              <span className="text-white">MADNESS</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-8">
              One ecosystem. Infinite possibilities. Building the future of
              digital finance.
            </p>

            <a
              href="https://www.cryptomadness.info"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#FFD700] hover:gap-4 transition-all"
            >
              <HiOutlineGlobeAlt className="w-5 h-5" />
              <span className="font-semibold">www.cryptomadness.info</span>
              <HiOutlineArrowUpRight className="w-5 h-5" />
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
                <a
                  href={colony.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div
                    className={`relative p-8 md:p-10 rounded-3xl border transition-all duration-500 overflow-hidden ${
                      activeColony === colony.id
                        ? `bg-gradient-to-br ${colony.color} bg-opacity-10 border-white/20 shadow-2xl ${colony.glowColor}`
                        : "bg-white/[0.02] border-white/5 hover:border-white/10"
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
                      <div className="flex flex-wrap gap-3">
                        {colony.features.map((feature, i) => (
                          <div
                            key={i}
                            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300"
                          >
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* Visit Link */}
                      <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Visit Platform
                        </span>
                        <span className="flex items-center gap-2 text-sm font-medium text-white group-hover:text-[#FFD700] transition-colors">
                          {colony.url.replace("https://", "").replace("www.", "")}
                          <HiOutlineChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>

                    {/* Decorative Corner */}
                    <div
                      className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] bg-gradient-to-br ${colony.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <div className="inline-flex flex-col items-center gap-6">
              <p className="text-gray-500">Part of the CryptoMadness Ecosystem</p>
              <a
                href="https://www.cryptomadness.info"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#FFD700]/30 transition-all"
              >
                <HiOutlineGlobeAlt className="w-6 h-6 text-[#FFD700]" />
                <span className="text-white font-semibold">
                  Explore CryptoMadness
                </span>
                <HiOutlineArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-[#FFD700] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
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
