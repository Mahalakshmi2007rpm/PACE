import { Card } from "@/components/ui/card";

export function DispatcherAgent() {
  return (
    <Card className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-pace-teal">
          Autonomous Dispatcher
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-white">
          AI Dispatcher Agent
        </h2>

        <p className="mt-2 text-slate-400">
          Real-time freight matching based on route overlap and unused capacity.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl bg-white/5 p-3">
          <p className="text-slate-400">Truck</p>
          <p className="font-semibold text-white">PACE-TRK-101</p>
        </div>

        <div className="rounded-xl bg-white/5 p-3">
          <p className="text-slate-400">Status</p>
          <p className="font-semibold text-green-400">Delivery Completed</p>
        </div>

        <div className="rounded-xl bg-white/5 p-3">
          <p className="text-slate-400">Route Overlap</p>
          <p className="font-semibold text-white">92%</p>
        </div>

        <div className="rounded-xl bg-white/5 p-3">
          <p className="text-slate-400">Detour</p>
          <p className="font-semibold text-white">2.7%</p>
        </div>

        <div className="rounded-xl bg-white/5 p-3">
          <p className="text-slate-400">Shipment Found</p>
          <p className="font-semibold text-white">Electronics Load</p>
        </div>

        <div className="rounded-xl bg-white/5 p-3">
          <p className="text-slate-400">AI Confidence</p>
          <p className="font-semibold text-pace-teal">96%</p>
        </div>
      </div>

      <div className="rounded-xl border border-pace-teal/30 bg-pace-teal/10 p-4">
        <p className="font-semibold text-pace-teal">
          Recommendation: ACCEPT LOAD
        </p>

        <p className="mt-2 text-sm text-slate-300">
          This shipment aligns with the truck's return route and maximizes
          utilization while minimizing empty miles.
        </p>
      </div>
    </Card>
  );
}