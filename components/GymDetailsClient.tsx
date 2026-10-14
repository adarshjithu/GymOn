"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Star,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle2,
  ArrowRight,
  Info,
  ExternalLink,
  X,
  Share2,
  Heart,
  Phone,
  Clock,
  Calendar,
  Dumbbell,
  Footprints,
} from "lucide-react";
import { getNearbyGyms, getGyms } from "@/app/api/client/gymApi";

interface GymDetailsClientProps {
  gymId?: string;
  gym?: any;
  similarGyms?: any[];
}

const DEFAULT_GYM_IMAGES = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
];

const FALLBACK_SIMILAR_GYMS = [
  {
    id: "fit-hub-kochi",
    gymName: "FitHub Kochi",
    photos: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"],
    rating: 4.7,
    reviewsCount: 96,
    distance: "2.1 km away",
    dayPassPrice: 200,
    isApproved: true,
  },
  {
    id: "body-form-gym",
    gymName: "Body Form Gym",
    photos: ["https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80"],
    rating: 4.5,
    reviewsCount: 73,
    distance: "2.6 km away",
    dayPassPrice: 120,
    isApproved: true,
  },
  {
    id: "powerzone-fitness",
    gymName: "PowerZone Fitness",
    photos: ["https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"],
    rating: 4.6,
    reviewsCount: 54,
    distance: "3.3 km away",
    dayPassPrice: 180,
    isApproved: true,
  },
];

