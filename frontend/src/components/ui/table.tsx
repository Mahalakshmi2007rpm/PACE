import { cn } from "@/lib/utils";

export function Table({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("w-full overflow-hidden rounded-3xl border border-white/10", className)}>{children}</div>;
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 border-b border-white/10 bg-white/5 px-6 py-4 text-xs uppercase tracking-[0.3em] text-slate-400 md:grid-cols-5">{children}</div>;
}

export function TableRow({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 border-b border-white/10 px-6 py-4 md:grid-cols-5 md:items-center">{children}</div>;
}
