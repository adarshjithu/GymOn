"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Star,
  MapPin,
  Footprints,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle2,
  ArrowRight,
  Wind,
  Car,
  ShowerHead,
  Lock,
  Activity,
  Dumbbell,
  Users,
  Plus,
  Info,
  Calendar,
  UserCheck,
  Maximize2,
  Music,
  ExternalLink,
  X,
  Share2,
  Heart,
  Phone,
  CheckCircle,
  Clock,
} from "lucide-react";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1596357395217-80de13130e92?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?auto=format&fit=crop&w=800&q=80",
];

const SIMILAR_GYMS = [
  {
    id: "2",
    name: "FitHub Kochi",
    rating: 4.7,
    reviews: 96,
    distance: "2.1 km away",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
  },
  {
    id: "3",
    name: "Body Form Gym",
    rating: 4.5,
    reviews: 73,
    distance: "2.6 km away",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
  },
  {
    id: "4",
    name: "PowerZone Fitness",
    rating: 4.6,
    reviews: 54,
    distance: "3.3 km away",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
  },
];

interface GymDetailsClientProps {
  gymId?: string;
}

export default function GymDetailsClient({ gymId = "1" }: GymDetailsClientProps) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<1 | 2>(1);
  const [isSaved, setIsSaved] = useState(false);
  const [showMoreFacilities, setShowMoreFacilities] = useState(false);

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
      prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIdx((prev) =>
      prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1
    );
  };

  const openModal = () => {
    setIsModalOpen(true);
    setModalStep(1);
    if (!requestDate) {
      setRequestDate(getTodayString());
    }
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
      : "25 May 2025";

    const timeStr = requestTime || "6:00 PM";

    const messageText = `Hello,\n\nI found your gym on GYM ON.\nI'd like to request a Day Pass.\n\n📅 Date: ${formattedDate}\n⏰ Time: ${timeStr}\n💰 Day Pass Price: ₹150\n\nI will pay at the gym.\nPlease confirm whether entry is available.\n\nName: ${userName}\nMobile: +91 ${userPhone}`;

    const encodedText = encodeURIComponent(messageText);
    window.open(`https://api.whatsapp.com/send?phone=919876543210&text=${encodedText}`, "_blank");
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
                className={`w-3.5 h-3.5 ${
                  isSaved ? "fill-rose-500 text-rose-500" : "text-slate-400"
                }`}
              />
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: "Iron Fitness", url: window.location.href });
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
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Iron Fitness
            </h1>
            <span className="inline-flex items-center gap-1 bg-[#0f172a] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
              Verified
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-slate-600 font-medium">
            <span className="flex items-center gap-1 text-slate-900 font-bold">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              4.6
              <span className="text-slate-500 font-normal">(128 Reviews)</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-slate-400" />
              Kakkanad, Kochi
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1">
              <Footprints className="w-4 h-4 text-slate-400" />
              1.2 km
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm pt-1">
            <span className="flex items-center gap-1.5 font-bold text-emerald-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Open Now
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-medium">Closes at 10:30 PM</span>
          </div>
        </div>

        {/* Gallery & Booking Box Layout (12 cols grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Gallery Area (8 Columns) */}
          <div className="lg:col-span-8 space-y-3">
            {/* Main Stage Image */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-md group bg-slate-900">
              <Image
                src={GALLERY_IMAGES[currentImageIdx]}
                alt="Gym Interior"
                fill
                priority
                className="object-cover transition-all duration-300 cursor-pointer"
                onClick={() => setIsLightboxOpen(true)}
              />

              {/* Prev Arrow Button */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-all transform hover:scale-105 cursor-pointer z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Next Arrow Button */}
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-all transform hover:scale-105 cursor-pointer z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Counter Badge */}
              <div
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur-md text-white text-xs font-semibold px-3.5 py-1.5 rounded-full cursor-pointer hover:bg-black/90 transition shadow-md"
              >
                {currentImageIdx + 1} / {GALLERY_IMAGES.length}
              </div>
            </div>

            {/* Thumbnail Navigation Strip (6 Boxes) */}
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
              {GALLERY_IMAGES.slice(0, 5).map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentImageIdx(idx)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    currentImageIdx === idx
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

              {/* 6th Box: +8 More Overlay */}
              <div
                onClick={() => setIsLightboxOpen(true)}
                className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border-2 border-transparent group"
              >
                <Image
                  src={GALLERY_IMAGES[5]}
                  alt="More photos"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px] flex flex-col items-center justify-center text-white cursor-pointer group-hover:bg-slate-950/85 transition">
                  <span className="text-base font-extrabold tracking-tight">+8</span>
                  <span className="text-[11px] font-medium text-slate-300 -mt-0.5">More</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Booking Card (4 Columns, Sticky) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6">
              {/* Pricing Header */}
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    ₹150
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

        {/* Content Details Grid (About, Facilities, Opening Hours, Add'l Info, Location) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          
          {/* About Iron Fitness */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                About Iron Fitness
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                Iron Fitness is a premium fitness studio in Kakkanad, Kochi. We offer state-of-the-art equipment, certified trainers and a clean, comfortable environment to help you achieve your fitness goals.
              </p>
            </div>
          </div>

          {/* Facilities */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Facilities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-slate-200 transition text-center gap-1.5">
                <Wind className="w-5 h-5 text-cyan-600" />
                <span className="text-xs font-semibold text-slate-700">AC</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-slate-200 transition text-center gap-1.5">
                <Car className="w-5 h-5 text-cyan-600" />
                <span className="text-xs font-semibold text-slate-700">Parking</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-slate-200 transition text-center gap-1.5">
                <ShowerHead className="w-5 h-5 text-cyan-600" />
                <span className="text-xs font-semibold text-slate-700">Shower</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-slate-200 transition text-center gap-1.5">
                <Lock className="w-5 h-5 text-cyan-600" />
                <span className="text-xs font-semibold text-slate-700">Locker</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-slate-200 transition text-center gap-1.5">
                <Activity className="w-5 h-5 text-cyan-600" />
                <span className="text-xs font-semibold text-slate-700">Cardio Machines</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-slate-200 transition text-center gap-1.5">
                <Dumbbell className="w-5 h-5 text-cyan-600" />
                <span className="text-xs font-semibold text-slate-700">Strength Equipment</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-slate-200 transition text-center gap-1.5">
                <Users className="w-5 h-5 text-cyan-600" />
                <span className="text-xs font-semibold text-slate-700">Changing Room</span>
              </div>

              <button
                onClick={() => setShowMoreFacilities(!showMoreFacilities)}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition text-center gap-1 cursor-pointer"
              >
                <span className="text-base font-bold text-slate-900">
                  {showMoreFacilities ? "-4" : "+4"}
                </span>
                <span className="text-xs font-semibold text-slate-600">
                  {showMoreFacilities ? "Less" : "More"}
                </span>
              </button>

            </div>

            {showMoreFacilities && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 pt-3 border-t border-slate-100 animate-fadeIn">
                <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 bg-slate-50/50 text-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-700">Steam Bath</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 bg-slate-50/50 text-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-700">Personal Trainer</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 bg-slate-50/50 text-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-700">Protein Bar</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 bg-slate-50/50 text-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-700">Free Wi-Fi</span>
                </div>
              </div>
            )}
          </div>

          {/* Opening Hours */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Opening Hours</h2>
            <div className="space-y-3 text-sm font-medium">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-700">Monday - Friday</span>
                <span className="text-slate-900 font-bold">5:30 AM - 10:30 PM</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-700">Saturday</span>
                <span className="text-slate-900 font-bold">6:00 AM - 10:00 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Sunday</span>
                <span className="text-slate-900 font-bold">6:00 AM - 9:00 PM</span>
              </div>
            </div>

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
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-100 text-slate-700 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Established</div>
                  <div className="text-sm font-bold text-slate-900">2018</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-100 text-slate-700 mt-0.5">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Certified Trainers</div>
                  <div className="text-sm font-bold text-slate-900">5</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-100 text-slate-700 mt-0.5">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Gym Type</div>
                  <div className="text-sm font-bold text-slate-900">Unisex</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-100 text-slate-700 mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Crowd Level</div>
                  <div className="text-sm font-bold text-slate-900">Moderate</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-100 text-slate-700 mt-0.5">
                  <Maximize2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Area</div>
                  <div className="text-sm font-bold text-slate-900">3500 sq.ft.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-100 text-slate-700 mt-0.5">
                  <Music className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Music</div>
                  <div className="text-sm font-bold text-slate-900">Yes</div>
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
                  Iron Fitness, 2nd Floor, DD Tower, Kakkanad, Kochi, Kerala 682030
                </p>
                <a
                  href="https://maps.google.com/?q=Iron+Fitness+Kakkanad"
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
                {/* Simulated Map Visual */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-85"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80')`,
                  }}
                />
                <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px]" />
                
                {/* Simulated Map Labels */}
                <div className="absolute top-4 left-6 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-700 shadow">
                  Kakkanad Junction
                </div>
                <div className="absolute top-6 right-8 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-700 shadow">
                  Infopark
                </div>
                <div className="absolute bottom-6 left-12 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-700 shadow">
                  BgMatrix
                </div>
                <div className="absolute bottom-4 right-6 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-700 shadow">
                  Civil Station Kakkanad
                </div>

                {/* Map Red Pin Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group">
                  <div className="bg-white text-rose-600 text-xs font-black px-3 py-1 rounded-full shadow-lg border border-rose-100 flex items-center gap-1 animate-bounce">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    Iron Fitness
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
            {SIMILAR_GYMS.map((gym) => (
              <div
                key={gym.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Image Header */}
                  <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={gym.image}
                      alt={gym.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-cyan-600 transition cursor-pointer">
                        {gym.name}
                      </h3>
                      {gym.isVerified && (
                        <span className="inline-flex items-center gap-1 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                          <ShieldCheck className="w-3 h-3 text-cyan-400" />
                          Verified
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <span className="flex items-center gap-1 text-slate-900 font-bold">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        {gym.rating}
                        <span className="text-slate-500 font-normal">
                          ({gym.reviews})
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
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Sticky Bottom Viewport Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0f172a] text-white border-t border-slate-800 py-3.5 px-4 sm:px-8 shadow-2xl">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-white">₹150</span>
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
              Iron Fitness — Photo {currentImageIdx + 1} of {GALLERY_IMAGES.length}
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
              src={GALLERY_IMAGES[currentImageIdx]}
              alt="Gym Photo"
              fill
              className="object-contain"
            />

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
          </div>

          {/* Lightbox Thumbnails */}
          <div className="w-full max-w-4xl flex items-center justify-center gap-2 overflow-x-auto py-2">
            {GALLERY_IMAGES.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIdx(idx)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                  currentImageIdx === idx ? "border-cyan-400" : "border-transparent opacity-50 hover:opacity-100"
                }`}
              >
                <Image src={imgUrl} alt="Thumb" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Request for Entry Modal (2 Steps, Spacious Desktop View) */}
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
                    <Image src={GALLERY_IMAGES[0]} alt="Iron Fitness" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">Iron Fitness</h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">Kakkanad, Kochi</p>
                    <p className="text-sm font-black text-slate-900 mt-0.5">
                      ₹150 <span className="text-slate-400 font-normal text-xs">/ Entry</span>
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleStep1Submit} className="space-y-5 pt-1">
                  
                  {/* Row 1: Date & Preferred Time (2 cols on sm+) */}
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
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs sm:text-sm font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#009fb7] ${
                            errors.date ? "border-rose-500 bg-rose-50/20" : "border-slate-200"
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
                      className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#009fb7] ${
                        errors.name ? "border-rose-500 bg-rose-50/20" : "border-slate-200"
                      }`}
                    />
                    {errors.name && <p className="text-rose-500 text-xs font-semibold mt-1">{errors.name}</p>}
                  </div>

                  {/* Row 3: Mobile & Email (2 cols on sm+) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Mobile Number Field */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                        Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <div className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-3 text-xs sm:text-sm font-bold text-slate-700 flex items-center shrink-0">
                          +91 ∨
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
                          className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#009fb7] ${
                            errors.phone ? "border-rose-500 bg-rose-50/20" : "border-slate-200"
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-rose-500 text-xs font-semibold mt-1">{errors.phone}</p>}
                    </div>

                    {/* Email Field */}
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
                        className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#009fb7] ${
                          errors.email ? "border-rose-500 bg-rose-50/20" : "border-slate-200"
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
                    We'll now open WhatsApp with a pre-filled message to Iron Fitness.
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
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
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
