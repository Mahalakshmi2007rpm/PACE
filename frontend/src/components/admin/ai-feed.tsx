import { Card } from "@/components/ui/card";

export function AIFeed() {
  const events = [
    "Truck PACE-101 completed delivery",
    "Empty capacity detected",
    "AI found compatible shipment",
    "Route overlap calculated: 92%",
    "Driver notified",
    "Shipment accepted",
  ];

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white">
        Live AI Activity Feed
      </h3>

      <div className="mt-4 space-y-3">
        {events.map((event, index) => (
          <div
            key={index}
            className="rounded-lg bg-white/5 p-3 text-sm text-slate-300"
          >
            {event}
          </div>
        ))}
      </div>
    </Card>
  );
}