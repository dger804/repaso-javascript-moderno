import { useUsers } from '../hooks/useUsers'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function Users() {
  const { user } = useContext(AppContext)
  const { users, loading } = useUsers()

  if (loading) return <p>Loading users...</p>

  return (
    <>
      <h1>Users</h1>
      <p>Global user: {user ?? 'None'}</p>

      <ul>
        {users.map(u => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </>
  )
}
