import React from "react";

export default function GymDetailsLoading() {
  return (
    <div className="bg-[#f8fafc] min-h-screen py-8 text-slate-900 animate-pulse pb-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Back button skeleton */}
        <div className="h-5 w-36 bg-slate-200 rounded-md" />

        {/* Title & Metadata Header Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-64 bg-slate-200 rounded-xl" />
            <div className="h-6 w-24 bg-slate-200 rounded-md" />
          </div>
          <div className="h-4 w-96 bg-slate-200 rounded-md" />
          <div className="h-4 w-48 bg-slate-200 rounded-md" />
        </div>

        {/* Main Grid: Gallery & Right Booking Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          
          {/* Gallery Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-3">
            {/* Main Photo Box */}
            <div className="aspect-[16/9] w-full bg-slate-200 rounded-2xl" />
            
            {/* Thumbnails Row */}
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[4/3] bg-slate-200 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Booking Card Right Column (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-5 shadow-sm">
              <div className="h-9 w-28 bg-slate-200 rounded-lg" />
              <div className="h-28 w-full bg-slate-100 rounded-xl" />
              <div className="h-12 w-full bg-slate-200 rounded-xl" />
            </div>
          </div>

        </div>

        {/* Two Column Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3 h-44" />
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3 h-44" />
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3 h-44" />
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3 h-44" />
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3 h-56 col-span-1 lg:col-span-2" />
        </div>

        {/* Similar Gyms Skeleton */}
        <div className="pt-8 space-y-4">
          <div className="h-7 w-56 bg-slate-200 rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-4">
                <div className="aspect-[16/10] bg-slate-200 rounded-xl" />
                <div className="h-5 w-3/4 bg-slate-200 rounded-md" />
                <div className="h-4 w-1/2 bg-slate-200 rounded-md" />
                <div className="h-9 w-full bg-slate-200 rounded-xl" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
