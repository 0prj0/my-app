"use client";

import useSWR from "swr";
import type { SWRConfiguration } from "swr";

export function useFetch<T = unknown>(
  key: string | null,
  config?: SWRConfiguration,
) {
  return useSWR<T>(key, config);
}