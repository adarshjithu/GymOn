import React from "react";

export default function GymsLoading() {
  return (
    <div className="bg-[#f8fafc] min-h-screen py-8 text-slate-900 animate-pulse">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Search Bar Skeleton */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="h-11 w-full flex-1 bg-slate-100 rounded-xl" />
          <div className="h-10 w-28 bg-slate-100 rounded-xl flex-shrink-0" />
        </div>

        {/* Filter Controls Row Skeleton */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-3">
            <div className="h-9 w-24 bg-slate-200 rounded-xl" />
            <div className="h-9 w-20 bg-slate-200 rounded-xl" />
            <div className="h-9 w-28 bg-slate-200 rounded-xl" />
            <div className="h-9 w-32 bg-slate-200 rounded-xl" />
          </div>
          <div className="h-6 w-20 bg-slate-200 rounded-md" />
        </div>

        {/* Results Counter Skeleton */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="h-5 w-44 bg-slate-200 rounded-md" />
          <div className="h-4 w-48 bg-slate-200 rounded-md" />
        </div>

        {/* Horizontal Gym Cards Skeleton List */}
        <div className="space-y-4 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col md:flex-row items-stretch gap-5 shadow-sm min-h-[190px]"
            >
              {/* Left Image Skeleton */}
              <div className="w-full md:w-80 h-48 md:h-auto bg-slate-200 rounded-xl flex-shrink-0" />

              {/* Middle Details Skeleton */}
              <div className="flex-1 space-y-3 py-1">
                <div className="h-6 w-1/3 bg-slate-200 rounded-md" />
                <div className="h-4 w-1/2 bg-slate-200 rounded-md" />
                <div className="h-4 w-1/4 bg-slate-200 rounded-md" />
                <div className="h-3 w-4/5 bg-slate-100 rounded-md" />

                {/* Amenities Badges */}
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-6 w-14 bg-slate-100 rounded-lg" />
                  <div className="h-6 w-16 bg-slate-100 rounded-lg" />
                  <div className="h-6 w-16 bg-slate-100 rounded-lg" />
                  <div className="h-6 w-14 bg-slate-100 rounded-lg" />
                </div>
              </div>

              {/* Right Price & Button Skeleton */}
              <div className="w-full md:w-52 flex flex-col justify-between items-start md:items-end space-y-4 pt-2">
                <div className="space-y-1">
                  <div className="h-3 w-16 bg-slate-200 rounded-md" />
                  <div className="h-8 w-24 bg-slate-200 rounded-lg" />
                </div>
                <div className="h-10 w-full bg-slate-200 rounded-xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center gap-2 pt-6">
          {[1, 2, 3, 4, 5].map((p) => (
            <div key={p} className="w-9 h-9 bg-slate-200 rounded-xl" />
          ))}
        </div>

      </div>
    </div>
  );
}
