"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

import { Card } from "@/components/ui/card";

const MapClient = dynamic(
  () => import("./map-client"),
  {
    ssr: false,
  }
);

export function LiveMap() {
  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Live truck tracking
          </h3>

          <p className="text-sm text-slate-400">
            Simulated GPS updates over OpenStreetMap.
          </p>
        </div>

        <MapPin className="h-5 w-5 text-pace-teal" />
      </div>

      <div className="h-[420px]">
        <MapClient />
      </div>
    </Card>
  );
}