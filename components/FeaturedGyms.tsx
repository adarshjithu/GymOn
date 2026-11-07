"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Star,
  Heart,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Dumbbell,
} from "lucide-react";
import { getFeaturedGyms, getGyms } from "@/app/api/client/gymApi";

export interface GymItem {
  id: string;
  slug?: string;
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

const mapRawGymToItem = (item: any, idx: number): GymItem => ({
  id: item._id?.toString() || item.id || String(idx + 1),
  slug: item.slug || item._id?.toString() || item.id || String(idx + 1),
  name: item.gymName || item.name || "Gym",
  location: [item.address, item.city].filter(Boolean).join(", ") || item.city || item.address || "Near You",
  rating: item.rating ?? 4.8,
  reviewsCount: item.reviewsCount ?? (100 + idx * 24),
  distance: item.distance ? `${item.distance} away` : `${(1.2 + idx * 0.5).toFixed(1)} km away`,
  price: item.dayPassPrice ?? item.price ?? 150,
  image:
    item.photos && item.photos.length > 0
      ? item.photos[0]
      : DEFAULT_FALLBACK_IMAGE,
  isVerified: item.isApproved !== undefined ? item.isApproved : true,
  facilities: extractFacilities(item),
});

interface FeaturedGymsProps {
  initialGyms?: GymItem[];
}

export default function FeaturedGyms({ initialGyms = [] }: FeaturedGymsProps) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [gyms, setGyms] = useState<GymItem[]>(initialGyms);
  const [loading, setLoading] = useState<boolean>(false);
  const hasAttemptedFetch = useRef(false);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    if (initialGyms && initialGyms.length > 0) {
      setGyms(initialGyms);
    }
  }, [initialGyms]);

  const fetchGyms = async (latitude?: number, longitude?: number, silent = false) => {
    try {
      if (!silent) {
        setLoading(true);
      }
      const res = await getFeaturedGyms({ latitude, longitude, limit: 4 });
      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        const formatted = res.data.map((item: any, idx: number) => mapRawGymToItem(item, idx));
        setGyms(formatted);
      } else if (!silent) {
        setGyms([]);
      }
    } catch (err) {
      console.error("Failed to fetch dynamic featured gyms:", err);
      if (!silent) {
        setGyms((prev) => (prev.length > 0 ? prev : []));
      }
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  };

  const fetchGymsBySearch = async (query: string) => {
    try {
      setLoading(true);
      const res = await getGyms({ q: query, limit: 4 });
      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        const formatted = res.data.map((item: any, idx: number) => mapRawGymToItem(item, idx));
        setGyms(formatted);
      } else {
        setGyms([]);
      }
    } catch (err) {
      console.error("Failed to search gyms:", err);
      setGyms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only attempt initial fetch if SSR provided no gyms and we haven't fetched yet
    if (gyms.length === 0 && !hasAttemptedFetch.current) {
      hasAttemptedFetch.current = true;
      fetchGyms();
    }

    // If geolocation is available, refine gyms based on coordinates silently in background
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchGyms(latitude, longitude, true);
        },
        (error) => {
          // If geolocation was denied or timed out, keep initial gyms
        },
        { timeout: 5000 }
      );
    }

    // Listen for location changes from Hero component (e.g. "Use My Current Location" button)
    const handleLocationChange = (e: Event) => {
      const customEvt = e as CustomEvent<{ latitude: number; longitude: number }>;
      if (customEvt.detail) {
        fetchGyms(customEvt.detail.latitude, customEvt.detail.longitude, false);
      }
    };

    // Listen for search text changes from Hero component
    const handleSearchChange = (e: Event) => {
      const customEvt = e as CustomEvent<{ query: string }>;
      if (customEvt.detail !== undefined) {
        const q = customEvt.detail.query;
        if (q) {
          fetchGymsBySearch(q);
        } else if (gyms.length === 0) {
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {gyms.slice(0, 4).map((gym) => {
                const isFav = !!favorites[gym.id];
                const gymLink = `/gyms/${encodeURIComponent(gym.slug || gym.id)}`;

                return (
                  <div
                    key={gym.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col group"
                  >
                    {/* Image Container */}
                    <Link
                      href={gymLink}
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
                              href={gymLink}
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
                        href={gymLink}
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
