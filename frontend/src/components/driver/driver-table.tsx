import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Driver } from "@/types";

export function DriverTable({ drivers }: { drivers: Driver[] }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-white/10 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">Driver roster</h3>
      </div>
      <div className="divide-y divide-white/10">
        {drivers.map((driver) => (
          <div key={driver.id} className="grid gap-4 px-6 py-4 md:grid-cols-4 md:items-center">
            <div>
              <p className="text-sm font-medium text-white">{driver.full_name}</p>
              <p className="text-xs text-slate-400">{driver.phone ?? "No phone recorded"}</p>
            </div>
            <Badge className={driver.is_available ? "border-pace-teal/30 bg-pace-teal/10 text-pace-teal" : ""}>{driver.is_available ? "available" : "off duty"}</Badge>
            <p className="text-sm text-slate-300">{driver.license_number}</p>
            <p className="text-sm text-slate-300">{driver.assigned_truck_id ? `Truck ${driver.assigned_truck_id}` : "Unassigned"}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
