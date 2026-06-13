import { AppShell } from "@/components/layout/app-shell";
import { SectionHeader } from "@/components/common/section-header";
import { StatCard } from "@/components/common/stat-card";
import { AnalyticsCharts } from "@/components/analytics/analytics-charts";
import { SustainabilityPanel } from "../../components/analytics/sustainability-panel";
import { mockMetrics } from "@/utils/mock-data";
export default function AnalyticsPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
    label="Empty Miles Prevented"
    value="12,430 mi"
    delta="+14.2%"
  />

  <StatCard
    label="Recovered Revenue"
    value="₹4.5L"
    delta="+22.4%"
  />
</section>
        
        <AnalyticsCharts />
        <SustainabilityPanel />
      </div>
    </AppShell>
  );
}
