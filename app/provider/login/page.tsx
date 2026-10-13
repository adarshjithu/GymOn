"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Store, ShieldCheck, Lock, Mail, ArrowRight, Info, CheckCircle2 } from "lucide-react";

export default function ProviderLoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    setIsLoggedIn(true);
  };

  return (
    <div className="bg-[#070a13] min-h-screen py-16 text-white flex flex-col justify-center items-center">
      <div className="max-w-md w-full px-4 sm:px-6 space-y-8">
        
        {/* Header Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#00b4d8]/15 border border-[#00b4d8]/30 text-[#00b4d8] text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            <Store className="w-3.5 h-3.5" />
            <span>Gym Partner Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Gym Partner Login
          </h1>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto font-medium">
            Access your gym management dashboard to update pricing, operating hours, and track day pass requests.
          </p>
        </div>

        {/* Customer vs Provider Info Banner */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-300">
          <Info className="w-4 h-4 text-[#00b4d8] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-bold text-white">Notice:</span> This login is exclusively for gym owners and partners. Customers request day passes directly without logging in.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0f172a] p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl space-y-6">
          
          {!isLoggedIn ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {error && (
                <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold p-3 rounded-xl">
                  {error}
                </div>
              )}

              {/* Email / Phone Field */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Registered Email or Phone
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="partner@gymname.com or 9876543210"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00b4d8] focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Password
                  </label>
                  <a href="#" className="text-xs text-[#00b4d8] hover:underline font-semibold">
                    Forgot?
                  </a>
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00b4d8] focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#00b4d8] hover:bg-[#0096b4] text-slate-950 font-black py-3.5 px-6 rounded-xl shadow-lg shadow-[#00b4d8]/20 transition flex items-center justify-center gap-2 text-sm cursor-pointer active:scale-[0.99]"
              >
                <span>Login to Partner Dashboard</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white">Partner Portal Access</h3>
              <p className="text-xs text-slate-400 font-medium">
                Welcome back! Redirecting to partner dashboard...
              </p>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-xs font-bold text-[#00b4d8] hover:underline cursor-pointer"
              >
                Log out
              </button>
            </div>
          )}

        </div>

        {/* New Provider CTA Card */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 text-center space-y-2">
          <p className="text-xs text-slate-400 font-semibold">New gym owner looking to partner with GYM ON?</p>
          <Link
            href="/list-your-gym"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00b4d8] hover:text-white transition cursor-pointer"
          >
            <span>Submit a Gym Listing Request</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
