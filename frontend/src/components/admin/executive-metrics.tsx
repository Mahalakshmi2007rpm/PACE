import { StatCard } from "@/components/common/stat-card";

export function ExecutiveMetrics() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="AI Matches"
        value="1,248"
        delta="+22%"
      />

      <StatCard
        label="CO₂ Reduced"
        value="8.2 Tons"
        delta="+24%"
      />

      <StatCard
        label="Revenue Recovered"
        value="₹4.5L"
        delta="+18%"
      />

      <StatCard
        label="Carbon Efficiency"
        value="94/100"
        delta="+9%"
      />
    </section>
  );
}