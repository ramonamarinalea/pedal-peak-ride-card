import PolylineCanvas from "./PolylineCanvas";

type Activity = {
  name: string;
  distance: number;
  total_elevation_gain: number;
  moving_time: number;
  average_speed?: number;
  average_watts?: number;
  map: {
    summary_polyline: string;
  };
};

export default function RideCard({
  activity,
  imageUrl,
}: {
  activity: Activity;
  imageUrl: string | null;
}) {
  return (
    <div className="relative w-[360px] h-[500px] font-sans rounded-xl overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl || "/fallback.jpg"})`,
          backgroundColor: imageUrl ? "transparent" : "#2b2b2b",
        }}
      />
      <PolylineCanvas polylineStr={activity.map.summary_polyline} />
      <div className="absolute bottom-4 left-4 z-20 text-white text-sm space-y-1 drop-shadow-lg">
        <div className="text-lg font-bold">{activity.name}</div>
        <div>{(activity.distance / 1000).toFixed(1)} km</div>
        <div>{activity.total_elevation_gain} hm</div>
        <div>{(activity.moving_time / 60).toFixed(0)} min</div>
        <div>{(activity.average_speed ?? 3.6).toFixed(1)} km/h</div>
        <div>{(activity.average_watts ?? 0).toFixed(1)} w</div>
      </div>
    </div>
  );
}
