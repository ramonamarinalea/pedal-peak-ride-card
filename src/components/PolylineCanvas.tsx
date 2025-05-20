"use client";

import { useRef, useEffect } from "react";
import polyline from "@mapbox/polyline";

interface Props {
  polylineStr: string;
}

export default function PolylineCanvas({ polylineStr }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!polylineStr) return;

    const coords: [number, number][] = polyline.decode(polylineStr);
    const canvas = canvasRef.current;
    if (!canvas || coords.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const padding = 10;
    const width = canvas.width;
    const height = canvas.height;

    const lats = coords.map((c) => c[0]);
    const lons = coords.map((c) => c[1]);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);

    const scaleX = (width - 2 * padding) / (maxLon - minLon);
    const scaleY = (height - 2 * padding) / (maxLat - minLat);
    const scale = Math.min(scaleX, scaleY);

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();

    coords.forEach(([lat, lon]: [number, number], i: number) => {
      const x = (lon - minLon) * scale + padding;
      const y = height - ((lat - minLat) * scale + padding);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.stroke();
  }, [polylineStr]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={500}
      className="absolute top-0 left-0 z-10 pointer-events-none"
    />
  );
}
