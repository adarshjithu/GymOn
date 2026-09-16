import React from "react";

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-slate-50 animate-pulse">
      
      {/* 1. Hero Skeleton */}
      <section className="relative bg-[#090d16] pt-12 pb-24 overflow-hidden min-h-[520px] flex items-center">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-3">
                <div className="h-12 w-3/4 bg-slate-800/80 rounded-2xl" />
                <div className="h-12 w-1/2 bg-slate-800/80 rounded-2xl" />
              </div>

              <div className="h-4 w-full max-w-xl bg-slate-800/60 rounded-lg" />

              {/* Search Box Skeleton */}
              <div className="h-14 w-full max-w-xl bg-slate-800/90 rounded-xl" />

              {/* Location pill */}
              <div className="flex items-center gap-3">
                <div className="h-6 w-40 bg-slate-800/70 rounded-full" />
                <div className="h-6 w-32 bg-slate-800/70 rounded-full" />
              </div>
            </div>

            {/* Right Card Skeleton */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="w-full max-w-[260px] h-36 bg-slate-800/80 rounded-2xl border border-slate-700/60 p-6 space-y-3" />
            </div>

          </div>
        </div>
      </section>

      {/* 2. Quick Filters Bar Skeleton */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-10">
        <div className="bg-white rounded-2xl p-4 shadow-xl border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3.5 p-3">
              <div className="w-11 h-11 rounded-full bg-slate-200 flex-shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-20 bg-slate-200 rounded-md" />
                <div className="h-3 w-28 bg-slate-100 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Featured Gyms Grid Skeleton */}
      <section className="bg-[#f8fafc] py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="h-8 w-64 bg-slate-200 rounded-xl" />
            <div className="h-6 w-28 bg-slate-200 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden space-y-4 pb-4 shadow-sm"
              >
                <div className="h-48 bg-slate-200 w-full" />
                <div className="p-4 space-y-3">
                  <div className="h-5 w-3/4 bg-slate-200 rounded-md" />
                  <div className="h-4 w-1/2 bg-slate-200 rounded-md" />
                  <div className="h-6 w-1/3 bg-slate-200 rounded-md" />
                  <div className="h-10 w-full bg-slate-200 rounded-xl mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How IT Works Skeleton */}
      <section className="bg-white py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="h-8 w-56 bg-slate-200 rounded-xl mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-slate-200" />
                <div className="h-5 w-24 bg-slate-200 rounded-md" />
                <div className="h-3 w-44 bg-slate-100 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us Skeleton */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="h-8 w-60 bg-slate-200 rounded-xl mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-200 flex-shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-24 bg-slate-200 rounded-md" />
                  <div className="h-3 w-32 bg-slate-100 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Gym Owner Banner Skeleton */}
      <section className="bg-slate-50 pb-20 pt-4">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#090e18] rounded-3xl p-8 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-slate-800" />
              <div className="space-y-2">
                <div className="h-6 w-36 bg-slate-800 rounded-md" />
                <div className="h-4 w-60 bg-slate-800/60 rounded-md" />
              </div>
            </div>
            <div className="h-12 w-36 bg-slate-800 rounded-full" />
          </div>
        </div>
      </section>

    </div>
  );
}
