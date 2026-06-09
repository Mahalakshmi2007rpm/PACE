import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/auth-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center px-4 py-12">
      <AuthCard title="Create your PACE account" description="Register as a shipper, logistics company, or administrator.">
        <RegisterForm />
      </AuthCard>
    </main>
  );
}
