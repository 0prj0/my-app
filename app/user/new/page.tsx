import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { UserCreateForm } from "@/components/UserCreateForm";

export const metadata: Metadata = { title: "เพิ่มผู้ใช้งาน | Backoffice" };

export default function NewUserPage() {
  return (
    <div className="px-3 pb-8">
      <Link href="/user" className="inline-flex items-center gap-2 rounded text-sm font-semibold text-text-secondary hover:text-primary focus-visible:outline-2 focus-visible:outline-ring">
        <ArrowLeft className="size-4" /> ย้อนกลับ
      </Link>
      <h1 className="mt-6 text-2xl font-bold leading-9 sm:text-[32px]">เพิ่มผู้ใช้งาน</h1>
      <UserCreateForm />
    </div>
  );
}
