"use client";

import Link from "next/link";
import { useState, type ComponentProps } from "react";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import { useForm, Controller } from "react-hook-form";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { UserList, UserRole } from "@/components/types/user";
import { createUser, updateUser, getApiError, isUserListKey, sessionKey } from "@/lib/user-api";

function FieldLabel({
  htmlFor,
  children,
  required = true,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-semibold text-text-secondary"
    >
      {children}
      {required && <span className="ml-1 text-error" aria-hidden="true">
        *
      </span>}
    </label>
  );
}

function PasswordField({
  id,
  label,
  placeholder,
  required = true,
  ...inputProps
}: {
  id: string;
  label: string;
  placeholder: string;
} & ComponentProps<typeof Input>) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="space-y-1.5">
      <FieldLabel htmlFor={id} required={required}>{label}</FieldLabel>
      <div className="relative">
        <Input
          {...inputProps}
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete="new-password"
          required={required}
          className="pr-11"
        />
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

type UserFormValues = Pick<UserList, "firstName" | "lastName" | "email" | "company"> & {
  role: UserRole;
  password: string;
  confirmPassword: string;
};

export function UserCreateForm({ user }: { user?: UserList }) {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm<UserFormValues>({
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      company: user?.company ?? "",
      role: user?.role ?? "user",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: UserFormValues) => {
    setSubmitError(null);
    if (!values.password || !values.confirmPassword) {
      setSubmitError("กรุณากรอกรหัสผ่านและยืนยันรหัสผ่าน");
      return;
    }
    if (values.password !== values.confirmPassword) {
      setSubmitError("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }
    const profile = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      company: values.company.trim(),
    };
    if (!profile.company || (!profile.firstName && !profile.lastName)) {
      setSubmitError("กรุณากรอกชื่อผู้ใช้และบริษัท");
      return;
    }
    try {
      if (user) {
        await updateUser(user.id, {
          ...profile,
          email: values.email.trim(),
          role: user.role,
          password: values.password,
          confirmPassword: values.confirmPassword,
        });
      } else {
        await createUser({ ...values, ...profile, email: values.email.trim() });
      }
    } catch (error) {
      setSubmitError(getApiError(error));
      return;
    }
    // Refresh errors must not make a successful write look like a failed submission.
    const refreshes: Promise<unknown>[] = [mutate(isUserListKey)];
    if (user) {
      refreshes.push(mutate(`/users/${encodeURIComponent(user.id)}`), mutate(sessionKey));
    }
    await Promise.allSettled(refreshes);
    router.push("/user");
  };

  return (
    <form className="mt-11" onSubmit={handleSubmit(onSubmit)}>
      {submitError && <p role="alert" className="mb-4 text-error">{submitError}</p>}
      {user && <p className="mb-4">กรุณากรอกรหัสผ่านและยืนยันรหัสผ่านเพื่อบันทึกการแก้ไข</p>}
      <fieldset disabled={isSubmitting}>
      <section aria-labelledby="user-details-title" className="space-y-6">
        <h2 id="user-details-title" className="text-lg font-bold">
          ข้อมูลผู้ใช้งาน
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <div className="space-y-1.5">
                <FieldLabel htmlFor="firstName">ชื่อจริง</FieldLabel>
                <Input
                  id="firstName"
                  //defaultValue={user?.firstName ?? ""}
                  placeholder="กรอกชื่อจริง"
                  autoComplete="given-name"
                  required
                  {...field}
                />
              </div>
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <div className="space-y-1.5">
            <FieldLabel htmlFor="lastName">นามสกุล</FieldLabel>
            <Input
              id="lastName"
              //defaultValue={user?.lastName ?? ""}
              placeholder="กรอกนามสกุล"
              autoComplete="family-name"
              required
              {...field}
            />
          </div>
            )}
          />
        </div>
      </section>

      <section
        aria-labelledby="account-settings-title"
        className="mt-6 space-y-5 border-t border-border pt-6"
      >
        <h2 id="account-settings-title" className="text-lg font-bold">
          ตั้งค่าบัญชี
        </h2>
        <div className="grid gap-x-4 gap-y-4 md:grid-cols-2">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div className="space-y-1.5">
            <FieldLabel htmlFor="email">อีเมล</FieldLabel>
            <Input
              id="email"
              type="email"
              //defaultValue={user?.email ?? ""}
              placeholder="กรอกอีเมล"
              autoComplete="email"
              required
              {...field}
            />
          </div>
            )}
          />

          <Controller
            name="company"
            control={control}
            render={({ field }) => (
              <div className="space-y-1.5">
            <FieldLabel htmlFor="company">บริษัท</FieldLabel>
            <Input
              id="company"
              //defaultValue={user?.company ?? ""}
              placeholder="กรอกบริษัท"
              autoComplete="organization"
              required
              {...field}
            />
          </div>
            )}
          />
          
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <div className="space-y-1.5 md:col-span-2">
            <FieldLabel htmlFor="role">สิทธิ์การใช้งาน</FieldLabel>
            <div className="relative">
              <select
                id="role"
                disabled={!!user}
                {...field}
                //defaultValue={user?.role ?? ""}
                required
                className="h-11 w-full appearance-none rounded-lg border border-input bg-background px-3 pr-11 text-sm outline-none invalid:text-[#98a2b3] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20"
              >
                <option value="" disabled>
                  เลือกสิทธิ์การใช้งาน
                </option>
                <option value="admin">Company Admin</option>
                <option value="user">User</option>
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#98a2b3]"
              />
            </div>
          </div>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordField
            id="password"
            label="รหัสผ่าน"
            required
            placeholder={user ? "***************" : "กรอกรหัสผ่าน"}
            {...field}
          />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <PasswordField
            id="confirmPassword"
            label="ยืนยันรหัสผ่าน"
            required
            placeholder={user ? "***************" : "ยืนยันรหัสผ่าน"}
            {...field}
          />
            )}
          />
        </div>
      </section>

      <div className="mt-10 flex flex-wrap justify-end gap-4 rounded-xl border border-border bg-background px-5 py-4">
        <Link
          href="/user"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-9 min-w-24 border-input font-semibold text-text-secondary",
          )}
        >
          ยกเลิก
        </Link>

        <Button
          type="button"
          onClick={() => { reset(); setSubmitError(null); }}
          className="h-9 min-w-24 px-4 font-semibold disabled:opacity-100"
        >
          รีเซ็ต
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-9 min-w-24 px-4 font-semibold disabled:opacity-100"
        >
          {isSubmitting ? "กำลังบันทึก..." : user ? "แก้ไข" : "เพิ่มผู้ใช้งาน"}
        </Button>
      </div>
      </fieldset>
    </form>
  );
}
