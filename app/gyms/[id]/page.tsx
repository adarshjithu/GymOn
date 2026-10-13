import React from "react";
import { getGymById, getNearbyGyms, getGyms } from "@/app/api/server/gymApis";
import GymDetailsClient from "@/components/GymDetailsClient";

export default async function GymDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let gymData = null;
  let similarGyms: any[] = [];

  try {
    const res = await getGymById(id);
    if (res && res.data) {
      gymData = res.data;

      // 1. Fetch nearby gyms for the "Similar Gyms Near You" section
      const lat = gymData.gpsLocation?.latitude;
      const lng = gymData.gpsLocation?.longitude;
      const nearbyRes = await getNearbyGyms({ latitude: lat, longitude: lng, limit: 10 });
      
      let list: any[] = [];
      if (nearbyRes && nearbyRes.data && Array.isArray(nearbyRes.data)) {
        list = nearbyRes.data.filter((g: any) => (g._id || g.id)?.toString() !== id.toString());
      }

      // 2. If fewer than 3 nearby gyms, fill up from all available gyms
      if (list.length < 3) {
        try {
          const allRes = await getGyms({ limit: 10 });
          if (allRes && allRes.data && Array.isArray(allRes.data)) {
            const extra = allRes.data.filter((g: any) => {
              const gId = (g._id || g.id)?.toString();
              return gId !== id.toString() && !list.some((c: any) => (c._id || c.id)?.toString() === gId);
            });
            list = [...list, ...extra];
          }
        } catch (e) {
          console.warn("Error fetching fallback gyms:", e);
        }
      }

      similarGyms = list.slice(0, 3);
    }
  } catch (error) {
    console.error(`Error fetching gym details for ID ${id}:`, error);
  }

  return <GymDetailsClient gymId={id} gym={gymData} similarGyms={similarGyms} />;
}
