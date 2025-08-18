import axios from 'axios'
import React, { useState } from 'react'
import { backendURL } from '../App'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState(localStorage.getItem('savedEmail') || '')
  const [password, setPassword] = useState(localStorage.getItem('savedPassword') || '')
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(`${backendURL}/api/user/admin`, { email, password })
      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('savedEmail', email)
        localStorage.setItem('savedPassword', password)
        toast.success("Logged in successfully!")
      } else {
        toast.error(response.data.message || "Login failed")
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='bg-white shadow-lg rounded-xl px-8 py-8 max-w-md w-full'>
        <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
          <div>
            <label className='text-sm font-medium text-gray-700 mb-1 block'>Email Address</label>
            <input
              type="email"
              placeholder='your@gmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'
              required
            />
          </div>
          <div>
            <label className='text-sm font-medium text-gray-700 mb-1 block'>Password</label>
            <input
              type="password"
              placeholder='********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'
              required
            />
          </div>
          <button
            type='submit'
            disabled={loading}
            className='w-full py-2 mt-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
