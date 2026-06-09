import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Shipment } from "@/types";

export function ShipmentTable({ shipments }: { shipments: Shipment[] }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-white/10 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">Shipment requests</h3>
      </div>
      <div className="divide-y divide-white/10">
        {shipments.map((shipment) => (
          <div key={shipment.id} className="grid gap-4 px-6 py-4 md:grid-cols-5 md:items-center">
            <div>
              <p className="text-sm font-medium text-white">{shipment.origin} → {shipment.destination}</p>
              <p className="text-xs text-slate-400">{shipment.cargo_type} · {shipment.cargo_weight_tons} tons</p>
            </div>
            <Badge>{shipment.status}</Badge>
            <p className="text-sm text-slate-300">Match {shipment.match_score ? `${shipment.match_score.toFixed(1)}%` : "pending"}</p>
            <p className="text-sm text-slate-300">Profit {shipment.estimated_profit ? `$${shipment.estimated_profit.toLocaleString()}` : "-"}</p>
            <p className="text-sm text-slate-300">Saved {shipment.estimated_empty_miles_saved ? `${shipment.estimated_empty_miles_saved} mi` : "-"}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
