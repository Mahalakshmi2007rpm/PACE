"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { BarChart3, Boxes, LayoutDashboard, MapPinned, PackageSearch, ShieldCheck, Truck, Users } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems: Array<{ href: Route; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/shipments", label: "Shipments", icon: PackageSearch },
  { href: "/trucks", label: "Trucks", icon: Truck },
  { href: "/drivers", label: "Drivers", icon: Users },
  { href: "/tracking", label: "Tracking", icon: MapPinned },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin", label: "Admin", icon: ShieldCheck },
  { href: "/", label: "Overview", icon: Boxes }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 flex-col border-r border-white/10 bg-pace-slate/80 px-5 py-6 backdrop-blur xl:flex">
      <div className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-glow">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-pace-teal">PACE</p>
        <h1 className="mt-3 text-2xl font-semibold text-white">Predictive AI Cargo Exchange</h1>
        <p className="mt-2 text-sm leading-6 text-slate-300">Match freight faster, reduce empty miles, and keep fleets moving.</p>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href) && item.href !== "/" ? true : pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition",
                active
                  ? "border-pace-teal/40 bg-pace-teal/15 text-white shadow-glow"
                  : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
