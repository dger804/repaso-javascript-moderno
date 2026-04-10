import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './auth/Login';
import Dashboard from './dashboard/Dashboard';
import ProtectedRoute from './auth/ProtectedRoute';
import UsersList from './users/UsersList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <UsersList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;