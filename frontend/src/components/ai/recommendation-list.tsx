import { ArrowUpRight, Brain } from "lucide-react";

import { Card } from "@/components/ui/card";
import type { Recommendation } from "@/types";

export function RecommendationList({ recommendations }: { recommendations: Recommendation[] }) {
  return (
    <div className="space-y-4">
      {recommendations.map((recommendation) => (
        <Card key={recommendation.truck_id} className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-pace-teal/15 p-3 text-pace-teal">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{recommendation.truck_number}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">{recommendation.explanation}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Match score</p>
            <p className="mt-2 text-2xl font-semibold text-white">{recommendation.match_score.toFixed(1)}%</p>
            <div className="mt-2 flex items-center justify-end gap-2 text-xs text-slate-300">
              <ArrowUpRight className="h-3 w-3 text-pace-teal" />
              +{recommendation.estimated_empty_miles_saved} empty miles saved
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
