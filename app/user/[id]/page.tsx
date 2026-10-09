import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { UserCreateForm } from "@/components/UserCreateForm";
import { Button } from "@/components/ui/button";
import { MOCK_DATA } from "@/components/types/user";

export const metadata: Metadata = { title: "แก้ไขผู้ใช้งาน | Backoffice" };

export function generateStaticParams() {
  return MOCK_DATA.map((user) => ({ id: String(user.id) }));
}

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = MOCK_DATA.find((item) => String(item.id) === id);
  if (!user) notFound();

  return (
    <div className="px-3 pb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/user" className="inline-flex items-center gap-2 rounded text-sm font-semibold text-text-secondary hover:text-primary focus-visible:outline-2 focus-visible:outline-ring">
          <ArrowLeft className="size-4" /> ย้อนกลับ
        </Link>
        <Button type="button" variant="outline" disabled title="ยังไม่เปิดใช้งานการลบ" className="h-9 border-error bg-background px-4 font-semibold text-error disabled:opacity-100">
          <Trash2 className="size-4" /> ลบผู้ใช้งาน
        </Button>
      </div>
      <h1 className="mt-6 text-2xl font-bold leading-9 sm:text-[32px]">แก้ไขผู้ใช้งาน</h1>
      <UserCreateForm key={user.id} user={user} />
    </div>
  );
}
