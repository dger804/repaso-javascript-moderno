import { Navigate } from 'react-router-dom';

import { useAuth } from './AuthContext';

type Props = {
  children: React.ReactNode;
  requiredRole?: string;
};

export default function ProtectedRoute({ children, requiredRole }: Props) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}