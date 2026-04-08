import { loginRequest, getMeRequest } from './auth.api';

export const login = async (email: string, password: string) => {
  const data = await loginRequest(email, password);

  localStorage.setItem('token', data.access_token);

  return data;
};

export const getMe = async () => {
  const token = localStorage.getItem('token');

  if (!token) throw new Error('No token');

  return getMeRequest(token);
};

export const logout = () => {
  localStorage.removeItem('token');
};
