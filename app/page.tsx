import Hero from "@/components/Hero";
import QuickFilters from "@/components/QuickFilters";
import FeaturedGyms from "@/components/FeaturedGyms";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import GymOwnerBanner from "@/components/GymOwnerBanner";
import { getGyms } from "./api/server/gymApis";




export default async function Home() {
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Hero />
      <HowItWorks />
      <FeaturedGyms />
      {/* <QuickFilters /> */}
      <WhyChooseUs />
      <GymOwnerBanner />
    </div>
  );
}