import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Use service client to bypass the RLS infinite-recursion policy on profiles
  const serviceSupabase = createServiceClient();
  const { data: profile } = await serviceSupabase
    .from("profiles")
    .select("role, first_name, last_name")
    .eq("id", user.id)
    .single();

  const effectiveRole = profile?.role ?? (user.user_metadata?.role as string);
  if (effectiveRole !== "admin") {
    const fallback: Record<string, string> = { vendor: "/studio", user: "/dashboard" };
    redirect(fallback[effectiveRole ?? ""] ?? "/dashboard");
  }

  const firstName: string = profile?.first_name ?? (user.user_metadata?.first_name as string) ?? "";
  const lastName: string = profile?.last_name ?? (user.user_metadata?.last_name as string) ?? "";
  const userName = `${firstName} ${lastName}`.trim() || (user.email ?? "Admin");

  return (
    <DashboardLayout role="admin" title="Admin Dashboard" userName={userName}>
      {children}
    </DashboardLayout>
  );
}
