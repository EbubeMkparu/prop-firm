"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiHome,
  FiUsers,
  FiAward,
  FiTrendingUp,
  FiCalendar,
  FiBarChart2,
  FiDownload,
  FiGlobe,
  FiGift,
  FiLogOut,
  FiMenu,
  FiX,
  FiBell,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import DashboardContent from "./DashboardContent";

const mainMenuItems = [
  { icon: FiHome, label: "Overview", id: "overview" },
  { icon: FiUsers, label: "Accounts", id: "accounts" },
  { icon: FiAward, label: "Challenges", id: "challenges" },
  { icon: FiBarChart2, label: "Competitions", id: "competitions" },
  { icon: FiTrendingUp, label: "Leaderboard", id: "leaderboard" },
  { icon: FiCalendar, label: "Economic Calendar", id: "calendar" },
  { icon: FiDownload, label: "Download", id: "download" },
  { icon: FiGlobe, label: "Ecosystem", id: "ecosystem" },
];

const earningsMenuItems = [
  { icon: FiGift, label: "Referral", id: "referral" },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const allMenuItems = [...mainMenuItems, ...earningsMenuItems];

  // Handle menu item click - expand sidebar if collapsed
  const handleMenuClick = (id: string) => {
    setActiveTab(id);
    if (sidebarCollapsed) {
      setSidebarCollapsed(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Sidebar - Desktop with Glassmorphism */}
      <aside className={`hidden lg:flex flex-col ${sidebarCollapsed ? "w-20" : "w-64"} bg-[#0a0a0a]/80 backdrop-blur-xl border-r border-[#FFD700]/10 transition-all duration-300 relative z-[150] overflow-visible`}>
        {/* Glow effect */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FFD700]/5 to-transparent pointer-events-none" />

        {/* Logo */}
        <div className="p-4 border-b border-[#FFD700]/10 relative">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(255,215,0,0.3)] group-hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all duration-300">
              <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
              </svg>
            </div>
            {!sidebarCollapsed && (
              <span className="text-xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent tracking-wide">PIPZEN</span>
            )}
          </Link>
        </div>

        {/* Collapse Button - NOW AT TOP */}
        <div className="p-3 border-b border-[#FFD700]/10">
          <div className="relative group">
            <button
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`w-full flex items-center ${sidebarCollapsed ? "justify-center" : "gap-3"} px-3 py-2.5 bg-gradient-to-r from-[#FFD700]/10 to-[#FFA500]/5 backdrop-blur-sm text-[#FFD700] hover:from-[#FFD700]/20 hover:to-[#FFA500]/10 rounded-xl transition-all duration-300 cursor-pointer border border-[#FFD700]/20 hover:border-[#FFD700]/40 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)]`}
            >
              {sidebarCollapsed ? <FiChevronRight size={20} className="animate-pulse" /> : <FiChevronLeft size={20} />}
              {!sidebarCollapsed && <span className="text-sm font-medium">Collapse</span>}
            </button>
            {sidebarCollapsed && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#FFD700]/20 rounded-lg text-white text-sm font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999] shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                Expand Sidebar
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-[#0a0a0a]/90" />
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto overflow-x-visible scrollbar-thin scrollbar-thumb-[#FFD700]/20 scrollbar-track-transparent">
          {/* MAIN Section */}
          {!sidebarCollapsed && (
            <p className="text-[10px] font-semibold text-[#FFD700]/50 uppercase tracking-wider px-3 mb-2">
              MAIN
            </p>
          )}
          <div className="space-y-1">
            {mainMenuItems.map((item) => (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/10 text-[#FFD700] border border-[#FFD700]/30 shadow-[0_0_15px_rgba(255,215,0,0.15)]"
                      : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                  }`}
                >
                  <item.icon size={20} className={`flex-shrink-0 transition-all duration-300 ${activeTab === item.id ? "drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" : ""}`} />
                  {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                </button>
                {/* Tooltip on hover when collapsed */}
                {sidebarCollapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#FFD700]/20 rounded-lg text-white text-sm font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999] shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                    {item.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-[#0a0a0a]/90" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* EARNINGS Section */}
          <div className="mt-6">
            {!sidebarCollapsed && (
              <p className="text-[10px] font-semibold text-[#FFD700]/50 uppercase tracking-wider px-3 mb-2">
                EARNINGS
              </p>
            )}
            <div className="space-y-1">
              {earningsMenuItems.map((item) => (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/10 text-[#FFD700] border border-[#FFD700]/30 shadow-[0_0_15px_rgba(255,215,0,0.15)]"
                        : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                    }`}
                  >
                    <item.icon size={20} className={`flex-shrink-0 transition-all duration-300 ${activeTab === item.id ? "drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" : ""}`} />
                    {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                  </button>
                  {/* Tooltip on hover when collapsed */}
                  {sidebarCollapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#FFD700]/20 rounded-lg text-white text-sm font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999] shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                      {item.label}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-[#0a0a0a]/90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Sign Out - at bottom */}
        <div className="p-3 border-t border-[#FFD700]/10 mt-auto">
          <div className="relative group">
            <Link
              href="/signin"
              className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-red-500/20"
            >
              <FiLogOut size={20} className="flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm font-medium">Sign Out</span>}
            </Link>
            {sidebarCollapsed && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#FFD700]/20 rounded-lg text-white text-sm font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999] shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                Sign Out
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-[#0a0a0a]/90" />
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-md z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-[#FFD700]/10 z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#FFD700]/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.3)]">
              <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
              </svg>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">PIPZEN</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
            <FiX size={24} />
          </button>
        </div>
        <nav className="p-4 overflow-y-auto h-[calc(100%-140px)]">
          <p className="text-[10px] font-semibold text-[#FFD700]/50 uppercase tracking-wider px-3 mb-2">MAIN</p>
          {mainMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 mb-1 ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/10 text-[#FFD700] border border-[#FFD700]/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
          <p className="text-[10px] font-semibold text-[#FFD700]/50 uppercase tracking-wider px-3 mb-2 mt-4">EARNINGS</p>
          {earningsMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 mb-1 ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/10 text-[#FFD700] border border-[#FFD700]/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#FFD700]/10">
          <Link href="/signin" className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-red-400 rounded-xl transition-all duration-300">
            <FiLogOut size={20} />
            <span className="text-sm font-medium">Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden overflow-y-auto relative z-[50]">
        {/* Top Header with Glassmorphism */}
        <header className="sticky top-0 z-30 bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-[#FFD700]/10">
          <div className="flex items-center justify-between px-4 lg:px-6 py-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-[#FFD700] hover:bg-[#FFD700]/10 rounded-xl transition-all duration-300"
            >
              <FiMenu size={22} />
            </button>

            {/* Page Title */}
            <div className="hidden lg:block">
              <h1 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {allMenuItems.find((item) => item.id === activeTab)?.label || "Dashboard"}
              </h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <button className="relative p-2.5 text-gray-400 hover:text-[#FFD700] hover:bg-[#FFD700]/10 rounded-xl transition-all duration-300 group">
                <FiBell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FFD700] rounded-full animate-pulse shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3 pl-3 ml-2 border-l border-[#FFD700]/10">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-white">John Trader</p>
                  <p className="text-xs bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent font-medium">Funded Trader</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] transition-all duration-300 cursor-pointer">
                  <FiUser className="text-black" size={18} />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area - z-index lower than sidebar for tooltips */}
        <main className="flex-1 overflow-auto bg-gradient-to-b from-[#050505] to-[#0a0a0a] relative z-[100]">
          <DashboardContent activeTab={activeTab} />
        </main>
      </div>
    </div>
  );
}
