import Hero from "@/components/Hero";
import FeaturedGyms, { GymItem } from "@/components/FeaturedGyms";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import GymOwnerBanner from "@/components/GymOwnerBanner";
import { getFeaturedGyms } from "./api/server/gymApis";

export const dynamic = "force-dynamic";

export default async function Home() {
  let initialFeaturedGyms: GymItem[] = [];

  try {
    const res = await getFeaturedGyms({ limit: 4 });
    if (res && res.data && Array.isArray(res.data)) {
      initialFeaturedGyms = res.data.map((item: any, idx: number) => ({
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
            : "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
        isVerified: item.isApproved !== undefined ? item.isApproved : true,
        facilities: Array.isArray(item.facilities) ? item.facilities : [],
      }));
    }
  } catch (error) {
    console.warn("Could not pre-fetch featured gyms on server:", error);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Hero />
      <HowItWorks />
      <FeaturedGyms initialGyms={initialFeaturedGyms} />
      <WhyChooseUs />
      <GymOwnerBanner />
    </div>
  );
}
