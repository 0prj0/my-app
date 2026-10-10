import type { ReactNode } from "react";
import { AdminGuard } from "@/components/AdminGuard";

export default function UserLayout({ children }: { children: ReactNode }) {
  return <AdminGuard>{children}</AdminGuard>;
}
