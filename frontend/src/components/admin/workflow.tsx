import { Card } from "@/components/ui/card";

export function Workflow() {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-white">
        PACE Autonomous Workflow
      </h3>

      <div className="mt-5 space-y-3 text-slate-300">
        <p>🚚 Delivery Completed</p>
        <p>⬇</p>
        <p>📦 Empty Capacity Detected</p>
        <p>⬇</p>
        <p>🤖 AI Route Matching</p>
        <p>⬇</p>
        <p>📍 Shipment Identified</p>
        <p>⬇</p>
        <p>📲 Driver Notified</p>
        <p>⬇</p>
        <p>✅ Load Accepted</p>
      </div>
    </Card>
  );
}