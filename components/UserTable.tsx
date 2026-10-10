"use client";

import { columns } from "@/app/user/columns";
import { DataTable } from "@/components/DataTable";
import type { UserList } from "@/components/types/user";

export function UserTable({ data, serverPagination = false }: { data: UserList[]; serverPagination?: boolean }) {
  return <DataTable columns={columns} data={data} serverPagination={serverPagination} />;
}
