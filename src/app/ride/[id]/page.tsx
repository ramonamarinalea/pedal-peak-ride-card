export const dynamic = "force-dynamic"; // 👈 FIRST LINE

import { fetchStravaActivity, fetchActivityPhotos } from "@/lib/strava";
import RideCard from "@/components/ridecard";

export default async function RidePage({ params }: { params: { id: string } }) {
  const token = process.env.STRAVA_ACCESS_TOKEN!;
  const activity = await fetchStravaActivity(params.id, token);
  const photos = await fetchActivityPhotos(params.id, token);
  const imageUrl = photos?.[0]?.urls?.[600] || null;

  return (
    <main className="flex items-center justify-center min-h-screen bg-black">
      <RideCard activity={activity} imageUrl={imageUrl} />
    </main>
  );
}
