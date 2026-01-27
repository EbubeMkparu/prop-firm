"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";

const Signin = () => {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [focusedField, setFocusedField] = React.useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,215,0,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,215,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#FFD700]/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#FFD700]/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFD700]/5 rounded-full blur-[150px]" />

      {/* Floating Particles - using fixed positions to avoid hydration mismatch */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { left: 5, top: 10, delay: 0, duration: 8 },
          { left: 15, top: 25, delay: 1.2, duration: 12 },
          { left: 25, top: 5, delay: 2.5, duration: 7 },
          { left: 35, top: 80, delay: 0.8, duration: 10 },
          { left: 45, top: 55, delay: 3.1, duration: 9 },
          { left: 55, top: 30, delay: 1.5, duration: 11 },
          { left: 65, top: 70, delay: 4.2, duration: 8 },
          { left: 75, top: 15, delay: 0.3, duration: 13 },
          { left: 85, top: 45, delay: 2.8, duration: 7 },
          { left: 95, top: 85, delay: 1.9, duration: 10 },
          { left: 10, top: 60, delay: 3.5, duration: 9 },
          { left: 20, top: 90, delay: 0.6, duration: 12 },
          { left: 30, top: 40, delay: 4.0, duration: 8 },
          { left: 40, top: 20, delay: 2.2, duration: 11 },
          { left: 50, top: 75, delay: 1.1, duration: 7 },
          { left: 60, top: 50, delay: 3.8, duration: 10 },
          { left: 70, top: 35, delay: 0.9, duration: 13 },
          { left: 80, top: 65, delay: 2.6, duration: 9 },
          { left: 90, top: 8, delay: 4.5, duration: 8 },
          { left: 98, top: 95, delay: 1.7, duration: 11 },
        ].map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#FFD700]/30 rounded-full animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <div className="relative">
              <h1 className="text-4xl font-bold text-white tracking-tight">
                Pip<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFC000]">zen</span>
              </h1>
              <div className="absolute -inset-4 bg-[#FFD700]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Link>
          <p className="text-gray-500 mt-3 text-sm tracking-wide">ELITE TRADER ACCESS</p>
        </div>

        {/* Glass Card */}
        <div className="relative">
          {/* Card Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FFD700]/20 via-[#FFD700]/10 to-[#FFD700]/20 rounded-3xl blur-sm" />

          <div className="relative bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-800/50 shadow-2xl">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white mb-2">Welcome back</h2>
              <p className="text-gray-400 text-sm">Enter your credentials to access your trading dashboard</p>
            </div>

            {/* Demo Credentials */}
            <div className="mb-6 p-3 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-xl">
              <p className="text-xs text-[#FFD700] font-medium mb-1">DEMO CREDENTIALS</p>
              <p className="text-xs text-gray-400">Email: <span className="text-white">demo@pipzen.com</span></p>
              <p className="text-xs text-gray-400">Password: <span className="text-white">demo123</span></p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="relative group">
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <div className={`relative transition-all duration-300 ${focusedField === "email" ? "scale-[1.02]" : ""}`}>
                  <div className={`absolute -inset-0.5 bg-gradient-to-r from-[#FFD700] to-[#FFC000] rounded-xl opacity-0 blur transition-opacity duration-300 ${focusedField === "email" ? "opacity-50" : "group-hover:opacity-25"}`} />
                  <div className="relative flex items-center">
                    <FiMail className="absolute left-4 text-gray-500 z-10" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="trader@example.com"
                      className="w-full bg-gray-900/80 border border-gray-700/50 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#FFD700]/50 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="relative group">
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                  Password
                </label>
                <div className={`relative transition-all duration-300 ${focusedField === "password" ? "scale-[1.02]" : ""}`}>
                  <div className={`absolute -inset-0.5 bg-gradient-to-r from-[#FFD700] to-[#FFC000] rounded-xl opacity-0 blur transition-opacity duration-300 ${focusedField === "password" ? "opacity-50" : "group-hover:opacity-25"}`} />
                  <div className="relative flex items-center">
                    <FiLock className="absolute left-4 text-gray-500 z-10" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter your password"
                      className="w-full bg-gray-900/80 border border-gray-700/50 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-[#FFD700]/50 transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-gray-500 hover:text-[#FFD700] transition-colors z-10"
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-400 cursor-pointer group">
                  <div className="relative mr-2">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="w-5 h-5 border border-gray-600 rounded bg-gray-900/50 peer-checked:bg-[#FFD700] peer-checked:border-[#FFD700] transition-all duration-200" />
                    <svg className="absolute top-1 left-1 w-3 h-3 text-black opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="group-hover:text-gray-300 transition-colors">Remember me</span>
                </label>
                <Link href="#" className="text-[#FFD700] hover:text-[#ffe44d] transition-colors font-medium">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full mt-6 group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FFD700] to-[#FFC000] rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-[#FFD700] to-[#FFC000] text-black font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#FFD700]/25 disabled:opacity-70 disabled:cursor-not-allowed">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Access Dashboard</span>
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
              <span className="px-4 text-gray-600 text-xs uppercase tracking-wider">or continue with</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-900/50 border border-gray-700/50 rounded-xl hover:bg-gray-800/50 hover:border-gray-600 transition-all duration-300 group">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" className="text-gray-400 group-hover:text-white transition-colors" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" className="text-gray-400 group-hover:text-white transition-colors" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" className="text-gray-400 group-hover:text-white transition-colors" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" className="text-gray-400 group-hover:text-white transition-colors" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-gray-400 group-hover:text-white text-sm font-medium transition-colors">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-900/50 border border-gray-700/50 rounded-xl hover:bg-gray-800/50 hover:border-gray-600 transition-all duration-300 group">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-gray-400 group-hover:text-white text-sm font-medium transition-colors">GitHub</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-gray-500 mt-8 text-sm">
              New to Pipzen?{" "}
              <Link href="/challenges" className="text-[#FFD700] hover:text-[#ffe44d] font-semibold transition-colors">
                Get Funded Today
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/" className="text-gray-600 hover:text-gray-400 transition-colors text-sm inline-flex items-center gap-2 group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Signin;
