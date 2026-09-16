import React from "react";
import GymDetailsClient from "@/components/GymDetailsClient";

export default async function GymDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Simulate 500ms network / database delay so loading.tsx skeleton displays
  await new Promise((resolve) => setTimeout(resolve, 500));

  return <GymDetailsClient gymId={id} />;
}
