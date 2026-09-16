import React from "react";
import { Dumbbell, Target, ShieldCheck, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            About <span className="text-[#00b4d8]">GYM ON</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            We are on a mission to make high-quality fitness accessible to everyone, everywhere through effortless day-pass entry.
          </p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-slate-900">Our Vision</h2>
          <p className="text-slate-600 text-base leading-relaxed">
            GYM ON bridges the gap between gym enthusiasts and local fitness centers. Whether you are traveling, looking for a temporary workout spot, or testing out local gyms before committing to a membership, GYM ON gives you instant pay-per-visit freedom.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#e0f7fc] flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-[#00b4d8]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Freedom &amp; Flexibility</h3>
              <p className="text-xs text-slate-500 mt-1">
                No subscription lock-ins. Pay only when you work out.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#e0f7fc] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#00b4d8]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Verified Network</h3>
              <p className="text-xs text-slate-500 mt-1">
                Every gym on GYM ON is physically audited for hygiene &amp; equipment standards.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
