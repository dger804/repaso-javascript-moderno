import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function Home() {
  const { user, setUser } = useContext(AppContext)

  return (
    <>
      <h1>Home</h1>

      <button onClick={() => setUser('Diego')}>
        Login
      </button>

      {user && <p>Current user: {user}</p>}
    </>
  )
}
