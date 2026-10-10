"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteUser, getApiError, isUserListKey, sessionKey } from "@/lib/user-api";
import { isAxiosError } from "axios";
import { UserCreateForm } from "@/components/UserCreateForm";
import type { UserList } from "@/components/types/user";
import { useFetch } from "@/lib/utils/use-fetch";

type UserDetailsResponse = UserList | { data: UserList | null };

export function UserEditDetails() {
  const router = useRouter();
  const { mutate: refresh } = useSWRConfig();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading, mutate } = useFetch<UserDetailsResponse>(
    `/users/${encodeURIComponent(id)}`,
    {
      shouldRetryOnError: false,
      revalidateOnReconnect: false,
    },
  );

  if (isLoading) return <p className="mt-6">กำลังโหลดข้อมูลผู้ใช้...</p>;

  if (error) {
    const status = isAxiosError(error) ? error.response?.status : undefined;
    const message = status === 404
      ? "ไม่พบผู้ใช้งานนี้"
      : status === 401
        ? "กรุณาเข้าสู่ระบบผ่าน Swagger แล้วลองอีกครั้ง"
        : "โหลดข้อมูลผู้ใช้ไม่สำเร็จ";

    return (
      <div className="mt-6 space-y-3" role="alert">
        <p>{message}</p>
        <button type="button" className="text-link underline" onClick={() => void mutate()}>
          ลองอีกครั้ง
        </button>
      </div>
    );
  }

  const user = data && ("data" in data ? data.data : data);
  if (!user) return <p className="mt-6">ไม่พบผู้ใช้งานนี้</p>;

  const onDelete = async () => {
    if (isDeleting || !window.confirm(`ยืนยันลบผู้ใช้งาน ${user.name} (${user.email})?`)) return;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteUser(user.id);
    } catch (error) {
      setDeleteError(getApiError(error));
      setIsDeleting(false);
      return;
    }
    await refresh(`/users/${encodeURIComponent(id)}`, undefined, { revalidate: false });
    await Promise.allSettled([refresh(isUserListKey), refresh(sessionKey)]);
    router.push("/user");
  };

  return (
    <div>
      <div className="mt-6 flex justify-end">
        <Button variant="outline" disabled={isDeleting} onClick={() => void onDelete()} className="border-error text-error">
          <Trash2 className="size-4" /> {isDeleting ? "กำลังลบ..." : "ลบผู้ใช้งาน"}
        </Button>
      </div>
      {deleteError && <p role="alert" className="mt-3 text-error">{deleteError}</p>}
      {!isDeleting && <UserCreateForm key={user.id} user={user} />}
    </div>
  );
}
