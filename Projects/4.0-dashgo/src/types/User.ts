export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export type ApiUser = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

export type GetUsersResponse = {
  totalCount: number;
  users: User[];
};
