"use client";

import { useState } from "react";
import Link from "next/link";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { LoginPayload, RegisterPayload } from "@/types";

export function LoginForm() {
  const { login } = useAuth();
  const [form, setForm] = useState<LoginPayload>({ email: "", password: "" });
  const [message, setMessage] = useState<string | null>(null);

  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        await login(form);
        setMessage("Signed in successfully.");
      }}
    >
      <Input placeholder="Email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
      <Input placeholder="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
      <Button className="w-full" type="submit">Sign in</Button>
      <p className="text-sm text-slate-400">
        New to PACE? <Link href="/register" className="text-pace-teal">Create an account</Link>
      </p>
      {message ? <p className="text-sm text-pace-teal">{message}</p> : null}
    </form>
  );
}

export function RegisterForm() {
  const { register } = useAuth();
  const [form, setForm] = useState<RegisterPayload>({ email: "", password: "", full_name: "", company_name: "", role: "user" });
  const [message, setMessage] = useState<string | null>(null);

  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        await register(form);
        setMessage("Account created successfully.");
      }}
    >
      <Input placeholder="Full name" value={form.full_name ?? ""} onChange={(event) => setForm({ ...form, full_name: event.target.value })} />
      <Input placeholder="Company name" value={form.company_name ?? ""} onChange={(event) => setForm({ ...form, company_name: event.target.value })} />
      <Input placeholder="Email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
      <Input placeholder="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
      <select
        value={form.role}
        onChange={(event) => setForm({ ...form, role: event.target.value })}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
      >
        <option value="user">User</option>
        <option value="logistics_company">Logistics Company</option>
        <option value="admin">Admin</option>
      </select>
      <Button className="w-full" type="submit">Create account</Button>
      <p className="text-sm text-slate-400">
        Already have an account? <Link href="/login" className="text-pace-teal">Sign in</Link>
      </p>
      {message ? <p className="text-sm text-pace-teal">{message}</p> : null}
    </form>
  );
}
