"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Star,
  Heart,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface GymItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewsCount: number;
  distance: string;
  price: number;
  image: string;
  isVerified: boolean;
}

const GYM_DATA: GymItem[] = [
  {
    id: "1",
    name: "Iron Fitness Club",
    location: "Kakkanad, Kochi",
    rating: 4.7,
    reviewsCount: 128,
    distance: "1.2 km",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
  },
  {
    id: "2",
    name: "Beast Mode Gym",
    location: "Palarivattom, Kochi",
    rating: 4.6,
    reviewsCount: 96,
    distance: "1.8 km",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
  },
  {
    id: "3",
    name: "FitHub Kochi",
    location: "Kakkanad, Kochi",
    rating: 4.8,
    reviewsCount: 203,
    distance: "2.3 km",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
  },
  {
    id: "4",
    name: "Powerhouse Gym",
    location: "Kakkanad, Kochi",
    rating: 4.5,
    reviewsCount: 87,
    distance: "2.6 km",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1576678927484-cc909957088c?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
  },
];

export default function FeaturedGyms() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRequestEntry = (gymName: string) => {
    const text = encodeURIComponent(
      `Hi! I would like to request day pass entry for ${gymName} via GYM ON.`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <section className="bg-[#f8fafc] py-16 text-slate-900 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">



        
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Featured Gyms Near You
          </h2>

          <Link
            href="/gyms"
            className="text-sm font-bold text-slate-700 hover:text-[#00b4d8] flex items-center gap-1 transition-colors"
          >
            View All Gyms
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Carousel Grid with Side Navigation Buttons */}
        <div className="relative">
          {/* Left Arrow Button */}
          <button
            type="button"
            className="hidden xl:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-600 hover:border-slate-400 shadow-md transition"
            aria-label="Previous Gyms"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            className="hidden xl:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-600 hover:border-slate-400 shadow-md transition"
            aria-label="Next Gyms"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GYM_DATA.map((gym) => {
              const isFav = !!favorites[gym.id];

              return (
                <div
                  key={gym.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col group"
                >
                  {/* Image Container */}
                  <Link
                    href={`/gyms/${gym.id}`}
                    className="relative h-48 w-full bg-slate-900 overflow-hidden cursor-pointer block"
                  >
                    <img
                      src={gym.image}
                      alt={gym.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

                    {/* Verified Badge */}
                    {gym.isVerified && (
                      <div className="absolute top-3 left-3 bg-[#00b4d8] text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        VERIFIED
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(gym.id);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition cursor-pointer z-10"
                      aria-label="Add to Wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isFav ? "fill-red-500 text-red-500" : "text-white"
                        }`}
                      />
                    </button>
                  </Link>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <Link
                        href={`/gyms/${gym.id}`}
                        className="text-lg font-black text-slate-900 group-hover:text-[#00b4d8] transition-colors leading-snug cursor-pointer block"
                      >
                        {gym.name}
                      </Link>

                      <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500 font-medium">
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{gym.rating}</span>
                        </div>
                        <span>({gym.reviewsCount})</span>
                        <span>•</span>
                        <span>{gym.distance}</span>
                      </div>
                    </div>

                    {/* Price Row */}
                    <div className="pt-2 border-t border-slate-100 flex items-baseline gap-1">
                      <span className="text-xl font-extrabold text-[#00b4d8]">
                        ₹{gym.price}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">
                        / Entry
                      </span>
                    </div>

                    {/* Action Button */}
                    <Link
                      href={`/gyms/${gym.id}`}
                      className="w-full bg-white hover:bg-slate-900 text-slate-800 hover:text-white border border-slate-200 font-bold py-2.5 px-4 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-1.5 shadow-sm group/btn cursor-pointer"
                    >
                      <span>Request Entry</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform text-slate-400 group-hover:text-white" />
                    </Link>
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
