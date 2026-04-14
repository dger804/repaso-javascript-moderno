import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './auth/Login';
import Dashboard from './dashboard/Dashboard';
import ProtectedRoute from './auth/ProtectedRoute';
import UsersList from './users/UsersList';
import EditUser from './users/EditUser';

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
        <Route
          path="/users/:id/edit"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <EditUser />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;