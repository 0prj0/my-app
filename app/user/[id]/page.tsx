import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { UserEditDetails } from "@/components/UserEditDetails";
import { Suspense } from "react";


export const metadata: Metadata = { title: "แก้ไขผู้ใช้งาน | Backoffice" };

export default function EditUserPage() {
  return (
    <div className="px-3 pb-8">
           <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/user" className="inline-flex items-center gap-2 rounded text-sm font-semibold text-text-secondary hover:text-primary focus-visible:outline-2 focus-visible:outline-ring">
          <ArrowLeft className="size-4" /> ย้อนกลับ
        </Link>
      </div>
      <h1 className="mt-6 text-2xl font-bold leading-9 sm:text-[32px]">แก้ไขผู้ใช้งาน</h1>
          
          <Suspense fallback={<p className="mt-6">กำลังโหลดข้อมูลผู้ใช้...</p>}>
            <UserEditDetails />
          </Suspense>
    </div>
  );
}
