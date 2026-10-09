"use client";

import Image from "next/image";
import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";
import type { DataTableFeatures } from "@/components/ui/data-table-features";
import type { UserList } from "@/components/types/user";
import { Badge } from "@/components/ui/badge";

export const getUserStatusBadge = (status: boolean) => ({
  label: status ? "เปิดใช้งาน" : "ปิดใช้งาน",
  color: status
    ? "border-success bg-success-background text-success-foreground"
    : "border-error bg-error-background text-error-foreground",
});

const columnHelper = createColumnHelper<DataTableFeatures, UserList>();

export const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: "รหัสผู้ใช้งาน",
    size: 136,
    cell: ({ row }) => (
      <Link href={`/user/${row.original.id}`} className="rounded text-sm text-link underline underline-offset-2 hover:text-link/80 focus-visible:outline-2 focus-visible:outline-ring">US-{String(25100000 + row.original.id)}</Link>
    ),
  }),
  columnHelper.accessor("name", { header: "ชื่อผู้ใช้งาน", size: 243 }),
  columnHelper.accessor("role", {
    header: "สิทธิ์การใช้งาน",
    size: 243,
    cell: ({ row }) => <span className="text-sm">{row.original.role === "admin" ? "Company Admin" : "User"}</span>,
  }),
  columnHelper.accessor("company", {
    header: "บริษัท",
    size: 243,
    cell: ({ row }) => {
      const { company, companyImageUrl } = row.original;
      return (
        <div className="flex items-center gap-2">
          {companyImageUrl ? (
            <Image src={companyImageUrl} alt={company} width={20} height={20} unoptimized className="size-5 rounded-full object-cover" />
          ) : (
            <span aria-hidden="true" className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#9be564] text-[7px] font-black leading-none text-black">DD<br />EXP</span>
          )}
          <span>{company}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor("status", {
    header: "สถานะ",
    size: 135,
    cell: ({ row }) => {
      const { label, color } = getUserStatusBadge(row.original.status);
      return <Badge variant="outline" className={`h-[22px] rounded-full px-2 py-0 text-sm font-semibold leading-5 ${color}`}>{label}</Badge>;
    },
  }),
]);
