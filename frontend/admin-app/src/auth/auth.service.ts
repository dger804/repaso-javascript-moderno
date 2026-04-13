import apiClient from '../shared/api/client';

export const login = async (email: string, password: string) => {
  const res = await apiClient.post('/auth/login', { email, password });

  const token = res.data.data.access_token;
  localStorage.setItem('token', token);

  return token;
};

export const getMe = async () => {
  const res = await apiClient.get('/auth/me');
  return res.data.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
