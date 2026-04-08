import { useAuth } from '../auth/AuthContext';
import UsersList from '../users/UsersList';

export default function Dashboard() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <UsersList/>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
