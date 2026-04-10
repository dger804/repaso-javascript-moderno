import { Link } from 'react-router-dom';

import { useAuth } from '../auth/AuthContext';
import UsersList from '../users/UsersList';

export default function Dashboard() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        {user?.role === 'ADMIN' && (        
          <Link to="/users">Go to Users</Link>
        )}
      </div>      
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
