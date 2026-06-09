import Link from "next/link";
import { ArrowRight, Route, ShieldCheck, Sparkles, Truck } from "lucide-react";

import { Card } from "@/components/ui/card";

const highlights = [
  { title: "AI truck matching", text: "Score trucks by distance, capacity, availability, and rating.", icon: Sparkles },
  { title: "Live tracking", text: "Track trucks on an OpenStreetMap powered live map.", icon: Route },
  { title: "Role-based workflows", text: "Separate experiences for users, carriers, and administrators.", icon: ShieldCheck }
];

export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-12 md:px-8">
      <section className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.45em] text-pace-teal">Predictive AI Cargo Exchange</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl">Move freight smarter with fewer empty truck miles.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            PACE unifies shipment requests, fleet operations, live tracking, and AI-assisted recommendations into a single logistics command center.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/register" className="inline-flex items-center gap-2 rounded-2xl bg-pace-teal px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110">
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/login" className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Sign in
            </Link>
          </div>
        </div>
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(21,183,168,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.12),transparent_30%)]" />
          <div className="relative space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <Truck className="h-5 w-5 text-pace-teal" />
              <div>
                <p className="text-sm font-medium text-white">Fleet utilization</p>
                <p className="text-xs text-slate-400">Real-time optimization across active shipments</p>
              </div>
            </div>
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-pace-amber" />
                    <p className="font-medium text-white">{item.title}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </section>
    </main>
  );
}
