import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-3xl font-semibold">ยินดีต้อนรับ</h1>
      <Link href="/user" className="rounded-lg bg-primary px-5 py-3 text-white hover:bg-primary/90">
        จัดการผู้ใช้งาน
      </Link>
    </section>
  );
}
