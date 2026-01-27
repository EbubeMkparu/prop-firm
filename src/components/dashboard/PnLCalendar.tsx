"use client";

import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface DayData {
  date: string;
  pnl: number;
  trades: number;
}

interface PnLCalendarProps {
  data: DayData[];
}

export default function PnLCalendar({ data }: PnLCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    pnl: number;
    trades: number;
    x: number;
    y: number;
  } | null>(null);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get days in current month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create calendar grid
  const calendarDays = [];

  // Empty cells before first day
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayData = data.find((d) => d.date === dateStr);
    calendarDays.push({
      day,
      date: dateStr,
      pnl: dayData?.pnl || 0,
      trades: dayData?.trades || 0,
    });
  }

  const getPnLStyle = (pnl: number, trades: number) => {
    if (trades === 0) return "bg-[#1a1a1a] text-gray-600 hover:bg-[#252525]";

    if (pnl > 0) {
      if (pnl > 500) return "bg-green-500 text-white shadow-lg shadow-green-500/30 hover:bg-green-400";
      if (pnl > 200) return "bg-green-500/80 text-white hover:bg-green-500";
      if (pnl > 50) return "bg-green-500/60 text-white hover:bg-green-500/80";
      return "bg-green-500/40 text-green-100 hover:bg-green-500/60";
    } else if (pnl < 0) {
      if (pnl < -500) return "bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-400";
      if (pnl < -200) return "bg-red-500/80 text-white hover:bg-red-500";
      if (pnl < -50) return "bg-red-500/60 text-white hover:bg-red-500/80";
      return "bg-red-500/40 text-red-100 hover:bg-red-500/60";
    }
    return "bg-gray-500/30 text-gray-400 hover:bg-gray-500/50";
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(year, month + direction, 1));
  };

  // Calculate monthly stats
  const monthData = data.filter((d) => {
    const date = new Date(d.date);
    return date.getMonth() === month && date.getFullYear() === year;
  });

  const totalPnL = monthData.reduce((sum, d) => sum + d.pnl, 0);
  const totalTrades = monthData.reduce((sum, d) => sum + d.trades, 0);
  const profitDays = monthData.filter((d) => d.pnl > 0).length;
  const lossDays = monthData.filter((d) => d.pnl < 0).length;
  const tradingDays = monthData.filter((d) => d.trades > 0).length;
  const winRate = tradingDays > 0 ? (profitDays / tradingDays) * 100 : 0;
  const bestDay = Math.max(...monthData.map((d) => d.pnl), 0);

  const handleMouseEnter = (e: React.MouseEvent, dayInfo: { date: string; pnl: number; trades: number }) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredDay({
      ...dayInfo,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  return (
    <div className="bg-[#0c0c0c] rounded-2xl border border-[#1a1a1a]">
      {/* Header */}
      <div className="p-5 border-b border-[#1a1a1a]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Trading Calendar</h3>
            <p className="text-xs text-gray-500 mt-0.5">Daily profit & loss overview</p>
          </div>

          {/* Month Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] text-gray-400 hover:text-white transition-all"
            >
              <FiChevronLeft size={18} />
            </button>
            <span className="text-white font-semibold min-w-[140px] text-center">
              {monthNames[month]} {year}
            </span>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] text-gray-400 hover:text-white transition-all"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Monthly Summary Stats */}
        <div className="grid grid-cols-6 gap-3">
          <div className="bg-[#111] rounded-xl p-3 text-center">
            <p className={`text-lg font-bold ${totalPnL >= 0 ? "text-green-500" : "text-red-500"}`}>
              {totalPnL >= 0 ? "+" : ""}${totalPnL.toLocaleString()}
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">Month P&L</p>
          </div>
          <div className="bg-[#111] rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-white">{totalTrades}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Total Trades</p>
          </div>
          <div className="bg-[#111] rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-[#FFD700]">{winRate.toFixed(0)}%</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Win Rate</p>
          </div>
          <div className="bg-[#111] rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-green-500">{profitDays}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Green Days</p>
          </div>
          <div className="bg-[#111] rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-red-500">{lossDays}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Red Days</p>
          </div>
          <div className="bg-[#111] rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-green-500">+${bestDay.toLocaleString()}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Best Day</p>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-5">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((dayInfo, index) => {
            if (!dayInfo) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const isToday = dayInfo.date === new Date().toISOString().split("T")[0];
            const isWeekend = index % 7 === 0 || index % 7 === 6;

            return (
              <div
                key={dayInfo.date}
                onMouseEnter={(e) => handleMouseEnter(e, dayInfo)}
                onMouseLeave={() => setHoveredDay(null)}
                className={`
                  aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer
                  transition-all duration-200 hover:scale-110 hover:z-10 relative
                  ${getPnLStyle(dayInfo.pnl, dayInfo.trades)}
                  ${isToday ? "ring-2 ring-[#FFD700] ring-offset-2 ring-offset-[#0c0c0c]" : ""}
                `}
              >
                <span className={`text-sm font-medium ${isWeekend && dayInfo.trades === 0 ? "text-gray-600" : ""}`}>
                  {dayInfo.day}
                </span>
                {dayInfo.trades > 0 && (
                  <span className="text-[10px] font-semibold mt-0.5">
                    {dayInfo.pnl >= 0 ? "+" : ""}${Math.abs(dayInfo.pnl) >= 1000
                      ? `${(dayInfo.pnl / 1000).toFixed(1)}k`
                      : dayInfo.pnl}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="px-5 py-3 border-t border-[#1a1a1a] bg-[#0a0a0a] rounded-b-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#1a1a1a]"></span>
              No trades
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-green-500/40"></span>
              Small profit
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-green-500"></span>
              Big profit
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-red-500/40"></span>
              Small loss
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-red-500"></span>
              Big loss
            </span>
          </div>
          <p className="text-xs text-gray-500">
            {tradingDays} trading days this month
          </p>
        </div>
      </div>

      {/* Floating Tooltip */}
      {hoveredDay && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: hoveredDay.x,
            top: hoveredDay.y - 10,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-3 shadow-2xl min-w-[160px]">
            <p className="text-xs text-gray-400 mb-2">{hoveredDay.date}</p>
            {hoveredDay.trades > 0 ? (
              <>
                <p className={`text-xl font-bold ${hoveredDay.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {hoveredDay.pnl >= 0 ? "+" : ""}${hoveredDay.pnl.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">{hoveredDay.trades} trade{hoveredDay.trades > 1 ? "s" : ""}</p>
              </>
            ) : (
              <p className="text-sm text-gray-500">No trades this day</p>
            )}
          </div>
          {/* Arrow */}
          <div className="w-3 h-3 bg-[#1a1a1a] border-r border-b border-[#333] rotate-45 mx-auto -mt-1.5"></div>
        </div>
      )}
    </div>
  );
}
