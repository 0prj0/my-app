"use client";

import type { ReactNode } from "react";
import { useFetch } from "@/lib/utils/use-fetch";
import { getApiError, sessionKey } from "@/lib/user-api";

type Session = {
  session: { id: string; expiresAt: string };
  user: { id: string; role: string; status?: boolean; isActive?: boolean };
};

export function AdminGuard({ children }: { children: ReactNode }) {
  const { data, error, isLoading, isValidating, mutate } = useFetch<Session | null>(sessionKey, {
    revalidateOnFocus: true,
    refreshInterval: 60000,
    shouldRetryOnError: false,
  });
  const health = useFetch<unknown>(error ? "http://localhost:3001/health" : null, {
    shouldRetryOnError: false,
  });

  if (isLoading) return <p>กำลังตรวจสอบสิทธิ์...</p>;
  const message = error ? getApiError(error)
    : !data ? "กรุณาเข้าสู่ระบบผ่าน Swagger แล้วตรวจสอบอีกครั้ง"
    : data.user.role !== "admin" || data.user.status === false || data.user.isActive === false
      ? "ไม่มีสิทธิ์เข้าถึงหน้านี้ ต้องเป็นผู้ดูแลระบบที่เปิดใช้งาน"
      : null;

  if (message) return (
    <div className="space-y-3" role="alert">
      <p>{message}</p>
      {error && <p>{health.isLoading ? "กำลังตรวจสอบการเชื่อมต่อ..." : health.error ? "ตรวจสอบการเชื่อมต่อ backend ไม่สำเร็จ" : "Backend ตอบกลับแล้ว แต่ตรวจสอบ session ไม่สำเร็จ"}</p>}
      <button type="button" disabled={isValidating} onClick={() => void mutate()} className="text-link underline">
        {isValidating ? "กำลังตรวจสอบ..." : "ตรวจสอบอีกครั้ง"}
      </button>
    </div>
  );

  return children;
}
