import { useEffect, useState } from 'react'
import { fetchUsers } from '../services/userService'

export function useUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
      .then(data => setUsers(data))
      .finally(() => setLoading(false))
  }, [])

  return { users, loading }
}
