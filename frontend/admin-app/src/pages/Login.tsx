import { useState } from 'react';
import { loginRequest } from '../api/api';
import { saveToken } from '../auth/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginRequest(email, password);

      saveToken(data.access_token);

      console.log('Login OK', data);

      // luego redirigimos (más adelante)
    } catch (err) {
      console.error(err);
      alert('Credenciales incorrectas');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login Admin</h2>

      <input
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}