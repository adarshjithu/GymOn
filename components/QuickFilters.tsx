"use client";

import React, { useState } from "react";
import { MapPin, Wallet, Star, Clock } from "lucide-react";

interface QuickFiltersProps {
  activeFilter?: string;
  onSelectFilter?: (filterId: string) => void;
}

export default function QuickFilters({ activeFilter, onSelectFilter }: QuickFiltersProps) {
  const [selected, setSelected] = useState<string>(activeFilter || "");

  const filters = [
    {
      id: "nearby",
      title: "Nearby",
      subtitle: "Gyms close to you",
      icon: MapPin,
    },
    {
      id: "budget",
      title: "Budget",
      subtitle: "Best prices near you",
      icon: Wallet,
    },
    {
      id: "premium",
      title: "Premium",
      subtitle: "Top rated gyms",
      icon: Star,
    },
    {
      id: "opennow",
      title: "Open Now",
      subtitle: "Gyms open now",
      icon: Clock,
    },
  ];

  const handleSelect = (id: string) => {
    const next = selected === id ? "" : id;
    setSelected(next);
    if (onSelectFilter) {
      onSelectFilter(next);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-10">



      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 p-4 border border-slate-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filters.map((item) => {
            const IconComponent = item.icon;
            const isSelected = selected === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`flex items-center gap-3.5 p-3 rounded-xl transition-all text-left cursor-pointer ${isSelected
                    ? "bg-[#00b4d8]/10 ring-2 ring-[#00b4d8]"
                    : "hover:bg-slate-50"
                  }`}
              >
                <div className="w-11 h-11 rounded-full bg-[#e6f9fc] flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-5 h-5 text-[#00b4d8]" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-normal leading-tight">
                    {item.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
