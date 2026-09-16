"use client";

import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";


export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Contact <span className="text-[#00b4d8]">GYM ON</span>
          </h1>
          <p className="text-slate-600 text-base">
            Have a question or need assistance? Reach out to our support team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2">
            <Mail className="w-6 h-6 text-[#00b4d8] mx-auto" />
            <h4 className="font-bold text-slate-900">Email Us</h4>
            <p className="text-xs text-slate-500">support@gymon.ai.studio</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2">
            <Phone className="w-6 h-6 text-[#00b4d8] mx-auto" />
            <h4 className="font-bold text-slate-900">Call Us</h4>
            <p className="text-xs text-slate-500">+91 98765 43210</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2">
            <MapPin className="w-6 h-6 text-[#00b4d8] mx-auto" />
            <h4 className="font-bold text-slate-900">Location</h4>
            <p className="text-xs text-slate-500">Kochi, Kerala, India</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg max-w-xl mx-auto space-y-4">
          <h2 className="text-2xl font-black text-slate-900 text-center">Send Message</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00b4d8] text-sm"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00b4d8] text-sm"
              />
            </div>
            <div>
              <textarea
                rows={4}
                placeholder="Your Message..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00b4d8] text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#00b4d8] hover:bg-[#0096b4] text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-[#00b4d8]/25 transition flex items-center justify-center gap-2"
            >
              <span>Send Message</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
