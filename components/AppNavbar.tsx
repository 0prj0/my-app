"use client";

import { ChevronDown, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useSWRConfig } from "swr";
import { useFetch } from "@/lib/utils/use-fetch";
import { getApiError, sessionKey, signOut, type Session } from "@/lib/user-api";

const PAGE_TITLES: Record<string, string> = {
  "/": "หน้าหลัก",
  "/user": "จัดการผู้ใช้งาน",
  "/role": "สิทธิ์การใช้งาน",
};

function getPageTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) {
    return PAGE_TITLES[pathname];
  }

  const matchedKey = Object.keys(PAGE_TITLES)
    .filter((key) => key !== "/")
    .sort((a, b) => b.length - a.length)
    .find((key) => (pathname === key || pathname.startsWith(`${key}/`)));

  return matchedKey ? PAGE_TITLES[matchedKey] : "Backoffice";
}

type AppNavbarProps = {
  title?: string;
};

function UserMenu() {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data, error, isLoading } = useFetch<Session | null>(sessionKey, {
    revalidateOnFocus: true,
    refreshInterval: 60000,
    shouldRetryOnError: false,
  });
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const signingOut = useRef(false);

  const handleSignOut = async () => {
    if (signingOut.current) return;
    signingOut.current = true;
    setIsSigningOut(true);
    setLogoutError(null);
    try {
      await signOut();
    } catch (error) {
      setLogoutError(getApiError(error));
      signingOut.current = false;
      setIsSigningOut(false);
      return;
    }
    await mutate(sessionKey, null, { revalidate: false });
    await mutate(
      (key) => typeof key === "string" && key.startsWith("/users/"),
      undefined,
      { revalidate: false },
    );
    router.replace("/");
    signingOut.current = false;
    setIsSigningOut(false);
  };

  if (!data || error) return (
    <p className="text-sm" role="status">
      {isLoading ? "กำลังโหลดบัญชี..." : error ? "ตรวจสอบบัญชีไม่สำเร็จ" : "ยังไม่ได้เข้าสู่ระบบ"}
    </p>
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<button type="button" aria-label="เมนูบัญชีผู้ใช้งาน" />} className="group rounded-md p-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end gap-1">
                <p className="max-w-40 truncate text-sm font-semibold text-primary sm:max-w-64 sm:text-lg" title={data.user.name}>{data.user.name || data.user.email}</p>
                {data.user.company && <p className="max-w-40 truncate font-sarabun text-sm text-foreground sm:max-w-64 sm:text-base">{data.user.company}</p>}
              </div>
              <ChevronDown className="size-4 shrink-0 cursor-pointer text-primary transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180 hover:text-primary/80" />
            </div>
          
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            disabled={isSigningOut}
            onClick={() => void handleSignOut()}
          >
            <LogOut className="size-4" />
            {isSigningOut ? "กำลังออกจากระบบ..." : "ออกจากระบบ"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {logoutError && <p role="alert" className="mt-1 text-sm text-error">{logoutError}</p>}
    </>
  );
}

export function AppNavbar({ title }: Readonly<AppNavbarProps>) {
  const pathname = usePathname();
  const pageTitle = title ?? getPageTitle(pathname);

  return (
    <div className="sticky top-1.5 z-20">
      <header className="flex flex-row items-center justify-between h-[70px] gap-4 rounded-2xl border border-border bg-white px-4 py-3 sm:px-6">
        <h1 className="font-noto-thai text-base font-bold text-foreground sm:text-lg">{pageTitle}</h1>
        <div>
          <UserMenu />
        </div>
      </header>
    </div>
  );
}
