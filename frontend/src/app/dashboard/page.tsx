import { AppShell } from "@/components/layout/app-shell";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { RecommendationList } from "@/components/ai/recommendation-list";
import { SectionHeader } from "@/components/common/section-header";
import { StatCard } from "@/components/common/stat-card";
import { mockMetrics, mockRecommendations, mockShipments } from "@/utils/mock-data";
import { ShipmentTable } from "@/components/shipment/shipment-table";
import { DispatcherAgent } from "@/components/ai/dispatcher-agent";
import { MatchLifecycle } from "../../components/ai/match-lifecycle";
export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <DashboardHero />
        <DispatcherAgent />
        <MatchLifecycle />
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
  <StatCard
    label="Empty Miles Saved"
    value="12,430 mi"
    delta="+14.2%"
  />

  <StatCard
    label="CO₂ Reduced"
    value="8.2 Tons"
    delta="+24.1%"
  />

  <StatCard
    label="Fuel Saved"
    value="3,210 L"
    delta="+18.7%"
  />

  <StatCard
    label="Recovered Revenue"
    value="₹4.5L"
    delta="+22.4%"
  />
</section>
        <section className="space-y-5">
          <SectionHeader eyebrow="AI recommendations" title="AI Route Optimization Results" description="AI ranked trucks using route overlap, capacity utilization, detour percentage, and driver reliability." />
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
