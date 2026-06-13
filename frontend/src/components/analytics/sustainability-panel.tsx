import { Card } from "@/components/ui/card";

export function SustainabilityPanel() {
  return (
    <Card>
      <h3 className="text-xl font-semibold text-white">
        Sustainability Intelligence
      </h3>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-white/5 p-4">
          <p className="text-sm text-slate-400">
            Best Performing Route
          </p>

          <p className="mt-2 font-semibold text-white">
            London → Birmingham
          </p>

          <p className="mt-1 text-sm text-green-400">
            1.8 Tons CO₂ Saved
          </p>
        </div>

        <div className="rounded-xl bg-white/5 p-4">
          <p className="text-sm text-slate-400">
            Capacity Recovery
          </p>

          <p className="mt-2 font-semibold text-white">
            85%
          </p>

          <p className="mt-1 text-sm text-green-400">
            Up 12% this month
          </p>
        </div>

        <div className="rounded-xl bg-white/5 p-4">
          <p className="text-sm text-slate-400">
            AI Matches Completed
          </p>

          <p className="mt-2 font-semibold text-white">
            1248
          </p>
        </div>

        <div className="rounded-xl bg-white/5 p-4">
          <p className="text-sm text-slate-400">
            Carbon Efficiency Score
          </p>

          <p className="mt-2 font-semibold text-white">
            94 / 100
          </p>
        </div>
      </div>
    </Card>
  );
}