import { AppShell } from "@/components/layout/app-shell";
import { LiveMap } from "@/components/tracking/live-map";
import { SectionHeader } from "@/components/common/section-header";
import { Card } from "@/components/ui/card";

export default function TrackingPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <SectionHeader eyebrow="Tracking" title="Live map and route visualization" description="See where trucks are now and simulate the next GPS heartbeat." />
        <LiveMap />
        <Card>
          <h3 className="text-lg font-semibold text-white">Tracking notes</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            The map is wired for Leaflet + OpenStreetMap and can be connected to live GPS updates from the backend tracking endpoints.
          </p>
        </Card>
      </div>
    </AppShell>
  );
}
