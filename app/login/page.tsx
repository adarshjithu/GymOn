"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Phone, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-slate-50 min-h-screen py-20 flex items-center justify-center text-slate-900 px-4">
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl w-full max-w-md space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#00b4d8]/10 text-[#00b4d8] mx-auto flex items-center justify-center">
            <User className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Log in to <span className="text-[#00b4d8]">GYM ON</span>
          </h1>
          <p className="text-slate-500 text-xs font-medium">
            Enter your mobile number to get instant access to your gym pass history
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
            <h3 className="font-extrabold text-emerald-800 text-lg">OTP Sent!</h3>
            <p className="text-emerald-600 text-xs">
              We sent a 6-digit verification code to <strong>+91 {phoneNumber}</strong>.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-xs font-bold text-[#00b4d8] hover:underline"
            >
              Change phone number
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (phoneNumber) setSubmitted(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter 10 digit mobile number"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00b4d8] text-sm font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#00b4d8] hover:bg-[#0096b4] text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-[#00b4d8]/25 transition flex items-center justify-center gap-2"
            >
              <span>Continue with Mobile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Gym Owner?{" "}
          <Link href="/list-your-gym" className="text-[#00b4d8] font-bold hover:underline">
            Partner Portal Login
          </Link>
        </div>

      </div>
    </div>
  );
}
