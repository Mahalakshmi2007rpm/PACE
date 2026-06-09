import { AppShell } from "@/components/layout/app-shell";
import { SectionHeader } from "@/components/common/section-header";
import { TruckTable } from "@/components/truck/truck-table";
import { mockTrucks } from "@/utils/mock-data";

export default function TrucksPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <SectionHeader eyebrow="Fleet" title="Truck inventory" description="Monitor capacity, truck type, location, and availability across your fleet." />
        <TruckTable trucks={mockTrucks} />
      </div>
    </AppShell>
  );
}
