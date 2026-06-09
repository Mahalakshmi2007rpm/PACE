"use client";

import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { SectionHeader } from "@/components/common/section-header";
import { ShipmentForm } from "@/components/shipment/shipment-form";
import { ShipmentTable } from "@/components/shipment/shipment-table";
import { fetchShipments } from "@/services/shipment";
import type { Shipment } from "@/types";
import { mockShipments } from "@/utils/mock-data";

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const data = await fetchShipments();
        if (active) {
          setShipments(data);
          setLoadError(null);
        }
      } catch {
        if (active) {
          setShipments(mockShipments);
          setLoadError("Using demo shipment data. Sign in to load live data.");
        }
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  const tableShipments = useMemo(() => (shipments.length ? shipments : mockShipments), [shipments]);

  return (
    <AppShell>
      <div className="space-y-8">
        <SectionHeader eyebrow="Shipments" title="Create and manage cargo requests" description="Capture pickup details, destination, cargo type, and shipment status in a single workflow." />
        <ShipmentForm onCreated={(shipment) => setShipments((prev) => [shipment, ...prev])} />
        {loadError ? <p className="text-sm text-pace-amber">{loadError}</p> : null}
        <ShipmentTable shipments={tableShipments} />
      </div>
    </AppShell>
  );
}
