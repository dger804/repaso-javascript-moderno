import { useEffect, useState } from 'react';

import { getUsers, deleteUser } from './users.service';
import  Modal from '../shared/components/Modal'
import { updateUser } from './users.service';

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState('');

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
  }, [page]);

  useEffect(() => {
    if (editingUser) {
      setEditEmail(editingUser.email);
      setEditRole(editingUser.role);
    }
  }, [editingUser]);

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

      if (users.length === 1 && page > 1) {
        setPage(page - 1);
      }

      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setIsEditModalOpen(false);
  };

  const handleUpdate = async () => {
    if (!editingUser) return;

    try {
      await updateUser(editingUser.id, {
        email: editEmail,
        role: editRole,
      });

      // 🔥 actualizar tabla sin refetch
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? { ...u, email: editEmail, role: editRole }
            : u
        )
      );

      closeEditModal();
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
                  <button onClick={() => openEditModal(user)}>
                    Edit
                  </button>
                  <button onClick={() => openModal(user.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={showModal} onClose={closeModal}>
        <p>Are you sure you want to delete this user?</p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button
            onClick={confirmDelete}
            style={{ background: 'red', color: 'white' }}
          >
            Yes, delete
          </button>

          <button onClick={closeModal}>Cancel</button>
        </div>
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <h3>Edit User</h3>

        <input
          value={editEmail}
          onChange={(e) => setEditEmail(e.target.value)}
        />

        <select
          value={editRole}
          onChange={(e) => setEditRole(e.target.value)}
        >
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
        </select>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={closeEditModal}>Cancel</button>
        </div>
      </Modal>
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
