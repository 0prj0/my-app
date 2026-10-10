export type UserRole = "admin" | "user";

export type UserList = {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  company: string;
  companyImageUrl?: string | null;
  role: UserRole;
  status: boolean;
};

export type UserListResponse = {
  data: UserList[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

