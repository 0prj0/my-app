export type UserRole = "admin" | "user";

export type UserList = {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  company: string;
  companyImageUrl?: string | null;
  role: UserRole;
  status: boolean;
};

// Demo records only; replace with API data when the backend is available.
export const MOCK_DATA: UserList[] = Array.from({ length: 24 }, (_, index) => ({
  id: index + 1,
  firstName: "สมหมาย",
  lastName: "สายสืบ",
  name: "สมหมาย สายสืบ",
  email: `user${index + 1}@example.com`,
  company: "บริษัท DDEXP จำกัด",
  companyImageUrl: null,
  role: "admin",
  status: true,
}));

