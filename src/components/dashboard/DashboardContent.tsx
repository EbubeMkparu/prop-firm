"use client";

import React, { useMemo, useState } from "react";
import {
  FiTrendingUp, FiTrendingDown, FiActivity, FiX, FiCheckCircle, FiXCircle, FiMaximize2,
  FiTarget, FiDollarSign, FiBarChart2, FiZap, FiAlertTriangle,
  FiGlobe, FiAward, FiList, FiSliders, FiPercent, FiFileText, FiLink, FiSmartphone,
  FiShield, FiArrowUp, FiArrowDown, FiRefreshCw
} from "react-icons/fi";
import PnLCalendar from "./PnLCalendar";

// Seeded random number generator for consistent SSR/client rendering
const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};


// Generate calendar data for current month with seed
const generateCalendarData = (seed: number) => {
  const data = [];
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let seedVal = seed;

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    if (dayOfWeek === 0 || dayOfWeek === 6 || date > now) {
      data.push({ date: dateStr, pnl: 0, trades: 0 });
    } else {
      const trades = Math.floor(seededRandom(seedVal++) * 6) + 1;
      const pnl = Math.round((seededRandom(seedVal++) - 0.35) * 800);
      data.push({ date: dateStr, pnl, trades });
    }
  }
  return data;
};

// Sample trades data
const sampleTrades = [
  { id: "1", symbol: "EUR/USD", type: "LONG" as const, entryPrice: 1.08542, exitPrice: 1.08891, size: 2.5, pnl: 872, pnlPercent: 1.74, entryTime: "Jan 24, 09:32", exitTime: "Jan 24, 14:18", duration: "4h 46m" },
  { id: "2", symbol: "GBP/JPY", type: "SHORT" as const, entryPrice: 189.542, exitPrice: 189.123, size: 1.0, pnl: 419, pnlPercent: 0.84, entryTime: "Jan 24, 11:15", exitTime: "Jan 24, 15:42", duration: "4h 27m" },
  { id: "3", symbol: "XAU/USD", type: "LONG" as const, entryPrice: 2025.50, exitPrice: 2019.30, size: 0.5, pnl: -310, pnlPercent: -0.62, entryTime: "Jan 23, 14:22", exitTime: "Jan 23, 16:58", duration: "2h 36m" },
  { id: "4", symbol: "USD/JPY", type: "SHORT" as const, entryPrice: 148.234, exitPrice: 147.891, size: 3.0, pnl: 1029, pnlPercent: 2.06, entryTime: "Jan 23, 08:45", exitTime: "Jan 23, 13:21", duration: "4h 36m" },
  { id: "5", symbol: "BTC/USD", type: "LONG" as const, entryPrice: 42150.00, exitPrice: 42890.00, size: 0.15, pnl: 1110, pnlPercent: 2.22, entryTime: "Jan 22, 10:00", exitTime: "Jan 23, 08:30", duration: "22h 30m" },
];

// Sample stats
const symbolStats = [
  { symbol: "EUR/USD", trades: 45, winRate: 71, pnl: 3250 },
  { symbol: "GBP/JPY", trades: 28, winRate: 64, pnl: 1890 },
  { symbol: "XAU/USD", trades: 22, winRate: 59, pnl: 1420 },
  { symbol: "USD/JPY", trades: 18, winRate: 72, pnl: 1180 },
  { symbol: "BTC/USD", trades: 8, winRate: 75, pnl: 980 },
  { symbol: "EUR/GBP", trades: 6, winRate: 50, pnl: -300 },
];

interface DashboardContentProps {
  activeTab?: string;
}

