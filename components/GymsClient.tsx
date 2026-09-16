"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  X,
  Target,
  List,
  Map as MapIcon,
  ChevronDown,
  RotateCcw,
  Info,
  Star,
  Footprints,
  Heart,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Wind,
  Car,
  ShowerHead,
  Activity,
  Wifi,
  UserCheck,
  Music,
} from "lucide-react";

interface GymListing {
  id: string;
  name: string;
  location: string;
  area: string;
  distance: string;
  rating: number;
  reviewsCount: number;
  price: number;
  image: string;
  isVerified: boolean;
  isOpen: boolean;
  closingTime: string;
  closingSoonText?: string;
  description: string;
  amenities: { name: string; icon: React.ElementType }[];
  extraAmenitiesCount: number;
}

const GYM_LISTINGS: GymListing[] = [
  {
    id: "1",
    name: "Iron Fitness",
    area: "Kakkanad, Kochi",
    location: "Kakkanad, Kochi",
    distance: "1.2 km",
    rating: 4.6,
    reviewsCount: 128,
    price: 150,
    image:
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
    isOpen: true,
    closingTime: "10:30 PM",
    description:
      "Well-equipped gym with modern machines, free weights, cardio & more.",
    amenities: [
      { name: "AC", icon: Wind },
      { name: "Parking", icon: Car },
      { name: "Shower", icon: ShowerHead },
      { name: "Cardio", icon: Activity },
    ],
    extraAmenitiesCount: 3,
  },
  {
    id: "2",
    name: "FitHub Kochi",
    area: "Kadavanthra, Kochi",
    location: "Kadavanthra, Kochi",
    distance: "2.1 km",
    rating: 4.7,
    reviewsCount: 96,
    price: 200,
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
    isOpen: true,
    closingTime: "11:00 PM",
    description:
      "Premium fitness studio with certified trainers and great ambiance.",
    amenities: [
      { name: "AC", icon: Wind },
      { name: "Parking", icon: Car },
      { name: "Trainer", icon: UserCheck },
      { name: "Wi-Fi", icon: Wifi },
    ],
    extraAmenitiesCount: 4,
  },
  {
    id: "3",
    name: "Body Form Gym",
    area: "Palarivattom, Kochi",
    location: "Palarivattom, Kochi",
    distance: "2.6 km",
    rating: 4.5,
    reviewsCount: 73,
    price: 120,
    image:
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
    isOpen: false,
    closingTime: "10:00 PM",
    closingSoonText: "Closes in 1h 30m",
    description:
      "Spacious gym with all essential equipment for your fitness goals.",
    amenities: [
      { name: "AC", icon: Wind },
      { name: "Shower", icon: ShowerHead },
      { name: "Parking", icon: Car },
      { name: "Cardio", icon: Activity },
    ],
    extraAmenitiesCount: 2,
  },
  {
    id: "4",
    name: "PowerZone Fitness",
    area: "Panampilly Nagar, Kochi",
    location: "Panampilly Nagar, Kochi",
    distance: "3.3 km",
    rating: 4.6,
    reviewsCount: 54,
    price: 180,
    image:
      "https://images.unsplash.com/photo-1576678927484-cc909957088c?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
    isOpen: true,
    closingTime: "10:30 PM",
    description: "Modern gym with advanced equipment and friendly staff.",
    amenities: [
      { name: "AC", icon: Wind },
      { name: "Parking", icon: Car },
      { name: "Shower", icon: ShowerHead },
      { name: "Zumba", icon: Music },
    ],
    extraAmenitiesCount: 3,
  },
];

function GymsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "Kakkanad, Kochi";

  const [searchLocation, setSearchLocation] = useState(initialQuery);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [onlyOpenNow, setOnlyOpenNow] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sortBy, setSortBy] = useState("Nearest");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleUpdateSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/gyms?q=${encodeURIComponent(searchLocation)}`);
  };

  const handleClearFilters = () => {
    setOnlyOpenNow(false);
    setOnlyVerified(false);
    setSortBy("Nearest");
    setSearchLocation("Kakkanad, Kochi");
  };

  const filteredGyms = GYM_LISTINGS.filter((gym) => {
    if (onlyOpenNow && !gym.isOpen) return false;
    if (onlyVerified && !gym.isVerified) return false;
    return true;
  });

  return (
    <div className="bg-[#f8fafc] min-h-screen py-8 text-slate-900">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Search & Action Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <form
            onSubmit={handleUpdateSearch}
            className="flex flex-col sm:flex-row items-center gap-2 w-full flex-1"
          >
            <div className="relative w-full flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 focus-within:ring-2 focus-within:ring-[#00b4d8]/40 focus-within:border-[#00b4d8]">
              <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mr-2" />
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Search area, landmark or gym name..."
                className="w-full text-slate-900 placeholder:text-slate-400 text-sm font-medium bg-transparent focus:outline-none"
              />
              {searchLocation && (
                <button
                  type="button"
                  onClick={() => setSearchLocation("")}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setSearchLocation("Kakkanad, Kochi")}
              className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 transition flex-shrink-0 cursor-pointer"
              title="Use current location"
            >
              <Target className="w-4 h-4 text-[#00b4d8]" />
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto bg-[#00b4d8] hover:bg-[#0096b4] active:scale-[0.98] text-white font-bold px-6 py-2.5 rounded-xl text-sm whitespace-nowrap shadow-sm shadow-[#00b4d8]/20 transition cursor-pointer"
            >
              Update Search
            </button>
          </form>

          {/* View Switcher (List vs Map) */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200/60 self-end md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === "list"
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200/80"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <List className="w-3.5 h-3.5 text-[#00b4d8]" />
              <span>List</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                viewMode === "map"
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200/80"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <MapIcon className="w-3.5 h-3.5 text-slate-500" />
              <span>Map</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
            <button
              type="button"
              className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition cursor-pointer"
            >
              <span>Distance</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              type="button"
              className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition cursor-pointer"
            >
              <span>Price</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => setOnlyOpenNow(!onlyOpenNow)}
              className={`border px-3.5 py-2 rounded-xl flex items-center gap-2 transition shadow-sm cursor-pointer ${
                onlyOpenNow
                  ? "bg-[#e0f7fc] border-[#00b4d8] text-[#00b4d8]"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Open Now</span>
            </button>

            <button
              type="button"
              onClick={() => setOnlyVerified(!onlyVerified)}
              className={`border px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition shadow-sm cursor-pointer ${
                onlyVerified
                  ? "bg-[#e0f7fc] border-[#00b4d8] text-[#00b4d8]"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00b4d8]" />
              <span>Verified Only</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleClearFilters}
            className="text-slate-400 hover:text-slate-700 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
          >
            <span>Clear All</span>
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        {/* Results Info & Sort Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 pb-1 border-b border-slate-200/60 text-xs">
          <div className="flex items-center gap-4 text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#00b4d8] cursor-pointer"
              >
                <option value="Nearest">Nearest</option>
                <option value="PriceLowToHigh">Price: Low to High</option>
                <option value="Rating">Top Rated</option>
              </select>
            </div>
            <span className="text-slate-300">|</span>
            <span className="font-bold text-slate-800">{filteredGyms.length * 12} gyms found</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Prices shown are day-pass rates</span>
          </div>
        </div>

        {/* Gym Listings Layout */}
        <div className="space-y-4 pt-2">
          {filteredGyms.map((gym) => {
            const isFav = !!favorites[gym.id];

            return (
              <div
                key={gym.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row group"
              >
                {/* Left Image Section */}
                <Link
                  href={`/gyms/${gym.id}`}
                  className="relative w-full md:w-80 h-52 md:h-auto bg-slate-900 flex-shrink-0 overflow-hidden cursor-pointer block"
                >
                  <img
                    src={gym.image}
                    alt={gym.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {gym.isVerified && (
                    <div className="absolute top-3 left-3 bg-[#00b4d8] text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      VERIFIED
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3">
                    {gym.isOpen ? (
                      <span className="bg-white/95 text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                        Open Now
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                        {gym.closingSoonText || "Closed"}
                      </span>
                    )}
                  </div>
                </Link>

                {/* Middle Details Section */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3 border-b md:border-b-0 md:border-r border-slate-100">
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/gyms/${gym.id}`}
                        className="text-xl font-black text-slate-900 group-hover:text-[#00b4d8] transition-colors leading-snug cursor-pointer"
                      >
                        {gym.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(gym.id)}
                        className="text-slate-400 hover:text-red-500 transition p-1 cursor-pointer"
                        aria-label="Wishlist"
                      >
                        <Heart
                          className={`w-5 h-5 ${isFav ? "fill-red-500 text-red-500" : "text-slate-400"}`}
                        />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{gym.rating} ({gym.reviewsCount})</span>
                      </div>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-600">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {gym.area}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-600">
                        <Footprints className="w-3 h-3 text-slate-400" />
                        {gym.distance}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold pt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-emerald-700">Open Now</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500 font-normal">Closes {gym.closingTime}</span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed font-normal pt-1">
                      {gym.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {gym.amenities.map((item, i) => {
                      const IconComp = item.icon;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-1 bg-slate-100/80 border border-slate-200/60 text-slate-600 px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                        >
                          <IconComp className="w-3 h-3 text-slate-500" />
                          <span>{item.name}</span>
                        </div>
                      );
                    })}

                    {gym.extraAmenitiesCount > 0 && (
                      <span className="bg-slate-100 border border-slate-200/60 text-slate-500 px-2 py-1 rounded-lg text-[11px] font-bold">
                        +{gym.extraAmenitiesCount}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Price & CTA Section */}
                <div className="p-6 md:w-56 flex flex-col justify-between items-start md:items-end text-left md:text-right bg-slate-50/50 md:bg-transparent space-y-4 flex-shrink-0">
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 font-semibold block">
                      Day Pass
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">
                        ₹{gym.price}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-medium block">
                      / Entry
                    </span>
                  </div>

                  <Link
                    href={`/gyms/${gym.id}`}
                    className="w-full bg-white hover:bg-slate-900 text-slate-800 hover:text-white border border-slate-300 font-bold py-2.5 px-4 rounded-xl transition-all text-xs flex items-center justify-center gap-1.5 shadow-sm group/btn cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform text-slate-500 group-hover:text-white" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-2 pt-6 pb-2">
          <button
            type="button"
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:border-slate-400 shadow-sm text-sm cursor-pointer"
          >
            &lt;
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition cursor-pointer ${
                currentPage === page
                  ? "bg-[#00b4d8] text-white shadow-sm shadow-[#00b4d8]/20"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              {page}
            </button>
          ))}
          <span className="text-slate-400 text-xs font-bold px-1">...</span>
          <button
            type="button"
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 font-bold text-xs flex items-center justify-center text-slate-700 hover:border-slate-300 cursor-pointer"
          >
            9
          </button>
          <button
            type="button"
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:border-slate-400 shadow-sm text-sm cursor-pointer"
          >
            &gt;
          </button>
        </div>

      </div>
    </div>
  );
}

export default function GymsClient() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading listings...</div>}>
      <GymsContent />
    </Suspense>
  );
}
