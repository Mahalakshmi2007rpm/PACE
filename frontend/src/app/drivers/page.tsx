import { AppShell } from "@/components/layout/app-shell";
import { SectionHeader } from "@/components/common/section-header";
import { DriverTable } from "@/components/driver/driver-table";
import { mockDrivers } from "@/utils/mock-data";

export default function DriversPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <SectionHeader eyebrow="Drivers" title="Driver roster" description="Keep driver profiles, phone numbers, and truck assignments organized." />
        <DriverTable drivers={mockDrivers} />
      </div>
    </AppShell>
  );
}
