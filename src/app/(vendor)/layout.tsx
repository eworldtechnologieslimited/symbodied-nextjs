import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="vendor" title="Vendor Studio">{children}</DashboardLayout>;
}
