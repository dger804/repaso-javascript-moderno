import { useState } from 'react'
import { useForm } from '../hooks/useForm'

export default function Register() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  function validate(values) {
    const errors = {}
    if (!values.name.trim()) errors.name = 'Name is required'
    if (!values.email.includes('@')) errors.email = 'Invalid email'
    if (values.password.length < 6) errors.password = 'Min 6 characters'
    return errors
  }

  async function submit(values) {
    try {
      setStatus('submitting')
      await new Promise(r => setTimeout(r, 800)) // simula API
      console.log('Submit:', values)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const { values, errors, handleChange, handleSubmit } =
    useForm({ name: '', email: '', password: '' }, validate)

  return (
    <form onSubmit={handleSubmit(submit)}>
      <h1>Register</h1>

      <input name="name" placeholder="Name" value={values.name} onChange={handleChange} />
      {errors.name && <small>{errors.name}</small>}

      <input name="email" placeholder="Email" value={values.email} onChange={handleChange} />
      {errors.email && <small>{errors.email}</small>}

      <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} />
      {errors.password && <small>{errors.password}</small>}

      <button disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Submit'}
      </button>

      {status === 'success' && <p style={{ color: 'green' }}>✔ Registered successfully</p>}
      {status === 'error' && <p style={{ color: 'red' }}>✖ Something went wrong</p>}
    </form>
  )
}
