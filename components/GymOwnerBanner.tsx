import React from "react";
import Link from "next/link";
import { Store, ArrowRight } from "lucide-react";

export default function GymOwnerBanner() {
  return (
    <section className="bg-slate-50 pb-20 pt-4">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">




        
        <div className="relative bg-[#090e18] rounded-3xl p-8 sm:p-10 border border-slate-800/90 text-white overflow-hidden shadow-2xl">
          {/* Background image overlay */}
          <div
            className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none mix-blend-luminosity"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1920&q=80')`,
            }}
          />
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00b4d8]/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Left Box & Text */}
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-white text-slate-950 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Store className="w-7 h-7 text-slate-900" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Own a Gym?
                </h3>
                <p className="text-slate-300 text-sm sm:text-base font-normal">
                  Reach new customers. Increase day-pass revenue.
                </p>
              </div>
            </div>

            {/* Right Button */}
            <Link
              href="/list-your-gym"
              className="bg-[#00b4d8] hover:bg-[#0096b4] active:scale-[0.98] text-white font-extrabold px-7 py-3.5 rounded-full text-sm tracking-wide flex items-center gap-2 shadow-xl shadow-[#00b4d8]/30 transition-all duration-200 whitespace-nowrap group"
            >
              <span>List Your Gym</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}
