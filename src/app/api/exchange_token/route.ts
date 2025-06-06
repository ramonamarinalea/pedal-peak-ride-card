import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("❌ Token exchange failed", data);
    return NextResponse.json(
      { error: "Token exchange failed", details: data },
      { status: 500 }
    );
  }

  console.log("✅ Got tokens:", data);

  return NextResponse.redirect(
    `https://pedal-peak-ride-card.vercel.app/ride/${data.athlete.id}`
  );
}
