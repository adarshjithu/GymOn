"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Target, MapPin } from "lucide-react";

export default function Hero({ onSearch }: { onSearch?: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState("Kochi, Kerala");
  const router = useRouter();

  // Debounce search input typing to automatically trigger search without clicking button
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("gymon:search-changed", {
          detail: { query: searchQuery.trim() },
        })
      );
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
    const q = searchQuery || "Kakkanad, Kochi";
    router.push(`/gyms?q=${encodeURIComponent(q)}`);
  };


  const handleGetCurrentLocation = () => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation("Current Location");
          setIsLocating(false);

          // Dispatch custom event so FeaturedGyms (and other listeners) instantly update
          window.dispatchEvent(
            new CustomEvent("gymon:location-changed", {
              detail: { latitude, longitude },
            })
          );
        },
        (error) => {
          console.warn("Geolocation position denied or unavailable:", error);
          setIsLocating(false);
          setLocation("Kochi, Kerala");
        },
        { timeout: 8000 }
      );
    }
  };


  return (
    <section className="relative bg-[#090d16] pt-12 pb-24 overflow-hidden min-h-[520px] flex items-center">
      {/* Background Gym Banner Image from public/banner.png in full opacity */}
      <div
        className="absolute inset-0 opacity-100 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('/banner.png')`,
        }}
      />

      {/* Subtle Gradient Overlay for Text Contrast on the Left */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#090d16]/90 via-[#090d16]/50 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b4d8]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Content */}
          <div className="lg:col-span-8 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12] drop-shadow-md">
              Find the Perfect <br />
              <span className="text-white">Gym Near You</span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg max-w-xl font-normal leading-relaxed drop-shadow-sm">
              Search nearby gyms, compare day-pass prices, and request entry in minutes.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="pt-2">
              <div className="bg-white p-2 pl-4 rounded-xl shadow-2xl flex flex-col sm:flex-row items-center gap-2 max-w-xl border border-slate-100">
                <div className="flex items-center gap-3 w-full">
                  <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by area, landmark or gym name"
                    className="w-full text-slate-800 placeholder:text-slate-400 text-sm font-normal bg-transparent focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#00b4d8] hover:bg-[#0096b4] active:scale-[0.98] text-white font-extrabold px-6 py-3 rounded-lg transition-all uppercase tracking-wider text-xs whitespace-nowrap shadow-md shadow-[#00b4d8]/20"
                >
                  FIND GYMS
                </button>
              </div>
            </form>

            {/* Location Pill Bar */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold pt-1">
              <button
                type="button"
                onClick={handleGetCurrentLocation}
                className="flex items-center gap-1.5 text-[#00b4d8] hover:text-[#38bdf8] transition-colors cursor-pointer group drop-shadow-sm"
              >
                <Target className={`w-4 h-4 text-[#00b4d8] group-hover:scale-110 transition-transform ${isLocating ? 'animate-spin' : ''}`} />
                <span className="underline underline-offset-2">Use My Current Location</span>
              </button>

              <div className="flex items-center gap-1 bg-[#131b2a]/90 backdrop-blur-md border border-slate-800/80 text-slate-300 text-xs px-3 py-1 rounded-full shadow-md">
                <MapPin className="w-3.5 h-3.5 text-[#00b4d8]" />
                <span>Near: <strong className="text-white font-semibold">{location}</strong></span>
              </div>
            </div>
          </div>

          {/* Right Floating Badge Card */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div className="bg-[#101726]/75 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl shadow-2xl w-full max-w-[260px] space-y-4">
              <div className="space-y-0.5">
                <h3 className="text-xl font-black text-slate-100 tracking-wider uppercase leading-tight">
                  STRONGER
                </h3>
                <h3 className="text-xl font-black text-[#00b4d8] tracking-wider uppercase leading-tight">
                  THAN YESTERDAY
                </h3>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-0.5">
                <div className="text-[11px] text-slate-400 font-medium">
                  Verified Partner Network
                </div>
                <div className="text-xs font-bold text-slate-200">
                  Day Passes From <span className="text-[#00b4d8] font-extrabold text-sm">₹100</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
