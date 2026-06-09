import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Card } from "@/components/ui/card";

export function DashboardHero() {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pace-teal/15 via-transparent to-pace-amber/10" />
      <div className="relative grid gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
            <Sparkles className="h-3 w-3 text-pace-teal" />
            Predictive matching engine
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">Move freight with fewer empty miles.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
            PACE combines truck availability, cargo compatibility, and AI recommendations to pair the right vehicle with the right shipment.
          </p>
        </div>
        <div className="flex flex-col gap-3 lg:items-end">
          <Link href="/shipments" className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-pace-ink transition hover:bg-slate-100">
            Create shipment <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Operational snapshot updated in real time</p>
        </div>
      </div>
    </Card>
  );
}
