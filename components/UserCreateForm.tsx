"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { UserList } from "@/components/types/user";

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold text-text-secondary">
      {children}<span className="ml-1 text-error" aria-hidden="true">*</span>
    </label>
  );
}

function PasswordField({ id, label, placeholder }: { id: string; label: string; placeholder: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="space-y-1.5">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <Input id={id} name={id} type={visible ? "text" : "password"} placeholder={placeholder} autoComplete="new-password" required className="pr-11" />
        <button
          type="button"
          aria-label={`${visible ? "ซ่อน" : "แสดง"}${label}`}
          aria-pressed={visible}
          onClick={() => setVisible((value) => !value)}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-[#98a2b3] hover:text-text-secondary focus-visible:outline-2 focus-visible:outline-ring"
        >
          {visible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
      </div>
    </div>
  );
}

export function UserCreateForm({ user }: { user?: UserList }) {
  return (
    <form className="mt-11" onSubmit={(event) => event.preventDefault()}>
      <section aria-labelledby="user-details-title" className="space-y-6">
        <h2 id="user-details-title" className="text-lg font-bold">ข้อมูลผู้ใช้งาน</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <FieldLabel htmlFor="firstName">ชื่อจริง</FieldLabel>
            <Input id="firstName" name="firstName" defaultValue={user?.firstName ?? ""} placeholder="กรอกชื่อจริง" autoComplete="given-name" required />
          </div>
          <div className="space-y-1.5">
            <FieldLabel htmlFor="lastName">นามสกุล</FieldLabel>
            <Input id="lastName" name="lastName" defaultValue={user?.lastName ?? ""} placeholder="กรอกนามสกุล" autoComplete="family-name" required />
          </div>
        </div>
      </section>

      <section aria-labelledby="account-settings-title" className="mt-6 space-y-5 border-t border-border pt-6">
        <h2 id="account-settings-title" className="text-lg font-bold">ตั้งค่าบัญชี</h2>
        <div className="grid gap-x-4 gap-y-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <FieldLabel htmlFor="email">อีเมล</FieldLabel>
            <Input id="email" name="email" type="email" defaultValue={user?.email ?? ""} placeholder="กรอกอีเมล" autoComplete="email" required />
          </div>
          <div className="space-y-1.5">
            <FieldLabel htmlFor="company">บริษัท</FieldLabel>
            <Input id="company" name="company" defaultValue={user?.company ?? ""} placeholder="กรอกบริษัท" autoComplete="organization" required />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <FieldLabel htmlFor="role">สิทธิ์การใช้งาน</FieldLabel>
            <div className="relative">
              <select id="role" name="role" defaultValue={user?.role ?? ""} required className="h-11 w-full appearance-none rounded-lg border border-input bg-background px-3 pr-11 text-sm outline-none invalid:text-[#98a2b3] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20">
                <option value="" disabled>เลือกสิทธิ์การใช้งาน</option>
                <option value="admin">Company Admin</option>
                <option value="user">User</option>
              </select>
              <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#98a2b3]" />
            </div>
          </div>
          <PasswordField id="password" label="รหัสผ่าน" placeholder={user ? "***************" : "กรอกรหัสผ่าน"} />
          <PasswordField id="confirmPassword" label="ยืนยันรหัสผ่าน" placeholder={user ? "***************" : "ยืนยันรหัสผ่าน"} />
        </div>
      </section>

      <div className="mt-10 flex flex-wrap justify-end gap-4 rounded-xl border border-border bg-background px-5 py-4">
        <Link href="/user" className={cn(buttonVariants({ variant: "outline" }), "h-9 min-w-24 border-input font-semibold text-text-secondary")}>ยกเลิก</Link>
        <Button type="button" disabled title="ยังไม่เปิดใช้งานการบันทึก" className="h-9 min-w-24 px-4 font-semibold disabled:opacity-100">{user ? "แก้ไข" : "เพิ่มผู้ใช้งาน"}</Button>
      </div>
    </form>
  );
}
