import React from "react";
import GymsClient from "@/components/GymsClient";

export default async function GymsPage() {
  // Simulate 500ms server delay so loading.tsx skeleton displays
  await new Promise((resolve) => setTimeout(resolve, 500));

  return <GymsClient />;
}
