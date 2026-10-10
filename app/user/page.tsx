"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";
import { UserTable } from "@/components/UserTable";
import type { UserListResponse } from "@/components/types/user";
import { useFetch } from "@/lib/utils/use-fetch";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { getApiError } from "@/lib/user-api";

export default function UserPage() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const { data, error, isLoading, isValidating, mutate } =
    useFetch<UserListResponse>(`/users/?page=${page}&perPage=${perPage}&orderBy=createdAt&orderDirection=desc`, {
      shouldRetryOnError: false,
    });


  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 pl-3">
        <h1 className="font-noto-thai text-2xl font-bold leading-9 sm:text-[32px]">รายการชื่อผู้ใช้งาน</h1>
        <Link href="/user/new" className={`${buttonVariants()} h-9 rounded-lg px-4 font-noto-thai text-sm font-semibold`}>
          <Plus className="size-4" /> เพิ่มผู้ใช้งาน
        </Link>
      </div>
      {error ? <div role="alert"><p>{getApiError(error)}</p><Button onClick={() => void mutate()}>ลองอีกครั้ง</Button></div>
        : isLoading ? <p>กำลังโหลดข้อมูล...</p>
        : <UserTable data={data?.data ?? []} serverPagination />}
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <span>{data?.total ?? 0} รายการ</span>
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="per-page">แสดงแถว</label>
          <select id="per-page" value={perPage} onChange={(event) => { setPerPage(Number(event.target.value)); setPage(1); }} className="rounded border px-3 py-2">
            {[10, 20, 50].map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
          <span>{data?.totalPages ? page : 0} จาก {data?.totalPages ?? 0}</span>
          <Button variant="outline" disabled={page <= 1 || isValidating} onClick={() => setPage(1)}>หน้าแรก</Button>
          <Button variant="outline" disabled={page <= 1 || isValidating} onClick={() => setPage(page - 1)}>ก่อนหน้า</Button>
          <Button variant="outline" disabled={!data || page >= data.totalPages || isValidating} onClick={() => setPage(page + 1)}>ถัดไป</Button>
          <Button variant="outline" disabled={!data || page >= data.totalPages || isValidating} onClick={() => setPage(data!.totalPages)}>หน้าสุดท้าย</Button>
        </div>
      </div>
    </section>
  );
}
