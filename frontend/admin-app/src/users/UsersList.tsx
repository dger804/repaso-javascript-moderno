import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getUsers } from './users.service';
import { deleteUser } from './users.service';

type User = {
  id: number;
  email: string;
  role: string;
  name?: string | null;
};

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers(page);
        setUsers(data.items);
        setTotalPages(data.lastPage);
      } catch (err) {
        console.error(err);
      }
    };

    loadUsers();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure?');

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      // 🔥 actualizar lista sin recargar
      setUsers((prev) => prev.filter((user) => user.id !== id));

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Users</h2>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.name || '-'}</td>
              <td>{user.role}</td>
              <td>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link to={`/users/${user.id}/edit`}>Edit</Link>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '10px' }}>
        <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
        >
            Previous
        </button>

        <span style={{ margin: '0 10px' }}>
            Page {page} of {totalPages}
        </span>

        <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
        >
            Next
        </button>
      </div>  
    </div>
  );
}
