import { AppShell } from "@/components/layout/app-shell";
import { SectionHeader } from "@/components/common/section-header";
import { Card } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <SectionHeader eyebrow="Admin" title="Platform administration" description="Manage companies, permissions, and operational guardrails from a single control surface." />
        <Card>
          <h3 className="text-lg font-semibold text-white">Access controls</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            This section is reserved for super-admin workflows such as user governance, company setup, and system settings.
          </p>
        </Card>
      </div>
    </AppShell>
  );
}
