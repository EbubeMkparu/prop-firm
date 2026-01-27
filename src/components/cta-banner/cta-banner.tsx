"use client";
import React, { useState, useEffect } from "react";
import { FaRocket, FaTrophy, FaDollarSign, FaClock, FaFire, FaStar } from "react-icons/fa";

const CTABanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set countdown to next month (example: 15 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 15);
    targetDate.setHours(23, 59, 59, 999);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-yellow-600/20 to-yellow-400/10 animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-400/5 to-transparent"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-4 left-4 text-yellow-400/30 text-2xl animate-bounce">
        <FaRocket />
      </div>
      <div className="absolute top-8 right-8 text-yellow-400/30 text-3xl animate-pulse">
        <FaTrophy />
      </div>
      <div className="absolute bottom-4 left-8 text-yellow-400/30 text-2xl animate-bounce">
        <FaDollarSign />
      </div>
      <div className="absolute bottom-8 right-4 text-yellow-400/30 text-2xl animate-pulse">
        <FaFire />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaFire className="text-yellow-400 text-2xl animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              LIMITED TIME OFFER
            </h2>
            <FaFire className="text-yellow-400 text-2xl animate-pulse" />
          </div>
          <p className="text-lg text-yellow-200 mb-6">
            Join thousands of successful traders and get funded today!
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 backdrop-blur-sm border border-yellow-400/30 rounded-2xl p-6 shadow-2xl shadow-yellow-400/20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FaClock className="text-yellow-400 text-xl" />
              <span className="text-yellow-300 font-semibold">Offer Ends In:</span>
            </div>
            <div className="flex gap-4 text-center">
              <div className="bg-yellow-400/30 rounded-lg p-3 min-w-[60px]">
                <div className="text-2xl font-bold text-yellow-400">{timeLeft.days}</div>
                <div className="text-xs text-yellow-300">DAYS</div>
              </div>
              <div className="bg-yellow-400/30 rounded-lg p-3 min-w-[60px]">
                <div className="text-2xl font-bold text-yellow-400">{timeLeft.hours}</div>
                <div className="text-xs text-yellow-300">HOURS</div>
              </div>
              <div className="bg-yellow-400/30 rounded-lg p-3 min-w-[60px]">
                <div className="text-2xl font-bold text-yellow-400">{timeLeft.minutes}</div>
                <div className="text-xs text-yellow-300">MIN</div>
              </div>
              <div className="bg-yellow-400/30 rounded-lg p-3 min-w-[60px]">
                <div className="text-2xl font-bold text-yellow-400">{timeLeft.seconds}</div>
                <div className="text-xs text-yellow-300">SEC</div>
              </div>
            </div>
          </div>
        </div>

        {/* Special Offers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 backdrop-blur-sm border border-yellow-400/30 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <FaRocket className="text-yellow-400 text-3xl mx-auto mb-3" />
            <h3 className="text-xl font-bold text-yellow-300 mb-2">INSTANT FUNDING</h3>
            <p className="text-yellow-200 text-sm">Skip the evaluation and start trading immediately</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 backdrop-blur-sm border border-yellow-400/30 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <FaTrophy className="text-yellow-400 text-3xl mx-auto mb-3" />
            <h3 className="text-xl font-bold text-yellow-300 mb-2">90% PROFIT SPLIT</h3>
            <p className="text-yellow-200 text-sm">Keep up to 90% of your trading profits</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 backdrop-blur-sm border border-yellow-400/30 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <FaDollarSign className="text-yellow-400 text-3xl mx-auto mb-3" />
            <h3 className="text-xl font-bold text-yellow-300 mb-2">UP TO $200K</h3>
            <p className="text-yellow-200 text-sm">Get funded with accounts up to $200,000</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/challenges"
            className="group relative bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-4 px-8 rounded-full hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-400/30 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center gap-2">
              <FaRocket className="text-lg" />
              GET FUNDED NOW
            </span>
          </a>
          <a
            href="/giveaway"
            className="group relative border-2 border-yellow-400 text-yellow-400 font-bold py-4 px-8 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center gap-2">
              <FaStar className="text-lg" />
              JOIN GIVEAWAY
            </span>
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-8 text-yellow-300/70">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            <span className="text-sm">5000+ Funded Traders</span>
          </div>
          <div className="flex items-center gap-2">
            <FaTrophy className="text-yellow-400" />
            <span className="text-sm">$50M+ Paid Out</span>
          </div>
          <div className="flex items-center gap-2">
            <FaFire className="text-yellow-400" />
            <span className="text-sm">24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
