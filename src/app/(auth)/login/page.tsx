"use client";

import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const roleRedirect: Record<string, string> = {
  admin: "/admin",
  vendor: "/studio",
  user: "/dashboard",
};

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    setLoading(true);
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setLoading(false);
      toast.error(error.message);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    const destination = roleRedirect[profile?.role ?? "user"] ?? "/dashboard";
    router.refresh();
    router.push(destination);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display font-bold text-3xl text-ink tracking-tight">Welcome back</h1>
        <p className="mt-2 text-ink-600 font-sans text-base">
          Sign in to shop, donate, and create.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Email address"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          autoComplete="email"
          leadingIcon={<Mail size={16} />}
        />
        <div className="flex flex-col gap-1.5">
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            autoComplete="current-password"
            leadingIcon={<Lock size={16} />}
          />
          <Link
            href="/forgot-password"
            className="text-sm text-brand hover:text-brand-hover font-sans self-end transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
          Sign In
        </Button>
      </form>

      <div className="relative flex items-center gap-3">
        <div className="flex-1 h-px bg-ink-200" />
        <span className="text-xs text-ink-400 font-sans">or</span>
        <div className="flex-1 h-px bg-ink-200" />
      </div>

      <Button variant="secondary" size="lg" fullWidth>
        Continue with Google
      </Button>

      <p className="text-center text-sm text-ink-500 font-sans">
        Don't have an account?{" "}
        <Link href="/signup" className="text-brand font-semibold hover:text-brand-hover transition-colors">
          Sign up free
        </Link>
      </p>
    </div>
  );
}
