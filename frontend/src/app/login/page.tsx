import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/auth-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center px-4 py-12">
      <AuthCard title="Welcome back" description="Sign in to manage shipments, trucks, drivers, and AI recommendations.">
        <LoginForm />
      </AuthCard>
    </main>
  );
}
