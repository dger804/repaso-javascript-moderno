const API_URL = import.meta.env.VITE_API_URL;

export const loginRequest = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error('Login failed');
  }

  const json = await res.json();

  return json.data;
};

export const getMeRequest = async (token: string) => {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Unauthorized');

  return res.json();
};
