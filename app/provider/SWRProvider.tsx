"use client";

import type { ReactNode } from "react";
import { SWRConfig } from "swr";
import { api } from "@/lib/api";

const swrConfig = {
  fetcher: (url: string) =>
    api.get(url).then((response) => response.data),
  revalidateOnFocus: false,
  dedupingInterval: 2000,
};

export function SWRProvider({ children }: { children: ReactNode }) {
  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
}