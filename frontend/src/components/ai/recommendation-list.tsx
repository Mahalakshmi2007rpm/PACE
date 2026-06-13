import { ArrowUpRight, Brain, CheckCircle } from "lucide-react";

import { Card } from "@/components/ui/card";
import type { Recommendation } from "@/types";

export function RecommendationList({
  recommendations,
}: {
  recommendations: Recommendation[];
}) {
  return (
    <div className="space-y-4">
      {recommendations.map((recommendation) => (
        <Card
          key={recommendation.truck_id}
          className="space-y-5"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-pace-teal/15 p-3 text-pace-teal">
              <Brain className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">
                {recommendation.truck_number}
              </h3>

              <p className="mt-2 text-sm text-slate-300">
                {recommendation.explanation}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                AI Match Score
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {recommendation.match_score.toFixed(1)}%
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl bg-white/5 p-3">
              <p className="text-xs text-slate-400">
                Route Overlap
              </p>

              <p className="font-semibold text-white">
                92%
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-3">
              <p className="text-xs text-slate-400">
                Capacity Utilization
              </p>

              <p className="font-semibold text-white">
                85%
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-3">
              <p className="text-xs text-slate-400">
                Driver Rating
              </p>

              <p className="font-semibold text-white">
                4.9 / 5
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-3">
              <p className="text-xs text-slate-400">
                Detour Required
              </p>

              <p className="font-semibold text-white">
                2.7%
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-pace-teal/20 bg-pace-teal/10 p-4">
            <h4 className="font-semibold text-pace-teal">
              AI Recommendation Reasoning
            </h4>

            <div className="mt-3 space-y-2 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                High route compatibility
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Low detour impact
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Strong driver reliability
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Maximizes empty capacity utilization
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-300">
              <ArrowUpRight className="h-4 w-4 text-pace-teal" />
              {recommendation.estimated_empty_miles_saved} empty miles saved
            </div>

            <div className="font-semibold text-pace-teal">
              AI Confidence: 96%
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}