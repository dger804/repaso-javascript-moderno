import { useEffect, useState } from 'react';

import { getUsers } from './users.service';

type User = {
  id: number;
  email: string;
  role: string;
};

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.email} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
