"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Footprints, ArrowRight } from "lucide-react";
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

const extractSimilarFacilities = (item: any): string[] => {
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

interface SimilarGymsProps {
  currentGymId: string;
  latitude?: number;
  longitude?: number;
  city?: string;
}

export default function SimilarGyms({
  currentGymId,
  latitude,
  longitude,
  city,
}: SimilarGymsProps) {
  const [similarGyms, setSimilarGyms] = useState<GymItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchSimilar = async () => {
      try {
        setLoading(true);
        let res: any = null;

        if (typeof latitude === "number" && typeof longitude === "number") {
          res = await getNearbyGyms({ latitude, longitude, limit: 6 });
        } else if (city) {
          res = await getGyms({ q: city, limit: 6 });
        } else {
          res = await getNearbyGyms({ limit: 6 });
        }

        if (res && res.data && Array.isArray(res.data) && isMounted) {
          const filtered = res.data
            .filter((item: any) => {
              const itemId = item._id || item.id || "";
              return String(itemId) !== String(currentGymId);
            })
            .slice(0, 3)
            .map((item: any, idx: number) => ({
              id: item._id || item.id || String(idx + 1),
              name: item.gymName || item.name || "Gym",
              location: item.address || item.city || "Near You",
              rating: item.rating || 4.7,
              reviewsCount: item.reviewsCount || 85 + idx * 12,
              distance: item.distance ? `${item.distance} away` : `${(1.5 + idx * 0.6).toFixed(1)} km away`,
              price: item.dayPassPrice || item.price || 150,
              image:
                item.photos && item.photos.length > 0
                  ? item.photos[0]
                  : DEFAULT_FALLBACK_IMAGE,
              isVerified: item.isApproved !== undefined ? item.isApproved : true,
              facilities: extractSimilarFacilities(item),
            }));

          setSimilarGyms(filtered);
        }
      } catch (err) {
        console.error("Error fetching similar gyms:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSimilar();

    return () => {
      isMounted = false;
    };
  }, [currentGymId, latitude, longitude, city]);

  if (!loading && similarGyms.length === 0) {
    return null;
  }

  return (
    <div className="mt-14 border-t border-slate-200/80 pt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Similar Gyms Near You
        </h2>
        <Link
          href="/gyms"
          className="text-sm font-bold text-[#009fb7] hover:text-[#00899e] flex items-center gap-1.5 transition-colors cursor-pointer group"
        >
          <span>View all gyms</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-4 animate-pulse"
            >
              <div className="h-44 bg-slate-200 rounded-xl w-full" />
              <div className="h-5 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-1/2" />
              <div className="h-9 bg-slate-200 rounded-xl w-full mt-4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {similarGyms.map((gym) => (
            <div
              key={gym.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Header */}
                <Link href={`/gyms/${gym.id}`} className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden block">
                  <Image
                    src={gym.image}
                    alt={gym.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  />

                </Link>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/gyms/${gym.id}`}
                      className="font-bold text-slate-900 text-lg group-hover:text-[#009fb7] transition cursor-pointer leading-snug"
                    >
                      {gym.name}
                    </Link>
                    {gym.facilities?.find((f) => f.toLowerCase().includes("ladies") || f.toLowerCase().includes("women")) && (
                      <span className="bg-amber-300 text-slate-900 text-[11px] font-extrabold px-2.5 py-0.5 rounded-md shadow-xs border border-amber-400/80 whitespace-nowrap capitalize shrink-0">
                        ladies only
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <span className="flex items-center gap-1 text-slate-900 font-bold">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      {gym.rating}
                      <span className="text-slate-500 font-normal">
                        ({gym.reviewsCount})
                      </span>
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Footprints className="w-3.5 h-3.5 text-slate-400" />
                      {gym.distance}
                    </span>
                  </div>

                  <div className="pt-2 flex items-baseline gap-1">
                    <span className="text-xl font-black text-slate-900">
                      ₹{gym.price}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      / Entry
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Action Footer */}
              <div className="p-5 pt-0">
                <Link
                  href={`/gyms/${gym.id}`}
                  className="w-full bg-white hover:bg-slate-900 text-slate-800 hover:text-white border border-slate-200 font-bold py-2.5 px-4 rounded-xl transition-all duration-200 text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>View Details</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
