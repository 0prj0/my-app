"use client";

import { ChevronDown, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<button type="button" aria-label="เมนูบัญชีผู้ใช้งาน" />} className="group rounded-md p-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end gap-1">
                <p className="text-sm font-semibold text-primary sm:text-lg">Kawin Metsiritrakul</p>
                <p className="font-sarabun text-sm text-foreground sm:text-base">DDEXP</p>
              </div>
              <ChevronDown className="size-4 shrink-0 cursor-pointer text-primary transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180 hover:text-primary/80" />
            </div>
          
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            //onClick={() => setIsLogoutConfirmOpen(true)}
          >
            <LogOut className="size-4" />
            ออกจากระบบ
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <LogoutConfirmModal
        open={isLogoutConfirmOpen}
        onOpenChange={setIsLogoutConfirmOpen}
      /> */}
    </>
  );
}

export function AppNavbar({ title }: Readonly<AppNavbarProps>) {
  const pathname = usePathname();
  const pageTitle = title ?? getPageTitle(pathname || "/");

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