import { isAxiosError } from "axios";
import { api } from "@/lib/api";
import type { UserRole } from "@/components/types/user";

export const sessionKey = "http://localhost:3001/api/auth/get-session";

export type CreateUserInput = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  company: string;
  role: UserRole;
};

export type UpdateUserInput = Pick<CreateUserInput, "firstName" | "lastName" | "company">;

export const createUser = (input: CreateUserInput) => api.post("/users/", input);
export const updateUser = (id: string, input: UpdateUserInput) =>
  api.put(`/users/${encodeURIComponent(id)}`, input);
export const deleteUser = (id: string) => api.delete(`/users/${encodeURIComponent(id)}`);

export function isUserListKey(key: unknown) {
  return typeof key === "string" && (key === "/users/" || key.startsWith("/users/?"));
}

export function getApiError(error: unknown) {
  if (isAxiosError(error)) {
    if (error.response?.status === 401) return "กรุณาเข้าสู่ระบบแล้วลองอีกครั้ง";
    if (error.response?.status === 403) return "ไม่มีสิทธิ์ดำเนินการ ต้องเป็นผู้ดูแลระบบที่เปิดใช้งาน";
    const message = error.response?.data?.message;
    if (typeof message === "string") return message;
    if (!error.response) return "เชื่อมต่อ backend ไม่สำเร็จ";
  }
  return "ดำเนินการไม่สำเร็จ กรุณาลองอีกครั้ง";
}
