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
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

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

  const openModal = (id: number) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };

  const confirmDelete = async () => {
    if (!selectedUserId) return;

    try {
      await deleteUser(selectedUserId);

      setUsers((prev) =>
        prev.filter((user) => user.id !== selectedUserId)
      );

      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const modalStyle: React.CSSProperties = {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
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
                  <button onClick={() => openModal(user.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <p>Are you sure you want to delete this user?</p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={confirmDelete}>Yes, delete</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
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
