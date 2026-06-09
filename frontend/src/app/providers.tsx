"use client";

import { ThemeProvider } from "next-themes";

import { AuthProvider } from "@/context/auth-context";
import { UIProvider } from "@/context/ui-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <UIProvider>
        <AuthProvider>{children}</AuthProvider>
      </UIProvider>
    </ThemeProvider>
  );
}
