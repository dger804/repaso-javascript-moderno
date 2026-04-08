const API_URL = import.meta.env.VITE_API_URL;

export const getUsers = async () => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Error fetching users');
  }

  const data = await res.json();

  return data.data.items;
};