export default function GymDetailsClient({ gymId = "1", gym, similarGyms: initialSimilarGyms = [] }: GymDetailsClientProps) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<1 | 2>(1);
  const [isSaved, setIsSaved] = useState(false);
  const [similarGymsList, setSimilarGymsList] = useState<any[]>(initialSimilarGyms);

  useEffect(() => {
    let combined = [...(initialSimilarGyms || [])];

    // If initialSimilarGyms has fewer than 3 items, fill missing slots with fallback gyms
    if (combined.length < 3) {
      const missing = FALLBACK_SIMILAR_GYMS.filter(
        (fb) => !combined.some((c: any) => (c._id || c.id)?.toString() === fb.id)
      );
      combined = [...combined, ...missing].slice(0, 3);
    }

    setSimilarGymsList(combined);
  }, [initialSimilarGyms, gymId, gym]);

  // Dynamic values extracted from server gym object
  const gymName = gym?.gymName || gym?.name || "Gym Details";
  const address = gym?.address || "";
  const city = gym?.city || "";
  const fullLocation = [address, city].filter(Boolean).join(", ");
  const dayPassPrice = gym?.dayPassPrice ?? gym?.price ?? 0;
  const description = gym?.description || "No description provided for this gym.";
  const phoneNumber = gym?.phoneNumber || "";
  const rating = gym?.rating ?? 4.5;
  const reviewsCount = gym?.reviewsCount ?? 0;
  const isVerified = gym?.isApproved !== undefined ? gym?.isApproved : true;
  const isOpen = gym?.isActive !== undefined ? gym?.isActive : true;

  const galleryImages = gym?.photos && gym.photos.length > 0 ? gym.photos : DEFAULT_GYM_IMAGES;
  const facilitiesList: string[] = gym?.facilities || [];
  const openingHours = gym?.openingHours || [];

  // Form states & validation for Request for Entry
  const [requestDate, setRequestDate] = useState("");
  const [requestTime, setRequestTime] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [errors, setErrors] = useState<{
    date?: string;
    name?: string;
    phone?: string;
    email?: string;
    privacy?: string;
  }>({});

  const getTodayString = () => new Date().toISOString().split("T")[0];
  const getMaxDateString = () => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split("T")[0];
  };

  const prevImage = () => {
    setCurrentImageIdx((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIdx((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!requestDate) {
      newErrors.date = "Please select a date";
    }

    if (!userName.trim()) {
      newErrors.name = "Please enter your name";
    }

    const cleanPhone = userPhone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    if (userEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!privacyAgreed) {
      newErrors.privacy = "You must agree to the Privacy Policy";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setModalStep(2);
  };

  const handleOpenWhatsApp = () => {
    const formattedDate = requestDate
      ? new Date(requestDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      : "Today";

    const timeStr = requestTime || "6:00 PM";
    const cleanPhone = phoneNumber.replace(/\D/g, "");
    const targetPhone = cleanPhone.length >= 10 ? cleanPhone : "919876543210";

    const messageText = `Hello,\n\nI found your gym (${gymName}) on GYM ON.\nI'd like to request a Day Pass.\n\n📅 Date: ${formattedDate}\n⏰ Time: ${timeStr}\n💰 Day Pass Price: ₹${dayPassPrice}\n\nI will pay at the gym.\nPlease confirm whether entry is available.\n\nName: ${userName}\nMobile: +91 ${userPhone}`;

    const encodedText = encodeURIComponent(messageText);
    window.open(`https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodedText}`, "_blank");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalStep(1);
    setErrors({});
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-900 pb-28 pt-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/gyms"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to results</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition cursor-pointer shadow-sm"
              title="Save to favorites"
            >
              <Heart
                className={`w-3.5 h-3.5 ${isSaved ? "fill-rose-500 text-rose-500" : "text-slate-400"
                  }`}
              />
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: gymName, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition cursor-pointer shadow-sm"
              title="Share gym"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Gym Header Title & Metadata */}
        <div className="space-y-2 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {gymName}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-slate-600 font-medium">
            <span className="flex items-center gap-1 text-slate-900 font-bold">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              {rating}
              <span className="text-slate-500 font-normal">({reviewsCount} Reviews)</span>
            </span>
            {fullLocation && (
              <>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {fullLocation}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm pt-1">
            {isOpen ? (
              <span className="flex items-center gap-1.5 font-bold text-emerald-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                Open Now
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-bold text-rose-600">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                Closed
              </span>
            )}
          </div>
        </div>

        {/* Gallery & Booking Box Layout (12 cols grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Main Gallery Area (8 Columns) */}
          <div className="lg:col-span-8 space-y-3">
            {/* Main Stage Image */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-md group bg-slate-900">
              <Image
                src={galleryImages[currentImageIdx] || galleryImages[0]}
                alt={gymName}
                fill
                priority
                className="object-cover transition-all duration-300 cursor-pointer"
                onClick={() => setIsLightboxOpen(true)}
              />

              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-all transform hover:scale-105 cursor-pointer z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-all transform hover:scale-105 cursor-pointer z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </>
              )}

              {/* Counter Badge */}
              <div
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur-md text-white text-xs font-semibold px-3.5 py-1.5 rounded-full cursor-pointer hover:bg-black/90 transition shadow-md"
              >
                {currentImageIdx + 1} / {galleryImages.length}
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-6 gap-2 sm:gap-3">
                {galleryImages.slice(0, 5).map((imgUrl: string, idx: number) => (
                  <div
                    key={idx}
                    onClick={() => setCurrentImageIdx(idx)}
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${currentImageIdx === idx
                        ? "border-cyan-500 ring-2 ring-cyan-400/40 opacity-100 scale-[0.98]"
                        : "border-transparent opacity-75 hover:opacity-100"
                      }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}

                {galleryImages.length > 5 && (
                  <div
                    onClick={() => setIsLightboxOpen(true)}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border-2 border-transparent group"
                  >
                    <Image
                      src={galleryImages[5]}
                      alt="More photos"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px] flex flex-col items-center justify-center text-white cursor-pointer group-hover:bg-slate-950/85 transition">
                      <span className="text-base font-extrabold tracking-tight">+{galleryImages.length - 5}</span>
                      <span className="text-[11px] font-medium text-slate-300 -mt-0.5">More</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Booking Card (4 Columns, Sticky) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6">
              {/* Pricing Header */}
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    ₹{dayPassPrice}
                  </span>
                  <span className="text-slate-500 font-medium text-base">/ Entry</span>
                </div>
              </div>

              {/* Feature Highlights Banner */}
              <div className="bg-[#e6f7f9] border border-[#b2ebf2] rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-[#00b4d8] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Pay at the Gym</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-[#00b4d8] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>No Membership Required</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-[#00b4d8] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>No Online Payment</span>
                </div>
              </div>

              {/* Request for Entry CTA */}
              <div className="space-y-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-[#009fb7] hover:bg-[#00899e] text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer text-base active:scale-[0.99]"
                >
                  <span>Request for Entry</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-center text-xs text-slate-400 font-medium">
                  You'll share your details next
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Content Details Grid (About, Facilities, Opening Hours, Location) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

          {/* About Gym */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                About {gymName}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                {description}
              </p>
            </div>
          </div>

          {/* Facilities */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Facilities</h2>
            {facilitiesList.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {facilitiesList.map((facility: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-slate-200 transition text-slate-700 text-xs font-semibold"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#009fb7] shrink-0" />
                    <span className="truncate">{facility}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm font-medium">No facility information provided.</p>
            )}
          </div>

          {/* Opening Hours */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Opening Hours</h2>
            {openingHours.length > 0 ? (
              <div className="space-y-3 text-sm font-medium">
                {openingHours.map((oh: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between pb-2 border-b border-slate-100 last:border-b-0">
                    <span className="text-slate-700 capitalize">{oh.day}</span>
                    <span className="text-slate-900 font-bold">
                      {oh.isClosed ? "Closed" : `${oh.open} - ${oh.close}`}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3 text-sm font-medium">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-700">Monday - Saturday</span>
                  <span className="text-slate-900 font-bold">6:00 AM - 10:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Sunday</span>
                  <span className="text-slate-900 font-bold">6:00 AM - 8:00 PM</span>
                </div>
              </div>
            )}

            <div className="mt-5 bg-[#f0f9ff] border border-sky-100 rounded-xl p-3.5 flex items-center gap-3 text-xs font-medium text-slate-700">
              <Info className="w-4 h-4 text-cyan-600 shrink-0" />
              <span>Timings may vary on public holidays.</span>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Additional Information
            </h2>
            <div className="grid grid-cols-2 gap-y-5 gap-x-6">

              {phoneNumber && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-700 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Phone</div>
                    <div className="text-sm font-bold text-slate-900">{phoneNumber}</div>
                  </div>
                </div>
              )}



              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-100 text-slate-700 mt-0.5">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Day Pass Price</div>
                  <div className="text-sm font-bold text-slate-900">₹{dayPassPrice}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-100 text-slate-700 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">City</div>
                  <div className="text-sm font-bold text-slate-900">{city || "N/A"}</div>
                </div>
              </div>

            </div>
          </div>

          {/* Location Block (Spans 2 columns on lg) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm col-span-1 lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

              <div className="md:col-span-5 space-y-4">
                <p className="text-sm font-medium text-slate-700 leading-relaxed">
                  {gymName}{fullLocation ? `, ${fullLocation}` : ""}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${gymName} ${fullLocation}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-sm transition-all cursor-pointer shadow-sm group"
                >
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition" />
                </a>
              </div>

              {/* Map Canvas Mockup */}
              <div className="md:col-span-7 relative h-52 sm:h-60 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-85"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80')`,
                  }}
                />
                <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px]" />

                {/* Map Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group">
                  <div className="bg-white text-rose-600 text-xs font-black px-3 py-1 rounded-full shadow-lg border border-rose-100 flex items-center gap-1 animate-bounce">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    {gymName}
                  </div>
                  <MapPin className="w-8 h-8 text-rose-600 fill-rose-600 drop-shadow-md -mt-1" />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Similar Gyms Near You Section */}
        <div className="mt-14">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarGymsList.slice(0, 3).map((simGym: any) => {
              const simId = simGym._id || simGym.id;
              const simName = simGym.gymName || simGym.name || "Gym";
              const simImage = (simGym.photos && simGym.photos.length > 0) ? simGym.photos[0] : DEFAULT_GYM_IMAGES[0];
              const simRating = simGym.rating ?? 4.5;
              const simReviews = simGym.reviewsCount ?? 24;
              const simDistance = simGym.distance || "Near you";
              const simPrice = simGym.dayPassPrice ?? simGym.price ?? 150;
              const simVerified = simGym.isApproved !== undefined ? simGym.isApproved : true;

              return (
                <div
                  key={simId}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={simImage}
                        alt={simName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                      />
                    </div>

                    {/* Body Content */}
                    <div className="p-5 space-y-3">
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-cyan-600 transition cursor-pointer">
                          {simName}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <span className="flex items-center gap-1 text-slate-900 font-bold">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          {simRating}
                          <span className="text-slate-500 font-normal">
                            ({simReviews})
                          </span>
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <Footprints className="w-3.5 h-3.5 text-slate-400" />
                          {simDistance}
                        </span>
                      </div>

                      <div className="pt-2 flex items-baseline gap-1">
                        <span className="text-xl font-black text-slate-900">
                          ₹{simPrice}
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
                      href={`/gyms/${simId}`}
                      className="w-full bg-white hover:bg-slate-900 text-slate-800 hover:text-white border border-slate-200 font-bold py-2.5 px-4 rounded-xl transition-all duration-200 text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Sticky Bottom Viewport Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0f172a] text-white border-t border-slate-800 py-3.5 px-4 sm:px-8 shadow-2xl">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">

          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-white">₹{dayPassPrice}</span>
              <span className="text-slate-400 text-xs font-normal">/ Entry</span>
            </div>

            <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-slate-300 pl-4 border-l border-slate-800">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                Pay at the Gym
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                No Membership
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                No Online Payment
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-[#009fb7] hover:bg-[#00899e] text-white font-bold py-2.5 px-7 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-950/40 transition-all cursor-pointer text-sm active:scale-95"
          >
            <span>Request for Entry</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      </div>

      {/* Lightbox Gallery Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-8 animate-fadeIn">
          {/* Lightbox Header */}
          <div className="w-full max-w-7xl flex items-center justify-between text-white">
            <span className="text-sm font-bold">
              {gymName} — Photo {currentImageIdx + 1} of {galleryImages.length}
            </span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Main Image */}
          <div className="relative w-full max-w-5xl aspect-[16/10] my-auto overflow-hidden rounded-2xl">
            <Image
              src={galleryImages[currentImageIdx] || galleryImages[0]}
              alt="Gym Photo"
              fill
              className="object-contain"
            />

            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md transition cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md transition cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="w-full max-w-4xl flex items-center justify-center gap-2 overflow-x-auto py-2">
              {galleryImages.map((imgUrl: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIdx(idx)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition cursor-pointer ${currentImageIdx === idx ? "border-cyan-400" : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                >
                  <Image src={imgUrl} alt="Thumb" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Request for Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-3xl max-w-md sm:max-w-xl md:max-w-2xl w-full p-6 sm:p-8 md:p-10 shadow-2xl relative animate-scaleUp max-h-[92vh] overflow-y-auto">

            <button
              onClick={closeModal}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {modalStep === 1 ? (
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center relative pb-3 border-b border-slate-100">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Request Entry</h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-0.5">Step 1 of 2</p>
                </div>

                {/* Gym Card Banner */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-200 shadow-sm">
                    <Image src={galleryImages[0]} alt={gymName} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">{gymName}</h4>
                    {fullLocation && <p className="text-xs sm:text-sm text-slate-500 font-medium">{fullLocation}</p>}
                    <p className="text-sm font-black text-slate-900 mt-0.5">
                      ₹{dayPassPrice} <span className="text-slate-400 font-normal text-xs">/ Entry</span>
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleStep1Submit} className="space-y-5 pt-1">

                  {/* Row 1: Date & Preferred Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Date Field */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                        Date <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                        <input
                          type="date"
                          min={getTodayString()}
                          max={getMaxDateString()}
                          value={requestDate}
                          onChange={(e) => {
                            setRequestDate(e.target.value);
                            if (errors.date) setErrors((prev) => ({ ...prev, date: "" }));
                          }}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs sm:text-sm font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#009fb7] ${errors.date ? "border-rose-500 bg-rose-50/20" : "border-slate-200"
                            }`}
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">You can select a date up to 14 days from today</p>
                      {errors.date && <p className="text-rose-500 text-xs font-semibold mt-1">{errors.date}</p>}
                    </div>

                    {/* Preferred Time Field */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                        Preferred Time <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <div className="relative flex items-center">
                        <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                        <select
                          value={requestTime}
                          onChange={(e) => setRequestTime(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#009fb7] cursor-pointer"
                        >
                          <option value="">Select Time</option>
                          <option value="6:00 AM">6:00 AM</option>
                          <option value="7:00 AM">7:00 AM</option>
                          <option value="8:00 AM">8:00 AM</option>
                          <option value="9:00 AM">9:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="4:00 PM">4:00 PM</option>
                          <option value="5:00 PM">5:00 PM</option>
                          <option value="6:00 PM">6:00 PM</option>
                          <option value="7:00 PM">7:00 PM</option>
                          <option value="8:00 PM">8:00 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Your Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={userName}
                      onChange={(e) => {
                        setUserName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                      }}
                      className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#009fb7] ${errors.name ? "border-rose-500 bg-rose-50/20" : "border-slate-200"
                        }`}
                    />
                    {errors.name && <p className="text-rose-500 text-xs font-semibold mt-1">{errors.name}</p>}
                  </div>

                  {/* Row 3: Mobile & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                        Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <div className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-3 text-xs sm:text-sm font-bold text-slate-700 flex items-center shrink-0">
                          +91
                        </div>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="10 digit number"
                          value={userPhone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setUserPhone(val);
                            if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                          }}
                          className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#009fb7] ${errors.phone ? "border-rose-500 bg-rose-50/20" : "border-slate-200"
                            }`}
                        />
                      </div>
                      {errors.phone && <p className="text-rose-500 text-xs font-semibold mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                        Email <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={userEmail}
                        onChange={(e) => {
                          setUserEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                        }}
                        className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#009fb7] ${errors.email ? "border-rose-500 bg-rose-50/20" : "border-slate-200"
                          }`}
                      />
                      {errors.email && <p className="text-rose-500 text-xs font-semibold mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Privacy Policy Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={privacyAgreed}
                        onChange={(e) => {
                          setPrivacyAgreed(e.target.checked);
                          if (errors.privacy) setErrors((prev) => ({ ...prev, privacy: "" }));
                        }}
                        className="w-4 h-4 rounded text-[#009fb7] focus:ring-[#009fb7] border-slate-300 cursor-pointer"
                      />
                      <span>I agree to the <span className="text-[#009fb7] font-bold underline">Privacy Policy</span></span>
                    </label>
                    {errors.privacy && <p className="text-rose-500 text-xs font-semibold mt-1">{errors.privacy}</p>}
                  </div>

                  {/* CTA Button */}
                  <div className="pt-3 text-center space-y-2">
                    <button
                      type="submit"
                      className="w-full bg-[#009fb7] hover:bg-[#00899e] text-white font-extrabold py-4 px-6 rounded-xl transition cursor-pointer text-base shadow-lg hover:shadow-cyan-950/20 active:scale-[0.99]"
                    >
                      Continue to WhatsApp
                    </button>
                    <p className="text-xs text-slate-400 font-medium">Your details will be shared with the gym via WhatsApp</p>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-4 space-y-6">
                {/* Big Green Checkmark */}
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#22c55e] text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 animate-scaleUp">
                    <Check className="w-11 h-11 stroke-[3]" />
                  </div>
                  <div className="absolute top-0 right-1 text-emerald-400 font-bold text-lg animate-pulse">✦</div>
                  <div className="absolute bottom-1 left-1 text-emerald-400 font-bold text-sm animate-pulse">✦</div>
                </div>

                {/* Title */}
                <div className="space-y-1.5">
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Your request is ready!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
                    We'll now open WhatsApp with a pre-filled message to {gymName}.
                  </p>
                </div>

                {/* What Happens Next Box */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-left space-y-3 text-xs sm:text-sm">
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">What happens next?</h4>
                  <ol className="space-y-2 text-slate-600 font-medium leading-relaxed">
                    <li>1. WhatsApp will open with your request details</li>
                    <li>2. Review the message if you wish</li>
                    <li>3. Tap send to contact the gym</li>
                    <li>4. Pay at the gym. No online payment.</li>
                  </ol>
                </div>

                {/* Buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={handleOpenWhatsApp}
                    className="w-full bg-[#009fb7] hover:bg-[#00899e] text-white font-extrabold py-4 px-6 rounded-xl flex items-center justify-center gap-2.5 shadow-xl hover:shadow-cyan-950/30 transition cursor-pointer text-base"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>Open WhatsApp</span>
                  </button>

                  <button
                    onClick={closeModal}
                    className="text-xs sm:text-sm font-bold text-[#009fb7] hover:text-[#00899e] hover:underline transition cursor-pointer block mx-auto pt-1"
                  >
                    Back to Gym Details
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
