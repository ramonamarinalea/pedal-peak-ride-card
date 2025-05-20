const BASE_URL = "https://www.strava.com/api/v3";

export async function fetchStravaActivity(
  activityId: string,
  accessToken: string
) {
  const res = await fetch(`${BASE_URL}/activities/${activityId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { revalidate: 60 }, // optional: caching for 60s
  });

  if (!res.ok) {
    console.error("❌ Failed to fetch activity:", res.status, await res.text());
    throw new Error("Strava API error");
  }

  return res.json();
}

export async function fetchActivityPhotos(
  activityId: string,
  accessToken: string
) {
  const res = await fetch(`${BASE_URL}/activities/${activityId}/photos`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    console.error("❌ Failed to fetch photos:", res.status, await res.text());
    throw new Error("Strava photo fetch error");
  }

  return res.json();
}
