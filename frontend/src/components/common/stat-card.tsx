import { ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/card";

export function StatCard({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pace-teal via-cyan-400 to-pace-amber" />
      <p className="text-sm text-slate-400">{label}</p>
      <div className="mt-4 flex items-end justify-between gap-4">
        <h3 className="text-3xl font-semibold text-white">{value}</h3>
        <span className="inline-flex items-center gap-1 rounded-full border border-pace-teal/30 bg-pace-teal/10 px-3 py-1 text-xs text-pace-teal">
          <ArrowUpRight className="h-3 w-3" />
          {delta}
        </span>
      </div>
    </Card>
  );
}
