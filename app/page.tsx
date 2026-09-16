import Hero from "@/components/Hero";
import QuickFilters from "@/components/QuickFilters";
import FeaturedGyms from "@/components/FeaturedGyms";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import GymOwnerBanner from "@/components/GymOwnerBanner";

// Simulated data
const MOCK_GYMS = [
  { id: 1, name: "Iron Fitness Club", rating: 4.7, reviews: 128, distance: "1.2 km", price: 150 },
  { id: 2, name: "Beast Mode Gym", rating: 4.6, reviews: 96, distance: "1.8 km", price: 200 },
  { id: 3, name: "FitHub Kochi", rating: 4.8, reviews: 203, distance: "2.3 km", price: 120 },
  { id: 4, name: "Powerhouse Gym", rating: 4.5, reviews: 87, distance: "2.6 km", price: 180 },
];

// Simulates a 500ms network/DB call
function delay<T>(data: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

async function getGyms() {
  const gyms = await delay(MOCK_GYMS, 500);
  return gyms;
}

export default async function Home() {
  const data = await getGyms();

  return (
    <div className="min-h-screen bg-slate-50">
      <Hero />
      <QuickFilters />
      <FeaturedGyms />
      <HowItWorks />
      <WhyChooseUs />
      <GymOwnerBanner />
    </div>
  );
}