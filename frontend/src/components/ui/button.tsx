import { cn } from "@/lib/utils";

export function Button({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      {...props}
      className={cn("inline-flex items-center justify-center rounded-2xl bg-pace-teal px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110", className)}
    >
      {children}
    </button>
  );
}