export default function DashboardContent({ activeTab = "overview" }: DashboardContentProps) {
  // Use fixed seeds for consistent SSR/client rendering
  const calendarData = useMemo(() => generateCalendarData(67890), []);
  const [selectedDay, setSelectedDay] = useState<{ date: string; pnl: number; trades: number } | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [chartHover, setChartHover] = useState<{ x: number; y: number; day: number; equity: number; pnl: number; percentGain: number } | null>(null);

  // Equity curve data points for smooth interpolation (daily data over 30 days)
  const equityData = useMemo(() => {
    const startBalance = 50000;
    const finalBalance = 53861; // Current balance
    const points = [
      { day: 0, equity: 50000 }, { day: 1, equity: 50200 }, { day: 2, equity: 50450 },
      { day: 3, equity: 50380 }, { day: 4, equity: 50650 }, { day: 5, equity: 50800 },
      { day: 6, equity: 50750 }, { day: 7, equity: 51100 }, { day: 8, equity: 51350 },
      { day: 9, equity: 51200 }, { day: 10, equity: 51500 }, { day: 11, equity: 51750 },
      { day: 12, equity: 51650 }, { day: 13, equity: 51900 }, { day: 14, equity: 52150 },
      { day: 15, equity: 52400 }, { day: 16, equity: 52300 }, { day: 17, equity: 52550 },
      { day: 18, equity: 52800 }, { day: 19, equity: 52700 }, { day: 20, equity: 52950 },
      { day: 21, equity: 53100 }, { day: 22, equity: 53050 }, { day: 23, equity: 53300 },
      { day: 24, equity: 53450 }, { day: 25, equity: 53380 }, { day: 26, equity: 53600 },
      { day: 27, equity: 53750 }, { day: 28, equity: 53780 }, { day: 29, equity: finalBalance },
    ];
    return points.map(p => ({
      ...p,
      pnl: p.equity - startBalance,
      percentGain: ((p.equity - startBalance) / startBalance) * 100,
      y: 60 - ((p.equity - startBalance) / 200) // Scale to SVG coordinates
    }));
  }, []);

  // Handle smooth mouse tracking on chart
  const handleChartMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const percentX = relativeX / rect.width;
    const dayIndex = Math.min(Math.max(Math.round(percentX * 29), 0), 29);
    const data = equityData[dayIndex];
    if (data) {
      setChartHover({
        x: percentX * 300, // SVG x coordinate
        y: data.y,
        day: data.day + 1,
        equity: data.equity,
        pnl: data.pnl,
        percentGain: data.percentGain
      });
    }
  };

  const currentBalance = equityData[equityData.length - 1]?.equity || 50000;
  const totalPnL = currentBalance - 50000;
  const totalTrades = 127;
  const winRate = 68.5;

  // Calculate calendar totals
  const calendarTotals = useMemo(() => {
    const profits = calendarData.filter(d => d.pnl > 0).reduce((sum, d) => sum + d.pnl, 0);
    const losses = Math.abs(calendarData.filter(d => d.pnl < 0).reduce((sum, d) => sum + d.pnl, 0));
    const winDays = calendarData.filter(d => d.pnl > 0).length;
    const lossDays = calendarData.filter(d => d.pnl < 0).length;
    const totalDayTrades = calendarData.reduce((sum, d) => sum + d.trades, 0);
    return { profits, losses, winDays, lossDays, totalDayTrades };
  }, [calendarData]);

  // Render based on active tab
  if (activeTab === "accounts") {
    return (
      <div className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Active Account Card */}
          <div className="bg-gradient-to-br from-[#FFD700]/10 to-[#0a0a0a] rounded-2xl border border-[#FFD700]/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-[#FFD700] bg-[#FFD700]/20 px-2 py-1 rounded">ACTIVE</span>
              <span className="text-xs text-gray-500">Phase 1</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">$50,000</p>
            <p className="text-sm text-gray-400 mb-4">Evaluation Account</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Profit</span><span className="text-green-500">+$3,120</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Drawdown</span><span className="text-white">4.8%</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Days Active</span><span className="text-white">12</span></div>
            </div>
          </div>
          {/* Add New Account Card */}
          <div className="bg-[#0a0a0a] rounded-2xl border border-dashed border-[#333] p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#FFD700]/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center mb-3">
              <span className="text-2xl text-gray-500">+</span>
            </div>
            <p className="text-gray-400 font-medium">Add New Account</p>
            <p className="text-xs text-gray-600 mt-1">Start a new challenge</p>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "challenges") {
    return (
      <div className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {["$5K", "$10K", "$25K", "$50K", "$100K", "$200K"].map((size, i) => (
            <div key={i} className="bg-[#0a0a0a] rounded-2xl border border-[#1a1a1a] p-6 hover:border-[#FFD700]/30 transition-colors">
              <p className="text-2xl font-bold text-white mb-1">{size}</p>
              <p className="text-sm text-gray-400 mb-4">Challenge Account</p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Profit Target</span><span className="text-[#FFD700]">10%</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Max Drawdown</span><span className="text-white">10%</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Daily Loss</span><span className="text-white">5%</span></div>
              </div>
              <button className="w-full py-2.5 bg-[#FFD700] text-black font-semibold rounded-lg hover:bg-[#FFD700]/90 transition-colors">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "competitions") {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-[#0a0a0a] rounded-2xl border border-[#1a1a1a] p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Active Competitions</h3>
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[#111] flex items-center justify-center mx-auto mb-4">
              <FiTrendingUp className="text-[#FFD700]" size={28} />
            </div>
            <p className="text-gray-400 mb-2">No active competitions</p>
            <p className="text-sm text-gray-600">Check back soon for upcoming trading competitions</p>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "leaderboard") {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-[#0a0a0a] rounded-2xl border border-[#1a1a1a] overflow-hidden">
          <div className="p-4 border-b border-[#1a1a1a]">
            <h3 className="text-lg font-semibold text-white">Top Traders This Month</h3>
          </div>
          <div className="divide-y divide-[#1a1a1a]">
            {[
              { rank: 1, name: "TraderPro", profit: "+$12,450", return: "+24.9%" },
              { rank: 2, name: "FXMaster", profit: "+$9,820", return: "+19.6%" },
              { rank: 3, name: "GoldHunter", profit: "+$8,340", return: "+16.7%" },
              { rank: 4, name: "ScalpKing", profit: "+$7,210", return: "+14.4%" },
              { rank: 5, name: "SwingTrader", profit: "+$6,890", return: "+13.8%" },
            ].map((trader) => (
              <div key={trader.rank} className="flex items-center justify-between p-4 hover:bg-[#111] transition-colors">
                <div className="flex items-center gap-4">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${trader.rank <= 3 ? "bg-[#FFD700]/20 text-[#FFD700]" : "bg-[#111] text-gray-400"}`}>
                    {trader.rank}
                  </span>
                  <span className="text-white font-medium">{trader.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-green-500 font-semibold">{trader.profit}</p>
                  <p className="text-xs text-gray-500">{trader.return}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "calendar") {
    return (
      <div className="p-6">
        <PnLCalendar data={calendarData} />
      </div>
    );
  }

  if (activeTab === "download") {
    return (
      <div className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: "cTrader", desc: "Advanced trading platform", Icon: FiBarChart2, color: "#FFD700" },
            { name: "MatchTrader", desc: "Social trading platform", Icon: FiLink, color: "#22c55e" },
            { name: "DXTrade", desc: "Web-based trading", Icon: FiGlobe, color: "#3b82f6" },
            { name: "Mobile App", desc: "Trade on the go", Icon: FiSmartphone, color: "#a855f7" },
          ].map((platform, i) => (
            <div key={i} className="bg-[#0a0a0a] rounded-2xl border border-[#1a1a1a] p-6 hover:border-[#FFD700]/30 transition-colors">
              <div className="mb-3"><platform.Icon size={32} style={{ color: platform.color }} /></div>
              <p className="text-lg font-semibold text-white mb-1">{platform.name}</p>
              <p className="text-sm text-gray-400 mb-4">{platform.desc}</p>
              <button className="px-4 py-2 bg-[#111] text-[#FFD700] font-medium rounded-lg hover:bg-[#1a1a1a] transition-colors">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "ecosystem") {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-[#0a0a0a] rounded-2xl border border-[#1a1a1a] p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Pipzen Ecosystem</h3>
          <p className="text-gray-400 mb-6">Access our full suite of trading tools and resources</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "Trading Academy", desc: "Learn from experts" },
              { name: "Signal Groups", desc: "Premium trade alerts" },
              { name: "Community", desc: "Connect with traders" },
            ].map((item, i) => (
              <div key={i} className="bg-[#111] rounded-xl p-4 text-center">
                <p className="text-white font-medium mb-1">{item.name}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "referral") {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-br from-[#FFD700]/10 to-[#0a0a0a] rounded-2xl border border-[#FFD700]/20 p-6">
          <h3 className="text-xl font-semibold text-white mb-2">Refer & Earn</h3>
          <p className="text-gray-400 mb-6">Earn 10% commission on every referral</p>
          <div className="bg-[#0a0a0a] rounded-xl p-4 mb-4">
            <p className="text-xs text-gray-500 mb-2">Your Referral Link</p>
            <div className="flex items-center gap-2">
              <input type="text" value="https://pipzen.com/ref/TRADER123" readOnly className="flex-1 bg-[#111] border border-[#222] rounded-lg px-3 py-2 text-white text-sm" />
              <button className="px-4 py-2 bg-[#FFD700] text-black font-medium rounded-lg">Copy</button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-xs text-gray-500">Referrals</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">$840</p>
              <p className="text-xs text-gray-500">Earned</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#FFD700]">$120</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Prop firm challenge data
  const challengeData = {
    phase: "Phase 1",
    status: "Active",
    startingBalance: 50000,
    currentBalance: currentBalance,
    profitTarget: 10, // 10%
    profitTargetAmount: 5000,
    currentProfit: totalPnL,
    currentProfitPercent: (totalPnL / 50000) * 100,
    maxDrawdown: 10, // 10%
    maxDrawdownAmount: 5000,
    currentDrawdown: 4.8,
    dailyLossLimit: 5, // 5%
    dailyLossAmount: 2500,
    currentDailyLoss: 0.5,
    daysActive: 12,
    minTradingDays: 5,
    daysRemaining: 18,
  };

  // Default: Overview
  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Challenge Status Banner - Glassmorphism */}
      <div className="bg-[#0a0a0a]/60 backdrop-blur-xl rounded-2xl border border-[#FFD700]/20 p-5 relative overflow-hidden hover:border-[#FFD700]/40 transition-all duration-500 group">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFD700]/10 rounded-full blur-3xl group-hover:bg-[#FFD700]/15 transition-all duration-500" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FFD700]/5 rounded-full blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/5 via-transparent to-[#FFD700]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative">
          {/* Status Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 bg-[#FFD700] text-black text-xs font-bold rounded-lg">
                {challengeData.phase.toUpperCase()}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-500 text-sm font-medium">{challengeData.status}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
              <span className="text-green-400">Trading Days:</span>
              <span className="text-white font-bold text-lg">{challengeData.daysActive}</span>
            </div>
          </div>

          {/* Progress Bars Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Profit Target */}
            <div className="bg-[#0a0a0a]/50 backdrop-blur-sm rounded-xl p-4 border border-[#FFD700]/10 hover:border-[#FFD700]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.1)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Profit Target</span>
                <span className="text-[#FFD700] text-xs font-semibold">{challengeData.profitTarget}% target</span>
              </div>
              <div className="flex items-end justify-between mb-2">
                <span className="text-2xl font-bold text-white">{challengeData.currentProfitPercent.toFixed(1)}%</span>
                <span className="text-green-500 text-sm">+${challengeData.currentProfit.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-[#FFD700] rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((challengeData.currentProfitPercent / challengeData.profitTarget) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                ${(challengeData.profitTargetAmount - challengeData.currentProfit).toLocaleString()} to target
              </p>
            </div>

            {/* Max Drawdown */}
            <div className="bg-[#0a0a0a]/50 backdrop-blur-sm rounded-xl p-4 border border-[#FFD700]/10 hover:border-[#FFD700]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.1)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Max Drawdown</span>
                <span className={`text-xs font-semibold ${challengeData.currentDrawdown > 7 ? "text-red-500" : challengeData.currentDrawdown > 5 ? "text-orange-500" : "text-green-500"}`}>
                  {challengeData.maxDrawdown}% limit
                </span>
              </div>
              <div className="flex items-end justify-between mb-2">
                <span className="text-2xl font-bold text-white">{challengeData.currentDrawdown}%</span>
                <span className={`text-sm ${challengeData.currentDrawdown > 7 ? "text-red-500" : "text-green-500"}`}>
                  {(challengeData.maxDrawdown - challengeData.currentDrawdown).toFixed(1)}% remaining
                </span>
              </div>
              <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    challengeData.currentDrawdown > 7 ? "bg-red-500" :
                    challengeData.currentDrawdown > 5 ? "bg-orange-500" : "bg-green-500"
                  }`}
                  style={{ width: `${(challengeData.currentDrawdown / challengeData.maxDrawdown) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                ${(challengeData.maxDrawdownAmount * (1 - challengeData.currentDrawdown / challengeData.maxDrawdown)).toLocaleString()} buffer left
              </p>
            </div>

            {/* Daily Loss Limit */}
            <div className="bg-[#0a0a0a]/50 backdrop-blur-sm rounded-xl p-4 border border-[#FFD700]/10 hover:border-[#FFD700]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.1)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Daily Loss Limit</span>
                <span className={`text-xs font-semibold ${challengeData.currentDailyLoss > 3 ? "text-red-500" : "text-green-500"}`}>
                  {challengeData.dailyLossLimit}% limit
                </span>
              </div>
              <div className="flex items-end justify-between mb-2">
                <span className="text-2xl font-bold text-white">{challengeData.currentDailyLoss}%</span>
                <span className="text-green-500 text-sm">
                  {(challengeData.dailyLossLimit - challengeData.currentDailyLoss).toFixed(1)}% remaining
                </span>
              </div>
              <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    challengeData.currentDailyLoss > 3 ? "bg-red-500" : "bg-green-500"
                  }`}
                  style={{ width: `${(challengeData.currentDailyLoss / challengeData.dailyLossLimit) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                ${(challengeData.dailyLossAmount * (1 - challengeData.currentDailyLoss / challengeData.dailyLossLimit)).toLocaleString()} can risk today
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 1: Charts Row - EXPANDED EQUITY CURVE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Multi-line Performance Chart - EXPANDED */}
        <div
          onClick={() => setExpandedCard("equity")}
          className="lg:col-span-2 bg-gradient-to-br from-[#0a0a0a]/80 to-[#111]/60 backdrop-blur-xl rounded-2xl border border-[#FFD700]/20 p-5 hover:border-[#FFD700]/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,215,0,0.15)] group relative overflow-hidden cursor-pointer"
        >
          {/* Animated glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FFD700]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl" />

          {/* Chart Header with Values */}
          <div className="flex items-center justify-between mb-4 relative">
            <div className="flex items-center gap-3">
              <FiTrendingUp className="text-green-400" size={24} style={{ filter: "drop-shadow(0 0 6px #22c55e)" }} />
              <div>
                <p className="text-white font-semibold">EQUITY CURVE</p>
                <p className="text-xs text-gray-500">Click to expand full view</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-[#FFD700] font-bold text-2xl">${currentBalance.toLocaleString()}</p>
              <FiMaximize2 className="text-gray-500 group-hover:text-[#FFD700] transition-colors" size={18} />
            </div>
          </div>

          {/* Legend with live values - ENHANCED */}
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs relative">
            <div className="flex items-center gap-2 px-3 py-2 bg-[#FFD700]/10 rounded-lg border border-[#FFD700]/30 shadow-[0_0_10px_rgba(255,215,0,0.1)]">
              <div className="w-3 h-3 bg-[#FFD700] rounded-full shadow-[0_0_8px_#FFD700]" />
              <span className="text-[#FFD700] font-medium">Equity</span>
              <span className="text-white font-bold text-sm">${(currentBalance/1000).toFixed(1)}K</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/30">
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]" />
              <span className="text-green-400 font-medium">Target</span>
              <span className="text-white font-bold text-sm">$55K</span>
              <span className="text-green-400 text-[10px]">(+10%)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-red-500/10 rounded-lg border border-red-500/30">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]" />
              <span className="text-red-400 font-medium">DD Limit</span>
              <span className="text-white font-bold text-sm">$45K</span>
              <span className="text-red-400 text-[10px]">(-10%)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-blue-400 font-medium">Daily DD</span>
              <span className="text-white font-bold text-sm">$47.5K</span>
              <span className="text-blue-400 text-[10px]">(-5%)</span>
            </div>
          </div>

          {/* SVG Line Chart - SMOOTH HOVER */}
          <div
            className="h-44 relative cursor-crosshair"
            onMouseMove={handleChartMouseMove}
            onMouseLeave={() => setChartHover(null)}
          >
            <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="20" x2="300" y2="20" stroke="#1a1a1a" strokeWidth="0.5" />
              <line x1="0" y1="40" x2="300" y2="40" stroke="#1a1a1a" strokeWidth="0.5" />
              <line x1="0" y1="60" x2="300" y2="60" stroke="#1a1a1a" strokeWidth="0.5" />
              <line x1="0" y1="80" x2="300" y2="80" stroke="#1a1a1a" strokeWidth="0.5" />
              <line x1="0" y1="100" x2="300" y2="100" stroke="#1a1a1a" strokeWidth="0.5" />
              {/* Target line - Green with label */}
              <line x1="0" y1="15" x2="300" y2="15" stroke="#22c55e" strokeWidth="2" strokeDasharray="8,4" />
              <text x="305" y="18" fill="#22c55e" fontSize="8" fontWeight="bold">TARGET</text>
              {/* Daily DD line - Blue */}
              <line x1="0" y1="75" x2="300" y2="75" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,4" />
              <text x="305" y="78" fill="#3b82f6" fontSize="7">DAILY</text>
              {/* Max DD Limit line - Red with label */}
              <line x1="0" y1="105" x2="300" y2="105" stroke="#ef4444" strokeWidth="2" strokeDasharray="8,4" />
              <text x="305" y="108" fill="#ef4444" fontSize="8" fontWeight="bold">MAX DD</text>
              {/* Starting balance line */}
              <line x1="0" y1="60" x2="300" y2="60" stroke="#ffffff" strokeWidth="1" strokeDasharray="2,6" strokeOpacity="0.3" />
              {/* Equity curve - Using real data points */}
              <polyline
                fill="none"
                stroke="#FFD700"
                strokeWidth="3"
                points={equityData.map((d, i) => `${(i / 29) * 300},${d.y}`).join(' ')}
                style={{ filter: "drop-shadow(0 0 6px #FFD700)" }}
                className="transition-all duration-100"
              />
              {/* Area fill */}
              <polygon
                fill="url(#goldGradientExpanded)"
                points={`${equityData.map((d, i) => `${(i / 29) * 300},${d.y}`).join(' ')} 300,120 0,120`}
              />
              {/* Smooth hover indicator */}
              {chartHover && (
                <g className="transition-transform duration-75">
                  <line
                    x1={chartHover.x} y1={0} x2={chartHover.x} y2={120}
                    stroke="#FFD700" strokeWidth="1" strokeDasharray="4,4" opacity="0.6"
                  />
                  <circle
                    cx={chartHover.x} cy={chartHover.y} r="6"
                    fill="#FFD700"
                    style={{ filter: "drop-shadow(0 0 10px #FFD700)" }}
                  />
                  <circle
                    cx={chartHover.x} cy={chartHover.y} r="10"
                    fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.4"
                  />
                </g>
              )}
              {/* Current position dot with pulse */}
              <circle cx="300" cy={equityData[29]?.y || 22} r="6" fill="#FFD700" style={{ filter: "drop-shadow(0 0 10px #FFD700)" }} />
              <circle cx="300" cy={equityData[29]?.y || 22} r="10" fill="none" stroke="#FFD700" strokeWidth="2" opacity="0.5">
                <animate attributeName="r" from="6" to="15" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <defs>
                <linearGradient id="goldGradientExpanded" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#FFD700" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            {/* Smooth Hover Tooltip */}
            {chartHover && (
              <div
                className="absolute bg-[#0a0a0a]/95 backdrop-blur-xl border border-[#FFD700]/30 rounded-xl p-3 shadow-[0_0_20px_rgba(255,215,0,0.3)] z-20 pointer-events-none transition-all duration-75 ease-out"
                style={{
                  left: `${Math.min(Math.max(chartHover.x / 3, 5), 65)}%`,
                  top: "10px",
                  transform: "translateX(-50%)"
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#FFD700] font-bold text-sm">Day {chartHover.day}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${chartHover.pnl >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {chartHover.percentGain >= 0 ? '+' : ''}{chartHover.percentGain.toFixed(2)}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Equity:</span>
                    <span className="text-white font-bold">${chartHover.equity.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">P&L:</span>
                    <span className={`font-bold ${chartHover.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {chartHover.pnl >= 0 ? '+' : ''}${chartHover.pnl.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">To Target:</span>
                    <span className="text-[#FFD700] font-bold">${(55000 - chartHover.equity).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">DD Buffer:</span>
                    <span className="text-orange-400 font-bold">${(chartHover.equity - 45000).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-gray-400 font-medium">
              <span className="text-green-400">$55K</span>
              <span>$52.5K</span>
              <span className="text-white">$50K</span>
              <span className="text-blue-400">$47.5K</span>
              <span className="text-red-400">$45K</span>
            </div>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between text-xs text-gray-500 mt-3 px-4">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
            <span>Today</span>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-[#FFD700]/10">
            <div className="text-center">
              <p className="text-xs text-gray-400">To Target</p>
              <p className="text-green-400 font-bold">${(55000 - currentBalance).toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400">DD Buffer</p>
              <p className="text-[#FFD700] font-bold">${(currentBalance - 45000).toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400">Today P&L</p>
              <p className="text-green-400 font-bold">+$342</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400">Total P&L</p>
              <p className="text-green-400 font-bold">+${totalPnL.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Right Column - Stacked Cards */}
        <div className="space-y-4">
          {/* Account Balance Card - Expandable */}
          <div
            onClick={() => setExpandedCard("balance")}
            className="bg-gradient-to-br from-[#0a0a0a]/80 to-[#111]/60 backdrop-blur-xl rounded-2xl border border-[#FFD700]/20 p-5 hover:border-[#FFD700]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.15)] cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#FFD700]/10 rounded-full blur-2xl group-hover:bg-[#FFD700]/20 transition-all" />
            <div className="flex items-start justify-between relative">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FiDollarSign className="text-[#FFD700]" size={20} style={{ filter: "drop-shadow(0 0 4px #FFD700)" }} />
                  <p className="text-xs text-gray-400">ACCOUNT BALANCE</p>
                </div>
                <p className="text-3xl font-bold text-[#FFD700]">${(currentBalance / 1000).toFixed(1)}K</p>
                <p className="text-xs text-green-400 mt-1">+${totalPnL.toLocaleString()} ({((totalPnL/50000)*100).toFixed(1)}%)</p>
              </div>
              <FiMaximize2 className="text-gray-500 group-hover:text-[#FFD700] transition-colors" size={16} />
            </div>
          </div>

          {/* Total Trades Card - Expandable */}
          <div
            onClick={() => setExpandedCard("trades")}
            className="bg-gradient-to-br from-[#0a0a0a]/80 to-[#111]/60 backdrop-blur-xl rounded-2xl border border-[#FFD700]/20 p-5 hover:border-[#FFD700]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.15)] cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all" />
            <div className="flex items-start justify-between relative">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FiZap className="text-[#FFD700]" size={20} style={{ filter: "drop-shadow(0 0 4px #FFD700)" }} />
                  <p className="text-xs text-gray-400">TOTAL TRADES</p>
                </div>
                <p className="text-3xl font-bold text-white">{totalTrades}</p>
                <p className="text-xs text-[#FFD700] mt-1">{winRate}% win rate</p>
              </div>
              <FiMaximize2 className="text-gray-500 group-hover:text-[#FFD700] transition-colors" size={16} />
            </div>
            {/* Mini bar chart */}
            <div className="flex items-end justify-between h-10 gap-0.5 mt-3">
              {[65, 45, 80, 55, 70, 40, 85, 60].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-[#FFD700] rounded-t transition-all duration-300 group-hover:bg-green-500"
                  style={{ height: `${height}%`, opacity: 0.4 + (height / 100) * 0.6 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2: Middle Row - Progress Circles, Calendar, Session Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Circular Progress Gauges - EXPANDED */}
        <div
          onClick={() => setExpandedCard("metrics")}
          className="lg:col-span-4 bg-gradient-to-br from-[#0a0a0a]/80 to-[#111]/60 backdrop-blur-xl rounded-2xl border border-[#FFD700]/20 p-5 hover:border-[#FFD700]/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,215,0,0.15)] relative overflow-hidden cursor-pointer"
        >
          {/* Background glow */}
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#FFD700]/10 rounded-full blur-3xl" />
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-green-500/10 rounded-full blur-3xl" />

          <div className="flex items-center justify-between mb-4 relative">
            <p className="text-white font-semibold flex items-center gap-2">
              <FiBarChart2 className="text-[#FFD700]" size={18} /> KEY METRICS
            </p>
            <FiMaximize2 className="text-gray-500 hover:text-[#FFD700] transition-colors" size={16} />
          </div>

          <div className="space-y-3 relative">
            {/* Profit Target Gauge */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FFD700]/5 border border-[#FFD700]/10 hover:border-[#FFD700]/30 transition-all duration-300 cursor-pointer group">
              <div className="relative w-14 h-14 flex-shrink-0">
                <svg className="w-14 h-14 transform -rotate-90">
                  <circle cx="28" cy="28" r="24" stroke="#1a1a1a" strokeWidth="4" fill="none" />
                  <circle
                    cx="28" cy="28" r="24"
                    stroke="#FFD700"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${(challengeData.currentProfitPercent / challengeData.profitTarget) * 151} 151`}
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0 0 6px #FFD700)" }}
                    className="transition-all duration-500"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#FFD700]">
                  {Math.round((challengeData.currentProfitPercent / challengeData.profitTarget) * 100)}%
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-white font-medium text-sm">PROFIT TARGET</p>
                  <span className="text-[#FFD700] text-[10px] font-bold bg-[#FFD700]/10 px-1.5 py-0.5 rounded flex-shrink-0 flex items-center"><FiTarget size={10} /></span>
                </div>
                <p className="text-xs text-[#FFD700]">{challengeData.currentProfitPercent.toFixed(1)}% / {challengeData.profitTarget}%</p>
                <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full mt-1.5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full" style={{ width: `${(challengeData.currentProfitPercent / challengeData.profitTarget) * 100}%` }} />
                </div>
              </div>
            </div>

            {/* Win Rate Gauge */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/5 border border-green-500/10 hover:border-green-500/30 transition-all duration-300 cursor-pointer group">
              <div className="relative w-14 h-14 flex-shrink-0">
                <svg className="w-14 h-14 transform -rotate-90">
                  <circle cx="28" cy="28" r="24" stroke="#1a1a1a" strokeWidth="4" fill="none" />
                  <circle
                    cx="28" cy="28" r="24"
                    stroke="#22c55e"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${(winRate / 100) * 151} 151`}
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0 0 6px #22c55e)" }}
                    className="transition-all duration-500"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-green-500">
                  {winRate}%
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-white font-medium text-sm">WIN RATE</p>
                  <span className="text-green-500 text-[10px] font-bold bg-green-500/10 px-1.5 py-0.5 rounded flex-shrink-0 flex items-center"><FiCheckCircle size={10} /></span>
                </div>
                <p className="text-xs text-green-500">{Math.round(totalTrades * winRate / 100)} wins of {totalTrades}</p>
                <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full mt-1.5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" style={{ width: `${winRate}%` }} />
                </div>
              </div>
            </div>

            {/* Drawdown Gauge */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-orange-500/5 border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300 cursor-pointer group">
              <div className="relative w-14 h-14 flex-shrink-0">
                <svg className="w-14 h-14 transform -rotate-90">
                  <circle cx="28" cy="28" r="24" stroke="#1a1a1a" strokeWidth="4" fill="none" />
                  <circle
                    cx="28" cy="28" r="24"
                    stroke="#f97316"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${(challengeData.currentDrawdown / challengeData.maxDrawdown) * 151} 151`}
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0 0 6px #f97316)" }}
                    className="transition-all duration-500"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-orange-500">
                  {Math.round((challengeData.currentDrawdown / challengeData.maxDrawdown) * 100)}%
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-white font-medium text-sm">DRAWDOWN</p>
                  <span className="text-orange-500 text-[10px] font-bold bg-orange-500/10 px-1.5 py-0.5 rounded flex-shrink-0 flex items-center"><FiAlertTriangle size={10} /></span>
                </div>
                <p className="text-xs text-orange-500">{challengeData.currentDrawdown}% / {challengeData.maxDrawdown}% max</p>
                <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full mt-1.5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: `${(challengeData.currentDrawdown / challengeData.maxDrawdown) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle: Calendar Heatmap - ENHANCED - Takes remaining space */}
        <div className="lg:col-span-8 bg-[#0a0a0a]/60 backdrop-blur-xl rounded-2xl border border-[#FFD700]/20 p-5 hover:border-[#FFD700]/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,215,0,0.15)] relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl" />

          {/* Header with stats */}
          <div className="flex items-center justify-between mb-4 relative">
            <div>
              <p className="text-white font-semibold">TRADING CALENDAR</p>
              <p className="text-xs text-gray-500">January 2025</p>
            </div>
            <div className="flex gap-3">
              <div className="text-center px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-400 text-xs">Profits</p>
                <p className="text-white font-bold text-sm">+${calendarTotals.profits.toLocaleString()}</p>
              </div>
              <div className="text-center px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-xs">Losses</p>
                <p className="text-white font-bold text-sm">-${calendarTotals.losses.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs relative">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <div key={i} className="text-[#FFD700]/70 py-1 font-semibold">{day}</div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 2;
              const isValidDay = day >= 1 && day <= 31;
              const dayData = calendarData.find(d => {
                const dateDay = parseInt(d.date.split("-")[2]);
                return dateDay === day;
              });
              const pnl = dayData?.pnl || 0;
              const trades = dayData?.trades || 0;
              const bgColor = !isValidDay ? "bg-transparent" :
                pnl > 200 ? "bg-gradient-to-br from-green-500 to-green-600 shadow-[0_0_10px_rgba(34,197,94,0.5)]" :
                pnl > 0 ? "bg-green-500/60" :
                pnl < -200 ? "bg-gradient-to-br from-red-500 to-red-600 shadow-[0_0_10px_rgba(239,68,68,0.5)]" :
                pnl < 0 ? "bg-red-500/60" : "bg-[#1a1a1a]/50";

              return (
                <div
                  key={i}
                  onClick={() => isValidDay && dayData && dayData.trades > 0 && setSelectedDay(dayData)}
                  className={`aspect-square rounded-lg ${bgColor} flex flex-col items-center justify-center text-[10px] transition-all duration-200 ${isValidDay && dayData && dayData.trades > 0 ? "cursor-pointer hover:scale-110 hover:z-10" : ""} ${isValidDay ? "text-white font-medium" : ""}`}
                >
                  {isValidDay && (
                    <>
                      <span>{day}</span>
                      {trades > 0 && <span className="text-[8px] opacity-70">{trades}t</span>}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Stats - P&L and Balance */}
          <div className="mt-4 pt-3 border-t border-[#FFD700]/10 space-y-3">
            {/* P&L and Balance Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                <p className="text-xs text-gray-400 mb-1">Month P&L</p>
                <p className="text-green-400 font-bold text-lg">+${(calendarTotals.profits - calendarTotals.losses).toLocaleString()}</p>
              </div>
              <div className="bg-[#FFD700]/10 rounded-lg p-3 border border-[#FFD700]/20">
                <p className="text-xs text-gray-400 mb-1">Balance</p>
                <p className="text-[#FFD700] font-bold text-lg">${currentBalance.toLocaleString()}</p>
              </div>
            </div>
            {/* Days Stats Row */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                  <span className="text-green-400 font-medium">{calendarTotals.winDays} win</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
                  <span className="text-red-400 font-medium">{calendarTotals.lossDays} loss</span>
                </div>
              </div>
              <span className="text-gray-400">{calendarTotals.totalDayTrades} trades</span>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 3: Big Stats Row - ENHANCED with animations */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "BALANCE", value: `$${(currentBalance / 1000).toFixed(1)}K`, color: "#FFD700", Icon: FiDollarSign, pulse: true },
          { label: "PROFIT", value: `+$${(totalPnL / 1000).toFixed(1)}K`, color: "#22c55e", Icon: FiTrendingUp, pulse: false },
          { label: "TRADES", value: totalTrades.toString(), color: "#FFD700", Icon: FiZap, pulse: false },
          { label: "WIN RATE", value: `${winRate}%`, color: "#22c55e", Icon: FiTarget, pulse: true },
          { label: "AVG WIN", value: "$187", color: "#22c55e", Icon: FiCheckCircle, pulse: false },
          { label: "AVG LOSS", value: "$89", color: "#ef4444", Icon: FiTrendingDown, pulse: false },
        ].map((stat, i) => (
          <div key={i} className="bg-gradient-to-br from-[#0a0a0a]/80 to-[#111]/60 backdrop-blur-xl rounded-2xl border border-[#FFD700]/10 p-4 text-center relative overflow-hidden hover:border-[#FFD700]/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,215,0,0.25)] hover:scale-110 cursor-pointer group">
            {/* Animated background glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-all duration-500"
              style={{
                background: `radial-gradient(circle at center, ${stat.color} 0%, transparent 60%)`
              }}
            />
            {/* Animated border glow */}
            <div
              className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${stat.pulse ? "animate-pulse" : ""}`}
              style={{
                boxShadow: `inset 0 0 20px ${stat.color}30`
              }}
            />
            <div className="relative">
              {/* Icon with glow */}
              <div className="mb-2 transform group-hover:scale-125 transition-transform duration-300 flex justify-center">
                <stat.Icon size={24} style={{ color: stat.color, filter: `drop-shadow(0 0 6px ${stat.color})` }} />
              </div>
              {/* Circular progress ring */}
              <div className="relative w-20 h-20 mx-auto mb-2">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="34" stroke="#1a1a1a" strokeWidth="3" fill="none" />
                  <circle
                    cx="40" cy="40" r="34"
                    stroke={stat.color}
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="214"
                    strokeDashoffset={214 - (214 * ((i + 1) * 15) / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                    style={{ filter: `drop-shadow(0 0 6px ${stat.color})` }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold transition-all duration-300 group-hover:scale-110" style={{ color: stat.color, textShadow: `0 0 10px ${stat.color}50` }}>{stat.value}</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 font-medium tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ROW 4: Bottom Stats with Bar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Session Distribution - ENHANCED */}
        <div
          onClick={() => setExpandedCard("sessions")}
          className="bg-gradient-to-br from-[#0a0a0a]/80 to-[#111]/60 backdrop-blur-xl rounded-2xl border border-[#FFD700]/20 p-5 hover:border-[#FFD700]/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,215,0,0.15)] relative overflow-hidden group cursor-pointer"
        >
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/5 rounded-full blur-3xl group-hover:bg-[#FFD700]/10 transition-all duration-500" />

          <div className="flex items-center justify-between mb-4 relative">
            <div className="flex items-center gap-2">
              <FiGlobe className="text-[#FFD700]" size={20} />
              <p className="text-white font-semibold">SESSION PERFORMANCE</p>
            </div>
            <FiMaximize2 className="text-gray-500 group-hover:text-[#FFD700] transition-colors" size={16} />
          </div>

          <div className="space-y-3 relative">
            {[
              { session: "London", trades: 45, winRate: 72, color: "#FFD700", abbr: "UK", gradient: "from-[#FFD700] to-[#FFA500]" },
              { session: "New York", trades: 38, winRate: 68, color: "#22c55e", abbr: "US", gradient: "from-green-500 to-emerald-400" },
              { session: "Asian", trades: 28, winRate: 64, color: "#3b82f6", abbr: "AS", gradient: "from-blue-500 to-cyan-400" },
              { session: "Sydney", trades: 16, winRate: 56, color: "#a855f7", abbr: "AU", gradient: "from-purple-500 to-pink-400" },
            ].map((session, i) => (
              <div key={i} className="p-2 bg-[#0a0a0a]/50 rounded-xl border border-transparent hover:border-[#FFD700]/20 transition-all duration-300 hover:bg-[#FFD700]/5 cursor-pointer group/item">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${session.color}20`, color: session.color }}>{session.abbr}</span>
                    <span className="text-white font-medium text-sm">{session.session}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500">{session.trades}t</span>
                    <span className="text-xs font-bold" style={{ color: session.color }}>{session.winRate}%</span>
                  </div>
                </div>
                <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden relative">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${session.gradient} transition-all duration-500 group-hover/item:shadow-[0_0_10px_rgba(255,215,0,0.3)]`}
                    style={{ width: `${session.winRate}%` }}
                  />
                  {/* Animated shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/item:translate-x-full transition-transform duration-1000" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Symbol Performance Bars - ENHANCED */}
        <div
          onClick={() => setExpandedCard("symbols")}
          className="bg-gradient-to-br from-[#0a0a0a]/80 to-[#111]/60 backdrop-blur-xl rounded-2xl border border-[#FFD700]/20 p-5 hover:border-[#FFD700]/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,215,0,0.15)] relative overflow-hidden cursor-pointer"
        >
          {/* Background accent */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-500/5 rounded-full blur-3xl" />

          <div className="flex items-center justify-between mb-4 relative">
            <div className="flex items-center gap-2">
              <FiActivity className="text-green-400" size={20} />
              <p className="text-white font-semibold">SYMBOL PERFORMANCE</p>
            </div>
            <FiMaximize2 className="text-gray-500 hover:text-[#FFD700] transition-colors" size={16} />
          </div>

          <div className="space-y-3 relative">
            {symbolStats.slice(0, 5).map((symbol, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#FFD700]/5 transition-all duration-300 cursor-pointer group">
                {/* Rank badge */}
                <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${i === 0 ? "bg-[#FFD700]/20 text-[#FFD700]" : i === 1 ? "bg-gray-500/20 text-gray-400" : "bg-[#1a1a1a] text-gray-500"}`}>
                  {i + 1}
                </div>
                <span className="text-sm text-white font-medium w-20">{symbol.symbol}</span>
                <div className="flex-1 h-8 bg-[#1a1a1a] rounded-lg overflow-hidden relative">
                  <div
                    className="h-full rounded-lg transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                    style={{
                      width: `${Math.max((symbol.pnl / 3500) * 100, 5)}%`,
                      background: symbol.pnl >= 0 ? "linear-gradient(90deg, #22c55e60, #22c55e)" : "linear-gradient(90deg, #ef444460, #ef4444)"
                    }}
                  />
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <div className="absolute inset-0 flex items-center justify-between px-3">
                    <span className="text-[10px] text-gray-400">{symbol.winRate}% win</span>
                    <span className={`text-xs font-bold ${symbol.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {symbol.pnl >= 0 ? "+" : ""}${symbol.pnl}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats Grid - ENHANCED */}
        <div className="bg-gradient-to-br from-[#0a0a0a]/80 to-[#111]/60 backdrop-blur-xl rounded-2xl border border-[#FFD700]/20 p-5 hover:border-[#FFD700]/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,215,0,0.15)] relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FFD700]/5 rounded-full blur-3xl" />

          <div className="flex items-center justify-between mb-4 relative">
            <div className="flex items-center gap-2">
              <FiFileText className="text-[#FFD700]" size={20} />
              <p className="text-white font-semibold">QUICK STATS</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 relative">
            {[
              { label: "Profit Factor", value: "2.34", color: "#FFD700", Icon: FiPercent, good: true },
              { label: "Best Trade", value: "$1,110", color: "#22c55e", Icon: FiAward, good: true },
              { label: "Worst Trade", value: "-$310", color: "#ef4444", Icon: FiTrendingDown, good: false },
              { label: "Avg RRR", value: "1:2.1", color: "#FFD700", Icon: FiTarget, good: true },
              { label: "Sharpe Ratio", value: "1.85", color: "#22c55e", Icon: FiSliders, good: true },
              { label: "Expectancy", value: "$98", color: "#FFD700", Icon: FiDollarSign, good: true },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 bg-gradient-to-br from-[#111]/80 to-[#0a0a0a]/60 backdrop-blur-sm rounded-xl border border-[#FFD700]/10 hover:border-[#FFD700]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] hover:scale-105 cursor-pointer group relative overflow-hidden">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `radial-gradient(circle at center, ${stat.color}15 0%, transparent 70%)` }} />
                <div className="relative">
                  <div className="flex justify-center mb-1"><stat.Icon size={18} style={{ color: stat.color }} /></div>
                  <p className="text-xl font-bold transition-all duration-300" style={{ color: stat.color, textShadow: `0 0 8px ${stat.color}30` }}>{stat.value}</p>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{stat.label}</p>
                  {stat.good && <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 5: Recent Activity - ENHANCED */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Trades */}
        <div className="bg-gradient-to-br from-[#0a0a0a]/80 to-[#111]/60 backdrop-blur-xl rounded-2xl border border-[#FFD700]/20 p-5 hover:border-[#FFD700]/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,215,0,0.15)] relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />

          <div className="flex items-center justify-between mb-4 relative">
            <div className="flex items-center gap-2">
              <FiList className="text-blue-400" size={20} />
              <p className="text-white font-semibold">RECENT TRADES</p>
            </div>
            <span className="text-xs text-[#FFD700] cursor-pointer hover:text-[#FFD700]/80 flex items-center gap-1">View All <FiActivity size={12} /></span>
          </div>

          <div className="space-y-2 relative">
            {sampleTrades.slice(0, 4).map((trade) => (
              <div key={trade.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-[#111]/80 to-transparent backdrop-blur-sm rounded-xl border border-transparent hover:border-[#FFD700]/20 transition-all duration-300 hover:bg-[#FFD700]/5 hover:translate-x-1 cursor-pointer group">
                <div className="flex items-center gap-3">
                  {/* Animated indicator */}
                  <div className={`w-1.5 h-12 rounded-full relative overflow-hidden ${trade.pnl >= 0 ? "bg-green-500/30" : "bg-red-500/30"}`}>
                    <div className={`absolute bottom-0 w-full rounded-full transition-all duration-500 group-hover:h-full ${trade.pnl >= 0 ? "bg-green-500 h-3/4" : "bg-red-500 h-1/2"}`} style={{ boxShadow: trade.pnl >= 0 ? "0 0 10px #22c55e" : "0 0 10px #ef4444" }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-medium text-sm">{trade.symbol}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${trade.type === "LONG" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                        {trade.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{trade.entryTime} · {trade.duration}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-sm ${trade.pnl >= 0 ? "text-green-500" : "text-red-500"}`} style={{ textShadow: trade.pnl >= 0 ? "0 0 8px #22c55e50" : "0 0 8px #ef444450" }}>
                    {trade.pnl >= 0 ? "+" : ""}${trade.pnl}
                  </p>
                  <p className={`text-xs ${trade.pnl >= 0 ? "text-green-400/70" : "text-red-400/70"}`}>
                    {trade.pnl >= 0 ? "+" : ""}{trade.pnlPercent}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-gradient-to-br from-[#0a0a0a]/80 to-[#111]/60 backdrop-blur-xl rounded-2xl border border-[#FFD700]/20 p-5 hover:border-[#FFD700]/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,215,0,0.15)] relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#FFD700]/5 rounded-full blur-3xl" />

          <div className="flex items-center justify-between mb-4 relative">
            <div className="flex items-center gap-2">
              <FiAward className="text-[#FFD700]" size={20} />
              <p className="text-white font-semibold">TOP PERFORMERS</p>
            </div>
            <span className="text-xs text-[#FFD700] cursor-pointer hover:text-[#FFD700]/80 flex items-center gap-1">View Stats <FiTrendingUp size={12} /></span>
          </div>

          <div className="space-y-2 relative">
            {symbolStats.slice(0, 4).map((symbol, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gradient-to-r from-[#111]/80 to-transparent backdrop-blur-sm rounded-xl border border-transparent hover:border-[#FFD700]/20 transition-all duration-300 hover:bg-[#FFD700]/5 hover:translate-x-1 cursor-pointer group">
                <div className="flex items-center gap-3">
                  {/* Animated rank badge */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300 group-hover:scale-110 ${
                    i === 0 ? "bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-black shadow-[0_0_15px_rgba(255,215,0,0.5)]" :
                    i === 1 ? "bg-gradient-to-br from-gray-400 to-gray-500 text-black shadow-[0_0_10px_rgba(156,163,175,0.3)]" :
                    i === 2 ? "bg-gradient-to-br from-amber-700 to-amber-800 text-white shadow-[0_0_10px_rgba(180,83,9,0.3)]" :
                    "bg-[#1a1a1a] text-gray-400"
                  }`}>
                    #{i + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{symbol.symbol}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{symbol.trades} trades</span>
                      <span className="w-1 h-1 bg-gray-600 rounded-full" />
                      <span className="text-green-400">{symbol.winRate}% win</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-sm ${symbol.pnl >= 0 ? "text-green-500" : "text-red-500"}`} style={{ textShadow: symbol.pnl >= 0 ? "0 0 8px #22c55e50" : "0 0 8px #ef444450" }}>
                    {symbol.pnl >= 0 ? "+" : ""}${symbol.pnl}
                  </p>
                  {i === 0 && <span className="text-[10px] text-[#FFD700] flex items-center gap-0.5"><FiTrendingUp size={10} /> Hot</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Day Details Modal */}
      {selectedDay && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[200] p-4" onClick={() => setSelectedDay(null)}>
          <div
            className="bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] rounded-2xl border border-[#FFD700]/30 p-6 max-w-md w-full shadow-[0_0_60px_rgba(255,215,0,0.2)] relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background glow effects */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FFD700]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#FFD700]/10 rounded-full blur-3xl" />

            {/* Close button */}
            <button
              onClick={() => setSelectedDay(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center hover:border-[#FFD700]/50 hover:bg-[#FFD700]/10 transition-all duration-300 z-10"
            >
              <FiX className="text-gray-400 hover:text-white" size={16} />
            </button>

            <div className="relative">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedDay.pnl >= 0 ? "bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30" : "bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/30"}`}>
                  {selectedDay.pnl >= 0 ? (
                    <FiCheckCircle className="text-green-500" size={24} />
                  ) : (
                    <FiXCircle className="text-red-500" size={24} />
                  )}
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">
                    {new Date(selectedDay.date).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                  </p>
                  <p className={`text-sm font-medium ${selectedDay.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {selectedDay.pnl >= 0 ? "Profitable Day" : "Loss Day"}
                  </p>
                </div>
              </div>

              {/* Main P&L Display */}
              <div className={`text-center py-6 px-4 rounded-xl mb-6 ${selectedDay.pnl >= 0 ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"}`}>
                <p className="text-gray-400 text-sm mb-1">Day P&L</p>
                <p className={`text-4xl font-bold ${selectedDay.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {selectedDay.pnl >= 0 ? "+" : ""}${Math.abs(selectedDay.pnl).toLocaleString()}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {selectedDay.pnl >= 0 ? "+" : ""}{((selectedDay.pnl / 50000) * 100).toFixed(2)}% of starting balance
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-[#1a1a1a]/80 rounded-xl p-4 border border-[#FFD700]/10">
                  <p className="text-gray-400 text-xs">Trades Taken</p>
                  <p className="text-[#FFD700] text-2xl font-bold">{selectedDay.trades}</p>
                </div>
                <div className="bg-[#1a1a1a]/80 rounded-xl p-4 border border-[#FFD700]/10">
                  <p className="text-gray-400 text-xs">Avg Per Trade</p>
                  <p className={`text-2xl font-bold ${selectedDay.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                    ${Math.abs(Math.round(selectedDay.pnl / selectedDay.trades))}
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Session</span>
                  <span className="text-white font-medium">London/NY</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Win Rate</span>
                  <span className={`font-medium ${selectedDay.pnl >= 0 ? "text-green-500" : "text-orange-500"}`}>
                    {selectedDay.pnl >= 0 ? Math.round(60 + Math.random() * 30) : Math.round(20 + Math.random() * 30)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Best Trade</span>
                  <span className="text-green-500 font-medium">+${Math.round(Math.abs(selectedDay.pnl) * 0.6)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Worst Trade</span>
                  <span className="text-red-500 font-medium">-${Math.round(Math.abs(selectedDay.pnl) * 0.2)}</span>
                </div>
              </div>

              {/* Footer Action */}
              <button
                onClick={() => setSelectedDay(null)}
                className="w-full mt-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all duration-300"
              >
                View Full Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Card Modals */}
      {expandedCard && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[200] p-4" onClick={() => setExpandedCard(null)}>
          <div
            className="bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] rounded-2xl border border-[#FFD700]/30 p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_80px_rgba(255,215,0,0.2)] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background glow effects */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FFD700]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={() => setExpandedCard(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center hover:border-[#FFD700]/50 hover:bg-[#FFD700]/10 transition-all duration-300 z-10"
            >
              <FiX className="text-gray-400 hover:text-white" size={20} />
            </button>

            {/* Equity Curve Expanded */}
            {expandedCard === "equity" && (
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <FiTrendingUp className="text-green-400" size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Equity Curve Analysis</h2>
                    <p className="text-gray-400">Detailed performance over time</p>
                  </div>
                </div>

                {/* Main Chart */}
                <div className="bg-[#0a0a0a]/50 rounded-xl p-6 border border-[#FFD700]/10 mb-6">
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#FFD700]/10 rounded-lg border border-[#FFD700]/30">
                      <div className="w-4 h-4 bg-[#FFD700] rounded-full shadow-[0_0_8px_#FFD700]" />
                      <span className="text-[#FFD700] font-medium">Equity</span>
                      <span className="text-white font-bold">${currentBalance.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-lg border border-green-500/30">
                      <div className="w-4 h-4 bg-green-500 rounded-full" />
                      <span className="text-green-400 font-medium">Profit Target</span>
                      <span className="text-white font-bold">$55,000</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-lg border border-red-500/30">
                      <div className="w-4 h-4 bg-red-500 rounded-full" />
                      <span className="text-red-400 font-medium">Max DD Limit</span>
                      <span className="text-white font-bold">$45,000</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-lg border border-blue-500/30">
                      <div className="w-4 h-4 bg-blue-500 rounded-full" />
                      <span className="text-blue-400 font-medium">Daily DD</span>
                      <span className="text-white font-bold">$47,500</span>
                    </div>
                  </div>

                  {/* Large Chart */}
                  <div className="h-80 relative">
                    <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                      {/* Grid */}
                      {[0, 40, 80, 120, 160, 200].map((y) => (
                        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#1a1a1a" strokeWidth="1" />
                      ))}
                      {/* Target line */}
                      <line x1="0" y1="20" x2="400" y2="20" stroke="#22c55e" strokeWidth="2" strokeDasharray="10,5" />
                      <text x="405" y="24" fill="#22c55e" fontSize="10" fontWeight="bold">TARGET $55K</text>
                      {/* Starting line */}
                      <line x1="0" y1="100" x2="400" y2="100" stroke="#ffffff" strokeWidth="1" strokeDasharray="5,10" strokeOpacity="0.3" />
                      <text x="405" y="104" fill="#ffffff" fontSize="10" opacity="0.5">START $50K</text>
                      {/* Daily DD */}
                      <line x1="0" y1="150" x2="400" y2="150" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
                      <text x="405" y="154" fill="#3b82f6" fontSize="10">DAILY $47.5K</text>
                      {/* Max DD */}
                      <line x1="0" y1="180" x2="400" y2="180" stroke="#ef4444" strokeWidth="2" strokeDasharray="10,5" />
                      <text x="405" y="184" fill="#ef4444" fontSize="10" fontWeight="bold">MAX DD $45K</text>
                      {/* Equity curve */}
                      <polyline
                        fill="none"
                        stroke="#FFD700"
                        strokeWidth="3"
                        points="0,100 20,98 40,95 60,90 80,92 100,88 120,85 140,80 160,82 180,78 200,75 220,70 240,68 260,65 280,67 300,62 320,58 340,55 360,52 380,48 400,45"
                        style={{ filter: "drop-shadow(0 0 8px #FFD700)" }}
                      />
                      <polygon
                        fill="url(#modalGradient)"
                        points="0,100 20,98 40,95 60,90 80,92 100,88 120,85 140,80 160,82 180,78 200,75 220,70 240,68 260,65 280,67 300,62 320,58 340,55 360,52 380,48 400,45 400,200 0,200"
                      />
                      <circle cx="400" cy="45" r="8" fill="#FFD700" style={{ filter: "drop-shadow(0 0 12px #FFD700)" }} />
                      <defs>
                        <linearGradient id="modalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Current Balance", value: `$${currentBalance.toLocaleString()}`, color: "#FFD700", Icon: FiDollarSign },
                    { label: "Total P&L", value: `+$${totalPnL.toLocaleString()}`, color: "#22c55e", Icon: FiTrendingUp },
                    { label: "To Target", value: `$${(55000 - currentBalance).toLocaleString()}`, color: "#22c55e", Icon: FiTarget },
                    { label: "DD Buffer", value: `$${(currentBalance - 45000).toLocaleString()}`, color: "#f97316", Icon: FiShield },
                    { label: "Max Drawdown", value: "4.8%", color: "#f97316", Icon: FiTrendingDown },
                    { label: "Peak Equity", value: `$${(currentBalance + 200).toLocaleString()}`, color: "#FFD700", Icon: FiArrowUp },
                    { label: "Lowest Point", value: "$48,500", color: "#ef4444", Icon: FiArrowDown },
                    { label: "Recovery Factor", value: "2.4x", color: "#22c55e", Icon: FiRefreshCw },
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#0a0a0a]/50 rounded-xl p-4 border border-[#FFD700]/10">
                      <div className="flex items-center gap-2 mb-2">
                        <stat.Icon size={16} style={{ color: stat.color }} />
                        <span className="text-xs text-gray-400">{stat.label}</span>
                      </div>
                      <p className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Balance Expanded */}
            {expandedCard === "balance" && (
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#FFD700]/20 flex items-center justify-center">
                    <FiDollarSign className="text-[#FFD700]" size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Account Balance Details</h2>
                    <p className="text-gray-400">Complete financial overview</p>
                  </div>
                </div>

                {/* Main Balance Display */}
                <div className="bg-gradient-to-br from-[#FFD700]/10 to-transparent rounded-xl p-8 border border-[#FFD700]/20 mb-6 text-center">
                  <p className="text-gray-400 mb-2">Current Account Balance</p>
                  <p className="text-5xl font-bold text-[#FFD700] mb-4">${currentBalance.toLocaleString()}</p>
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-green-400 text-lg">+${totalPnL.toLocaleString()}</span>
                    <span className="text-gray-500">|</span>
                    <span className="text-green-400 text-lg">+{((totalPnL/50000)*100).toFixed(2)}%</span>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#0a0a0a]/50 rounded-xl p-5 border border-[#FFD700]/10">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <FiDollarSign className="text-[#FFD700]" /> Balance Breakdown
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between"><span className="text-gray-400">Starting Balance</span><span className="text-white">$50,000</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Realized P&L</span><span className="text-green-400">+${totalPnL.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Unrealized P&L</span><span className="text-green-400">+$0</span></div>
                      <div className="border-t border-[#FFD700]/10 pt-3 flex justify-between"><span className="text-white font-medium">Total Equity</span><span className="text-[#FFD700] font-bold">${currentBalance.toLocaleString()}</span></div>
                    </div>
                  </div>
                  <div className="bg-[#0a0a0a]/50 rounded-xl p-5 border border-[#FFD700]/10">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <FiTarget className="text-green-500" /> Challenge Progress
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between"><span className="text-gray-400">Profit Target</span><span className="text-[#FFD700]">$55,000 (10%)</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Current Progress</span><span className="text-green-400">{((totalPnL/5000)*100).toFixed(1)}%</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Remaining</span><span className="text-white">${(5000 - totalPnL).toLocaleString()}</span></div>
                      <div className="h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#FFD700] to-green-500 rounded-full" style={{ width: `${(totalPnL/5000)*100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Daily P&L History */}
                <div className="bg-[#0a0a0a]/50 rounded-xl p-5 border border-[#FFD700]/10">
                  <h3 className="text-white font-semibold mb-4">Recent P&L History</h3>
                  <div className="space-y-2">
                    {[
                      { date: "Today", pnl: 342, balance: currentBalance },
                      { date: "Yesterday", pnl: -128, balance: currentBalance - 342 },
                      { date: "Jan 25", pnl: 567, balance: currentBalance - 342 + 128 },
                      { date: "Jan 24", pnl: 289, balance: currentBalance - 342 + 128 - 567 },
                      { date: "Jan 23", pnl: -89, balance: currentBalance - 342 + 128 - 567 - 289 },
                    ].map((day, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-[#111]/50 rounded-lg">
                        <span className="text-gray-400">{day.date}</span>
                        <span className={day.pnl >= 0 ? "text-green-400" : "text-red-400"}>{day.pnl >= 0 ? "+" : ""}${day.pnl}</span>
                        <span className="text-white">${day.balance.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Trades Expanded */}
            {expandedCard === "trades" && (
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#FFD700]/20 flex items-center justify-center">
                    <FiZap className="text-[#FFD700]" size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Trading Statistics</h2>
                    <p className="text-gray-400">Complete trade analysis</p>
                  </div>
                </div>

                {/* Main Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Total Trades", value: totalTrades.toString(), color: "#FFD700" },
                    { label: "Win Rate", value: `${winRate}%`, color: "#22c55e" },
                    { label: "Profit Factor", value: "2.34", color: "#22c55e" },
                    { label: "Avg RRR", value: "1:2.1", color: "#FFD700" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-gradient-to-br from-[#0a0a0a]/80 to-[#111]/60 rounded-xl p-5 border border-[#FFD700]/10 text-center">
                      <p className="text-3xl font-bold mb-2" style={{ color: stat.color }}>{stat.value}</p>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Win/Loss Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-500/5 rounded-xl p-5 border border-green-500/20">
                    <h3 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
                      <FiCheckCircle /> Winning Trades
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between"><span className="text-gray-400">Total Wins</span><span className="text-green-400">{Math.round(totalTrades * winRate / 100)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Gross Profit</span><span className="text-green-400">+$8,420</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Avg Win</span><span className="text-green-400">+$187</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Largest Win</span><span className="text-green-400">+$1,110</span></div>
                    </div>
                  </div>
                  <div className="bg-red-500/5 rounded-xl p-5 border border-red-500/20">
                    <h3 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
                      <FiXCircle /> Losing Trades
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between"><span className="text-gray-400">Total Losses</span><span className="text-red-400">{Math.round(totalTrades * (100 - winRate) / 100)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Gross Loss</span><span className="text-red-400">-$3,600</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Avg Loss</span><span className="text-red-400">-$89</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Largest Loss</span><span className="text-red-400">-$310</span></div>
                    </div>
                  </div>
                </div>

                {/* Recent Trades Table */}
                <div className="bg-[#0a0a0a]/50 rounded-xl p-5 border border-[#FFD700]/10">
                  <h3 className="text-white font-semibold mb-4">Recent Trades</h3>
                  <div className="space-y-2">
                    {sampleTrades.map((trade) => (
                      <div key={trade.id} className="flex items-center justify-between p-3 bg-[#111]/50 rounded-lg hover:bg-[#FFD700]/5 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-8 rounded-full ${trade.pnl >= 0 ? "bg-green-500" : "bg-red-500"}`} />
                          <div>
                            <p className="text-white font-medium">{trade.symbol}</p>
                            <p className="text-xs text-gray-500">{trade.type} · {trade.size} lots</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Entry</p>
                          <p className="text-white">{trade.entryPrice}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Exit</p>
                          <p className="text-white">{trade.exitPrice}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${trade.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {trade.pnl >= 0 ? "+" : ""}${trade.pnl}
                          </p>
                          <p className="text-xs text-gray-500">{trade.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Metrics Expanded */}
            {expandedCard === "metrics" && (
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#FFD700]/20 flex items-center justify-center">
                    <FiBarChart2 className="text-[#FFD700]" size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Key Metrics Details</h2>
                    <p className="text-gray-400">In-depth performance metrics</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Profit Target */}
                  <div className="bg-[#FFD700]/5 rounded-xl p-6 border border-[#FFD700]/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[#FFD700] font-semibold">Profit Target</h3>
                      <span className="text-xs bg-[#FFD700]/20 text-[#FFD700] px-2 py-1 rounded flex items-center gap-1"><FiTarget size={10} /> TARGET</span>
                    </div>
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="#1a1a1a" strokeWidth="8" fill="none" />
                        <circle cx="64" cy="64" r="56" stroke="#FFD700" strokeWidth="8" fill="none"
                          strokeDasharray={`${((totalPnL/5000) * 352)} 352`} strokeLinecap="round"
                          style={{ filter: "drop-shadow(0 0 8px #FFD700)" }} />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-[#FFD700]">{((totalPnL/5000)*100).toFixed(0)}%</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-400">Target</span><span className="text-white">$5,000 (10%)</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Current</span><span className="text-green-400">+${totalPnL.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Remaining</span><span className="text-[#FFD700]">${(5000-totalPnL).toLocaleString()}</span></div>
                    </div>
                  </div>

                  {/* Win Rate */}
                  <div className="bg-green-500/5 rounded-xl p-6 border border-green-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-green-400 font-semibold">Win Rate</h3>
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded flex items-center gap-1"><FiCheckCircle size={10} /> GOOD</span>
                    </div>
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="#1a1a1a" strokeWidth="8" fill="none" />
                        <circle cx="64" cy="64" r="56" stroke="#22c55e" strokeWidth="8" fill="none"
                          strokeDasharray={`${(winRate/100) * 352} 352`} strokeLinecap="round"
                          style={{ filter: "drop-shadow(0 0 8px #22c55e)" }} />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-green-400">{winRate}%</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-400">Total Trades</span><span className="text-white">{totalTrades}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Wins</span><span className="text-green-400">{Math.round(totalTrades * winRate / 100)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Losses</span><span className="text-red-400">{Math.round(totalTrades * (100-winRate) / 100)}</span></div>
                    </div>
                  </div>

                  {/* Drawdown */}
                  <div className="bg-orange-500/5 rounded-xl p-6 border border-orange-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-orange-400 font-semibold">Drawdown</h3>
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded flex items-center gap-1"><FiAlertTriangle size={10} /> WATCH</span>
                    </div>
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="#1a1a1a" strokeWidth="8" fill="none" />
                        <circle cx="64" cy="64" r="56" stroke="#f97316" strokeWidth="8" fill="none"
                          strokeDasharray={`${(4.8/10) * 352} 352`} strokeLinecap="round"
                          style={{ filter: "drop-shadow(0 0 8px #f97316)" }} />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-orange-400">48%</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-400">Max Allowed</span><span className="text-white">10% ($5,000)</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Current DD</span><span className="text-orange-400">4.8% ($2,400)</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Buffer Left</span><span className="text-green-400">5.2% ($2,600)</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sessions Expanded */}
            {expandedCard === "sessions" && (
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <FiGlobe className="text-blue-400" size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Session Performance</h2>
                    <p className="text-gray-400">Trading performance by market session</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { session: "London", abbr: "UK", trades: 45, wins: 32, pnl: 2450, winRate: 71, avgTrade: 54, color: "#FFD700" },
                    { session: "New York", abbr: "US", trades: 38, wins: 26, pnl: 1890, winRate: 68, avgTrade: 50, color: "#22c55e" },
                    { session: "Asian", abbr: "AS", trades: 28, wins: 18, pnl: 980, winRate: 64, avgTrade: 35, color: "#3b82f6" },
                    { session: "Sydney", abbr: "AU", trades: 16, wins: 9, pnl: 420, winRate: 56, avgTrade: 26, color: "#a855f7" },
                  ].map((session, i) => (
                    <div key={i} className="bg-[#0a0a0a]/50 rounded-xl p-5 border border-[#FFD700]/10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold" style={{ backgroundColor: `${session.color}20`, color: session.color }}>{session.abbr}</div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">{session.session} Session</h3>
                          <p className="text-xs text-gray-500">{session.trades} trades executed</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center p-3 bg-[#111]/50 rounded-lg">
                          <p className="text-lg font-bold" style={{ color: session.color }}>{session.winRate}%</p>
                          <p className="text-[10px] text-gray-500">Win Rate</p>
                        </div>
                        <div className="text-center p-3 bg-[#111]/50 rounded-lg">
                          <p className="text-lg font-bold text-green-400">+${session.pnl}</p>
                          <p className="text-[10px] text-gray-500">Total P&L</p>
                        </div>
                        <div className="text-center p-3 bg-[#111]/50 rounded-lg">
                          <p className="text-lg font-bold text-white">${session.avgTrade}</p>
                          <p className="text-[10px] text-gray-500">Avg Trade</p>
                        </div>
                      </div>
                      <div className="h-4 bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${session.winRate}%`, background: `linear-gradient(90deg, ${session.color}80, ${session.color})` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Symbols Expanded */}
            {expandedCard === "symbols" && (
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <FiActivity className="text-green-400" size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Symbol Performance</h2>
                    <p className="text-gray-400">Detailed analysis by trading instrument</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {symbolStats.map((symbol, i) => (
                    <div key={i} className="bg-[#0a0a0a]/50 rounded-xl p-5 border border-[#FFD700]/10 hover:border-[#FFD700]/30 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                            i === 0 ? "bg-[#FFD700] text-black" : i === 1 ? "bg-gray-400 text-black" : i === 2 ? "bg-amber-700 text-white" : "bg-[#1a1a1a] text-gray-400"
                          }`}>#{i + 1}</div>
                          <div>
                            <p className="text-white font-semibold text-lg">{symbol.symbol}</p>
                            <p className="text-xs text-gray-500">{symbol.trades} trades</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${symbol.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {symbol.pnl >= 0 ? "+" : ""}${symbol.pnl}
                          </p>
                          <p className="text-xs text-gray-500">{symbol.winRate}% win rate</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        <div className="text-center p-2 bg-[#111]/50 rounded-lg">
                          <p className="text-sm font-bold text-white">{symbol.trades}</p>
                          <p className="text-[10px] text-gray-500">Trades</p>
                        </div>
                        <div className="text-center p-2 bg-[#111]/50 rounded-lg">
                          <p className="text-sm font-bold text-green-400">{Math.round(symbol.trades * symbol.winRate / 100)}</p>
                          <p className="text-[10px] text-gray-500">Wins</p>
                        </div>
                        <div className="text-center p-2 bg-[#111]/50 rounded-lg">
                          <p className="text-sm font-bold text-red-400">{Math.round(symbol.trades * (100 - symbol.winRate) / 100)}</p>
                          <p className="text-[10px] text-gray-500">Losses</p>
                        </div>
                        <div className="text-center p-2 bg-[#111]/50 rounded-lg">
                          <p className="text-sm font-bold text-[#FFD700]">${Math.round(symbol.pnl / symbol.trades)}</p>
                          <p className="text-[10px] text-gray-500">Avg P&L</p>
                        </div>
                      </div>
                      <div className="h-2 bg-[#1a1a1a] rounded-full mt-4 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-[#FFD700] rounded-full" style={{ width: `${symbol.winRate}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
