import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, first_name, last_name")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    const fallback: Record<string, string> = { vendor: "/studio", user: "/dashboard" };
    redirect(fallback[profile?.role ?? ""] ?? "/dashboard");
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
