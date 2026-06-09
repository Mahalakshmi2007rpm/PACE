"use client";

import Link from "next/link";
import { Bell, Search, Sparkles } from "lucide-react";

import { useAuth } from "@/context/auth-context";
import { useUI } from "@/context/ui-context";
import { cn } from "@/lib/utils";

export function Topbar() {
  const { user, logout } = useAuth();
  const { toggleSidebar } = useUI();

  return (
    <header className="flex flex-col gap-4 border-b border-white/10 bg-white/5 px-5 py-4 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 xl:hidden"
        >
          Menu
        </button>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Operational control</p>
          <h2 className="mt-1 text-lg font-semibold text-white">Fleet command center</h2>
        </div>
      </div>
      <div className="flex flex-1 items-center gap-3 md:justify-end">
        <div className="flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 md:w-96">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            aria-label="Search"
            placeholder="Search shipments, trucks, drivers..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>
        <button className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-200 transition hover:bg-white/10">
          <Bell className="h-4 w-4" />
        </button>
        <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 md:flex">
          <Sparkles className="h-4 w-4 text-pace-teal" />
          {user ? <span>{user.full_name || user.email}</span> : <span>Guest</span>}
        </div>
        <Link
          href="/login"
          onClick={() => logout()}
          className={cn("rounded-2xl border border-pace-amber/30 bg-pace-amber/15 px-4 py-2 text-sm font-medium text-pace-amber")}
        >
          Sign out
        </Link>
      </div>
    </header>
  );
}
