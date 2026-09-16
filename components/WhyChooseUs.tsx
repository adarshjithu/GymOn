import React from "react";
import { ShieldCheck, Wallet, MessageSquare, MapPin } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Verified Gyms",
      description: "All gyms are verified for quality and authenticity.",
      icon: ShieldCheck,
    },
    {
      title: "Affordable Day Passes",
      description: "Pay per visit. No monthly commitment.",
      icon: Wallet,
    },
    {
      title: "Instant Connection",
      description: "Request entry via WhatsApp in just one tap.",
      icon: MessageSquare,
    },
    {
      title: "Easy Navigation",
      description: "Get directions and reach your gym with ease.",
      icon: MapPin,
    },
  ];

  return (
    <section className="bg-slate-50/70 py-16 text-slate-900 border-t border-slate-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">




        
        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why Choose <span className="text-[#00b4d8]">GYM ON</span>?
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const IconComp = feature.icon;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow duration-300 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#e0f7fc] flex items-center justify-center flex-shrink-0">
                  <IconComp className="w-6 h-6 text-[#00b4d8]" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
