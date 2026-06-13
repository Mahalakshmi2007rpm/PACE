import { Card } from "@/components/ui/card";

export function MatchLifecycle() {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-white">
        Autonomous Match Lifecycle
      </h3>

      <div className="mt-4 space-y-3 text-sm text-slate-300">
        <p>✅ Delivery Completed</p>
        <p>✅ Route Analyzed</p>
        <p>✅ Empty Capacity Detected</p>
        <p>✅ Shipment Found</p>
        <p>✅ Match Score Generated</p>
        <p>✅ Driver Notified</p>
        <p>✅ Load Accepted</p>
      </div>
    </Card>
  );
}