import { useNavigate } from 'react-router-dom';

import { useAuth } from '../auth/AuthContext';

export default function Dashboard() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
