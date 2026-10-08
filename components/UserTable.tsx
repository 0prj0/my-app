"use client";

import { columns } from "@/app/user/columns";
import { DataTable } from "@/components/DataTable";
import type { UserList } from "@/components/types/user";

export function UserTable({ data }: { data: UserList[] }) {
  return <DataTable columns={columns} data={data} />;
}
