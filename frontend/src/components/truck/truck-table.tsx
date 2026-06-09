import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Truck } from "@/types";

export function TruckTable({ trucks }: { trucks: Truck[] }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-white/10 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">Fleet overview</h3>
      </div>
      <div className="divide-y divide-white/10">
        {trucks.map((truck) => (
          <div key={truck.id} className="grid gap-4 px-6 py-4 md:grid-cols-5 md:items-center">
            <div>
              <p className="text-sm font-medium text-white">{truck.truck_number}</p>
              <p className="text-xs text-slate-400">{truck.truck_type} · {truck.capacity_tons} tons</p>
            </div>
            <Badge className={truck.availability_status === "available" ? "border-pace-teal/30 bg-pace-teal/10 text-pace-teal" : ""}>{truck.availability_status}</Badge>
            <p className="text-sm text-slate-300">{truck.current_city ?? "In transit"}</p>
            <p className="text-sm text-slate-300">Rating {truck.rating.toFixed(1)}</p>
            <p className="text-sm text-slate-300">{truck.cargo_type_compatibility ?? "General"}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
