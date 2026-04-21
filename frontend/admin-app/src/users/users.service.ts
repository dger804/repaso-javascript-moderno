import apiClient from '../shared/api/client';

export const getUsers = async (page = 1) => {
  const res = await apiClient.get(`/users?page=${page}`);

  return res.data.data; // items + pagination
};

export const updateUser = async (id: number, data: any) => {
  const res = await apiClient.patch(`/users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: number) => {
  const res = await apiClient.delete(`/users/${id}`);
  return res.data;
};
