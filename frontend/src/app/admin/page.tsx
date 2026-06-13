import { AppShell } from "@/components/layout/app-shell";
import { SectionHeader } from "@/components/common/section-header";

import { ExecutiveMetrics } from "../../components/admin/executive-metrics";
import { AIFeed } from "../../components/admin/ai-feed";
import { Workflow } from "../../components/admin/workflow";

export default function AdminPage() {
  return (
    <AppShell>
      <div className="space-y-8">

        <SectionHeader
          eyebrow="PACE Command Center"
          title="AI Freight Optimization Control Tower"
          description="Monitor AI decisions, sustainability impact, and autonomous shipment matching."
        />

        <ExecutiveMetrics />

        <div className="grid gap-6 lg:grid-cols-2">
          <AIFeed />
          <Workflow />
        </div>

      </div>
    </AppShell>
  );
}