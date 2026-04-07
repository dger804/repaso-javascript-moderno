import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import Login from './features/auth/Login';
//import Dashboard from './features/dashboard/Dashboard';
import ProtectedRoute from './auth/ProtectedRoute';
import Login from './auth/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;