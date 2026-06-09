"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

import { Card } from "@/components/ui/card";

const MapContainer = dynamic(async () => (await import("react-leaflet")).MapContainer, { ssr: false });
const TileLayer = dynamic(async () => (await import("react-leaflet")).TileLayer, { ssr: false });
const Marker = dynamic(async () => (await import("react-leaflet")).Marker, { ssr: false });
const Popup = dynamic(async () => (await import("react-leaflet")).Popup, { ssr: false });

const center: [number, number] = [51.5074, -0.1278];

export function LiveMap() {
  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Live truck tracking</h3>
          <p className="text-sm text-slate-400">Simulated GPS updates over OpenStreetMap.</p>
        </div>
        <MapPin className="h-5 w-5 text-pace-teal" />
      </div>
      <div className="h-[420px]">
        <MapContainer center={center} zoom={5} scrollWheelZoom={false} className="h-full w-full">
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.5074, -0.1278]}>
            <Popup>PACE-TRK-101 · London</Popup>
          </Marker>
          <Marker position={[52.4862, -1.8904]}>
            <Popup>PACE-TRK-205 · Birmingham</Popup>
          </Marker>
        </MapContainer>
      </div>
    </Card>
  );
}
