import { Card } from "@/components/ui/card";

export function AuthCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Card className="mx-auto w-full max-w-lg border-white/10 bg-white/5 p-8">
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-pace-teal">PACE</p>
      <h1 className="mt-4 text-3xl font-semibold text-white">{title}</h1>
      <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
      <div className="mt-8">{children}</div>
    </Card>
  );
}
