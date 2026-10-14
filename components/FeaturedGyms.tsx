"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Star,
  Heart,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Dumbbell,
} from "lucide-react";
import { getNearbyGyms, getGyms } from "@/app/api/client/gymApi";

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
  facilities: string[];
}

const DEFAULT_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80";

const extractFacilities = (item: any): string[] => {
  let list: string[] = [];
  if (Array.isArray(item.facilities)) {
    list = item.facilities.filter(Boolean).map(String);
  } else if (Array.isArray(item.amenities)) {
    list = item.amenities
      .map((a: any) => (typeof a === "string" ? a : a?.name))
      .filter(Boolean);
  } else if (typeof item.facility === "string") {
    list = [item.facility];
  }

  if (
    (item.isLadiesOnly || item.gender?.toLowerCase() === "female" || item.gender?.toLowerCase() === "ladies") &&
    !list.some((f) => f.toLowerCase().includes("ladies") || f.toLowerCase().includes("women"))
  ) {
    list.unshift("ladies only");
  }

  return list;
};

const DUMMY_GYMS: GymItem[] = [
  {
    id: "1",
    name: "Gold's Gym Express",
    location: "Kakkanad, Kochi",
    rating: 4.8,
    reviewsCount: 184,
    distance: "1.2 km away",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
    facilities: ["ladies only", "AC", "Personal Trainer", "Steam Bath"],
  },
  {
    id: "2",
    name: "Powerhouse Fitness Club",
    location: "Palarivattom, Kochi",
    rating: 4.6,
    reviewsCount: 142,
    distance: "2.4 km away",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
    facilities: ["Cardio Zone", "Crossfit", "Parking", "Locker Room"],
  },
  {
    id: "3",
    name: "Iron Paradise Gym",
    location: "Edappally, Kochi",
    rating: 4.9,
    reviewsCount: 210,
    distance: "3.1 km away",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
    facilities: ["Heavy Weights", "Open 24/7", "Shower", "Cardio"],
  },
  {
    id: "4",
    name: "Urban Muscle Studio",
    location: "MG Road, Kochi",
    rating: 4.7,
    reviewsCount: 95,
    distance: "3.8 km away",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
    facilities: ["Yoga Studio", "AC", "Zumba", "Juice Bar"],
  },
];

export default function FeaturedGyms() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [gyms, setGyms] = useState<GymItem[]>(DUMMY_GYMS);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const fetchGyms = async (latitude?: number, longitude?: number) => {
    // API call paused for local testing:
    // try {
    //   setLoading(true);
    //   const res = await getNearbyGyms({ latitude, longitude, limit: 4 });
    //   ...
    // } catch (err) { ... }
    setLoading(true);
    setTimeout(() => {
      setGyms(DUMMY_GYMS);
      setLoading(false);
    }, 200);
  };

  const fetchGymsBySearch = async (query: string) => {
    // API call paused for local testing:
    // try {
    //   setLoading(true);
    //   const res = await getGyms({ q: query, limit: 4 });
    //   ...
    // } catch (err) { ... }
    setLoading(true);
    setTimeout(() => {
      const q = query.toLowerCase().trim();
      if (!q) {
        setGyms(DUMMY_GYMS);
      } else {
        const filtered = DUMMY_GYMS.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.location.toLowerCase().includes(q) ||
            item.facilities.some((f) => f.toLowerCase().includes(q))
        );
        setGyms(filtered);
      }
      setLoading(false);
    }, 200);
  };

  useEffect(() => {
    // Initial load
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchGyms(latitude, longitude);
        },
        (error) => {
          console.warn("Geolocation position unavailable, loading default nearby gyms:", error);
          fetchGyms();
        },
        { timeout: 5000 }
      );
    } else {
      fetchGyms();
    }

    // Listen for location changes from Hero
    const handleLocationChange = (e: Event) => {
      const customEvt = e as CustomEvent<{ latitude: number; longitude: number }>;
      if (customEvt.detail) {
        fetchGyms(customEvt.detail.latitude, customEvt.detail.longitude);
      }
    };

    // Listen for search text typing changes from Hero
    const handleSearchChange = (e: Event) => {
      const customEvt = e as CustomEvent<{ query: string }>;
      if (customEvt.detail !== undefined) {
        const q = customEvt.detail.query;
        if (q) {
          fetchGymsBySearch(q);
        } else {
          fetchGyms();
        }
      }
    };

    window.addEventListener("gymon:location-changed", handleLocationChange);
    window.addEventListener("gymon:search-changed", handleSearchChange);

    return () => {
      window.removeEventListener("gymon:location-changed", handleLocationChange);
      window.removeEventListener("gymon:search-changed", handleSearchChange);
    };
  }, []);


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

        {/* Content Area */}
        {loading ? (
          /* Loading Skeleton Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 p-4 space-y-4 animate-pulse"
              >
                <div className="h-48 bg-slate-200 rounded-xl w-full" />
                <div className="h-5 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-1/2" />
                <div className="h-10 bg-slate-200 rounded-xl w-full mt-4" />
              </div>
            ))}
          </div>
        ) : gyms.length === 0 ? (
          /* Empty Gym Component */
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-2xl mx-auto shadow-sm space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#00b4d8]/10 text-[#00b4d8] flex items-center justify-center mx-auto">
              <Dumbbell className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                No Gyms Found Near You
              </h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                We couldn&apos;t find any active partner gyms near your current location right now. Check out all available gyms in our network!
              </p>
            </div>
            <div>
              <Link
                href="/gyms"
                className="inline-flex items-center gap-2 bg-[#00b4d8] hover:bg-[#0096b4] text-white font-extrabold px-6 py-3 rounded-xl transition-all shadow-md shadow-[#00b4d8]/20 uppercase tracking-wider text-xs"
              >
                <span>Browse All Gyms</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Cards Grid */
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {gyms.slice(0, 4).map((gym) => {
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
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        {/* Title & Facilities row */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
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

                        </div>
                      </div>

                      {/* Facilities Chips */}
                      {gym.facilities && gym.facilities.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                          {gym.facilities.slice(0, 3).map((fac, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-medium text-slate-600 bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded-md"
                            >
                              {fac}
                            </span>
                          ))}
                          {gym.facilities.length > 3 && (
                            <span className="text-[10px] font-semibold text-slate-400">
                              +{gym.facilities.length - 3}
                            </span>
                          )}
                        </div>
                      )}

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
        )}
      </div>
    </section>
  );
}
