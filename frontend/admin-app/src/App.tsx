import { useAuth } from './auth/AuthContext';

function App() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {user ? (
        <p>Bienvenido {user.email}</p>
      ) : (
        <p>No autenticado</p>
      )}
    </div>
  );
}

export default App;