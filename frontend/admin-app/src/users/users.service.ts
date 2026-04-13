import apiClient from '../shared/api/client';

export const getUsers = async (page = 1) => {
  const res = await apiClient.get(`/users?page=${page}`);

  return res.data.data; // items + pagination
};
