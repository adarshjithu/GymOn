import React from "react";
import { HelpCircle } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      q: "How does a Day Pass work on GYM ON?",
      a: "Simply find a gym near you, click 'Request Entry', and send an instant WhatsApp request to the gym staff. Pay the day pass price directly at reception or online upon arrival.",
    },
    {
      q: "Do I need a monthly subscription?",
      a: "No! GYM ON is 100% pay-per-visit. There are no registration fees, monthly commitments, or hidden lock-ins.",
    },
    {
      q: "Are the prices listed accurate?",
      a: "Yes, all day-pass prices are updated directly in partnership with verified gym owners in your city.",
    },
    {
      q: "How do I list my gym on GYM ON?",
      a: "Click on 'List Your Gym' in the top navigation bar, fill out your gym details, and our team will verify your listing within 24 hours.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16 text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#00b4d8]/10 text-[#00b4d8] mx-auto flex items-center justify-center">
            <HelpCircle className="w-7 h-7" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked <span className="text-[#00b4d8]">Questions</span>
          </h1>
          <p className="text-slate-600 text-base">
            Everything you need to know about GYM ON day passes and partner gyms.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2"
            >
              <h3 className="text-lg font-extrabold text-slate-900">
                {faq.q}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
