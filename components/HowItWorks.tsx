import React from "react";
import { Search, MessageSquare, Dumbbell } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Find",
      description: "Search gyms near you by area or landmark",
      icon: Search,
    },
    {
      number: "2",
      title: "Request Entry",
      description: "Send a request to the gym via WhatsApp in one tap",
      icon: MessageSquare,
    },
    {
      number: "3",
      title: "Workout",
      description: "Get confirmed and enjoy your workout",
      icon: Dumbbell,
    },
  ];

  return (
    <section id="how-it-works" className="bg-white py-20 text-slate-900">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">




        
        {/* Section Heading */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How <span className="text-[#00b4d8]">GYM ON</span> Works
          </h2>
        </div>

        {/* Steps Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Dotted Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[2px] border-t-2 border-dashed border-[#00b4d8]/40 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step) => {
              const IconComp = step.icon;

              return (
                <div
                  key={step.number}
                  className="flex flex-col items-center text-center space-y-4 group"
                >
                  {/* Circle with Icon & Badge */}
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-2 border-[#00b4d8]/40 bg-[#e0f7fc]/50 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:border-[#00b4d8] shadow-sm">
                      <IconComp className="w-10 h-10 text-[#00b4d8]" />
                    </div>

                    {/* Step Number Badge */}
                    <div className="absolute -bottom-1 -left-1 bg-[#00b4d8] text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                      {step.number}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-1.5 max-w-xs">
                    <h3 className="text-xl font-extrabold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
