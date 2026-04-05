import { Link, Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <>
      <nav style={{ padding: '10px', background: '#222' }}>
        <Link style={{ color: 'white', marginRight: '10px' }} to="/">Home</Link>
        <Link style={{ color: 'white' }} to="/users">Usuarios</Link>
      </nav>

      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </>
  )
}
