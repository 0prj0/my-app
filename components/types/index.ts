import type { AxiosInstance } from "axios";

export { isAxiosError } from "axios";
export type Fetcher = AxiosInstance;

export interface SWRHooksConfig {
  fetcher?: Fetcher;
  swrConfig?: import("swr").SWRConfiguration;
}