"use client";

import React from "react";
import Link from "next/link";
import { Store, ShieldCheck, TrendingUp, Users, ArrowRight } from "lucide-react";


export default function ListYourGymPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#00b4d8]/10 text-[#00b4d8] mx-auto flex items-center justify-center">
            <Store className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Partner with <span className="text-[#00b4d8]">GYM ON</span>
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            List your gym on India&apos;s leading day-pass fitness network and start generating extra revenue from day pass entries.
          </p>
        </div>

        {/* Benefits cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <TrendingUp className="w-8 h-8 text-[#00b4d8]" />
            <h3 className="text-lg font-extrabold text-slate-900">Increase Revenue</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Monetize un-utilized capacity with high-margin day pass visitors.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <Users className="w-8 h-8 text-[#00b4d8]" />
            <h3 className="text-lg font-extrabold text-slate-900">Attract Travelers</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Reach fitness enthusiasts, travelers, and drop-in gym lovers in your city.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <ShieldCheck className="w-8 h-8 text-[#00b4d8]" />
            <h3 className="text-lg font-extrabold text-slate-900">Zero Upfront Cost</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No registration or setup fees. Free verification for partner gyms.
            </p>
          </div>
        </div>

        {/* Lead Form */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl max-w-xl mx-auto space-y-6">
          <h2 className="text-2xl font-black text-slate-900 text-center">
            List Your Gym Today
          </h2>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Gym Name
              </label>
              <input
                type="text"
                placeholder="e.g. Iron Fitness Studio"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00b4d8] text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                City / Location
              </label>
              <input
                type="text"
                placeholder="e.g. Kakkanad, Kochi"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00b4d8] text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Owner Phone Number (WhatsApp)
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00b4d8] text-sm font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#00b4d8] hover:bg-[#0096b4] text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-[#00b4d8]/25 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Submit Listing Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Separate Existing Partner Login Section */}
        <div className="bg-[#090d16] text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl max-w-xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 bg-[#00b4d8]/15 text-[#00b4d8] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Gym Partner Access
          </div>
          
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Already a GYM ON Partner?
          </h3>
          
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md mx-auto font-medium">
            Access your dashboard to manage your gym listing, pricing, opening hours and availability.
          </p>

          <div className="pt-2">
            <Link
              href="/provider/login"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all text-sm cursor-pointer shadow-md group w-full sm:w-auto"
            >
              <span>Provider Login</span>
              <ArrowRight className="w-4 h-4 text-[#00b4d8] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
