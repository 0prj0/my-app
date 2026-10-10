"use client";

import { useTable, type ColumnDef, type RowData } from "@tanstack/react-table";
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { features, type DataTableFeatures } from "./ui/data-table-features";

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  serverPagination?: boolean;
}

export function DataTable<TData extends RowData>({ columns, data, serverPagination = false }: DataTableProps<TData>) {
  const table = useTable({ features, data, columns, manualPagination: serverPagination });
  const { pageIndex, pageSize } = table.state.pagination;
  const pageCount = table.getPageCount();
  const leafColumns = table.getAllLeafColumns();
  const totalColumnSize = leafColumns.reduce((sum, column) => sum + column.getSize(), 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-border font-sans">
      <Table className="min-w-[800px] table-fixed text-sm leading-5 text-text-secondary">
        <colgroup>
          {leafColumns.map((column) => (
            <col key={column.id} style={{ width: `${(column.getSize() / totalColumnSize) * 100}%` }} />
          ))}
        </colgroup>
        <TableHeader className="bg-muted">
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id} className="border-border hover:bg-transparent">
              {group.headers.map((header) => (
                <TableHead key={header.id} className="h-[42px] px-3 text-sm font-semibold leading-5 text-text-secondary">
                  {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="border-border">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="h-[45px] px-3 py-2"><table.FlexRender cell={cell} /></TableCell>
              ))}
            </TableRow>
          )) : (
            <TableRow><TableCell colSpan={columns.length} className="h-24 text-center">ไม่พบผู้ใช้งาน</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
      {!serverPagination && <div className="flex flex-wrap items-center justify-between gap-4 min-h-16 border-t border-border px-4 py-3 text-sm">
        <p aria-live="polite">{table.getRowCount()} รายการ</p>
        <div className="flex flex-wrap items-center gap-3 text-text-secondary">
          <label htmlFor="user-page-size">แสดงแถว</label>
          <select id="user-page-size" value={pageSize} onChange={(event) => table.setPageSize(Number(event.target.value))} className="h-8 min-w-16 rounded border border-input bg-white px-3 font-sans text-sm font-medium focus-visible:outline-ring">
            {[10, 20, 50].map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
          <span aria-live="polite">{pageCount ? pageIndex + 1 : 0} จาก {pageCount}</span>
          <Button variant="ghost" size="icon" className="size-6 text-text-secondary disabled:text-input disabled:opacity-100 [&_svg]:size-4" aria-label="หน้าแรก" disabled={!table.getCanPreviousPage()} onClick={() => table.firstPage()}><ChevronFirst /></Button>
          <Button variant="ghost" size="icon" className="size-6 text-text-secondary disabled:text-input disabled:opacity-100 [&_svg]:size-4" aria-label="หน้าก่อนหน้า" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}><ChevronLeft /></Button>
          <Button variant="ghost" size="icon" className="size-6 text-text-secondary disabled:text-input disabled:opacity-100 [&_svg]:size-4" aria-label="หน้าถัดไป" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}><ChevronRight /></Button>
          <Button variant="ghost" size="icon" className="size-6 text-text-secondary disabled:text-input disabled:opacity-100 [&_svg]:size-4" aria-label="หน้าสุดท้าย" disabled={!table.getCanNextPage()} onClick={() => table.lastPage()}><ChevronLast /></Button>
        </div>
      </div>}
    </div>
  );
}
