import { AppShell } from "@/components/layout/app-shell";
import { SectionHeader } from "@/components/common/section-header";
import { StatCard } from "@/components/common/stat-card";
import { AnalyticsCharts } from "@/components/analytics/analytics-charts";
import { mockMetrics } from "@/utils/mock-data";

export default function AnalyticsPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <SectionHeader eyebrow="Analytics" title="Fleet performance and revenue" description="Use charts and KPI cards to understand utilization and business impact." />
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Active trucks" value={String(mockMetrics.active_trucks)} delta="+8.4%" />
          <StatCard label="Fleet utilization" value={`${mockMetrics.fleet_utilization}%`} delta="+4.7%" />
          <StatCard label="Empty miles saved" value={`${mockMetrics.empty_miles_saved.toLocaleString()} mi`} delta="+14.2%" />
          <StatCard label="Revenue" value={`$${mockMetrics.revenue.toLocaleString()}`} delta="+11.8%" />
        </section>
        <AnalyticsCharts />
      </div>
    </AppShell>
  );
}
