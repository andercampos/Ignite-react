import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { api } from '../../services/api';
import type { ApiUser, GetUsersResponse } from '../../types/User';

export const getUsers = async (page: number): Promise<GetUsersResponse> => {
  const { data, headers } = await api.get('/users', {
    params: {
      page,
    },
  });

  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map((user: ApiUser) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.created_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }));

  return { users, totalCount };
};

export const useUsers = (page: number, options?: UseQueryOptions) => {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  }) as UseQueryResult<GetUsersResponse, unknown>;
};
