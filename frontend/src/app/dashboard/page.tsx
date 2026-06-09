import { AppShell } from "@/components/layout/app-shell";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { RecommendationList } from "@/components/ai/recommendation-list";
import { SectionHeader } from "@/components/common/section-header";
import { StatCard } from "@/components/common/stat-card";
import { mockMetrics, mockRecommendations, mockShipments } from "@/utils/mock-data";
import { ShipmentTable } from "@/components/shipment/shipment-table";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <DashboardHero />
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Active trucks" value={String(mockMetrics.active_trucks)} delta="+8.4%" />
          <StatCard label="Active shipments" value={String(mockMetrics.active_shipments)} delta="+5.1%" />
          <StatCard label="Empty miles saved" value={`${mockMetrics.empty_miles_saved.toLocaleString()} mi`} delta="+14.2%" />
          <StatCard label="Fleet utilization" value={`${mockMetrics.fleet_utilization}%`} delta="+4.7%" />
        </section>
        <section className="space-y-5">
          <SectionHeader eyebrow="AI recommendations" title="Best truck matches" description="Trucks ranked by distance, capacity, availability, and rating." />
          <RecommendationList recommendations={mockRecommendations} />
        </section>
        <section className="space-y-5">
          <SectionHeader eyebrow="Operations" title="Shipment queue" description="Track the current state of your cargo requests in one place." />
          <ShipmentTable shipments={mockShipments} />
        </section>
      </div>
    </AppShell>
  );
}
