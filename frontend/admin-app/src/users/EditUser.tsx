import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getUsers, updateUser } from './users.service';

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUsers();

      const user = data.items.find((u: any) => u.id === Number(id));

      if (user) {
        setEmail(user.email);
        setRole(user.role);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateUser(Number(id), { email, role });
      navigate('/users');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Edit User</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
        </select>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}