import Link from "next/link";
import { Plus } from "lucide-react";
import { UserTable } from "@/components/UserTable";
import { MOCK_DATA } from "@/components/types/user";
import { buttonVariants } from "@/components/ui/button";

export default function UserPage() {
  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 pl-3">
        <h1 className="font-noto-thai text-2xl font-bold leading-9 sm:text-[32px]">รายการชื่อผู้ใช้งาน</h1>
        <Link href="/user/new" className={`${buttonVariants()} h-9 rounded-lg px-4 font-noto-thai text-sm font-semibold`}>
          <Plus className="size-4" /> เพิ่มผู้ใช้งาน
        </Link>
      </div>
      <UserTable data={MOCK_DATA} />
    </section>
  );
}
