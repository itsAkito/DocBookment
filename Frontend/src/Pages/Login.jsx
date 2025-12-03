import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext, useAppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify';


const Login = () => {
  const navigate = useNavigate()
  const [state, setState] = useState("Login")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const { backendUrl, token, setToken} = useAppContext(AppContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    console.log('submitting login with:', email, password)
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Registration successful')
          navigate('/')
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email, password,
        });
        console.log('Login response:', data);
        if (data.success && data.token) {
          localStorage.setItem('token', data.token);
          setToken(data.token)
          toast.success('login successful')
          navigate('/')
        } else {
          toast.error(data.message || "login failed")
        }
      }
    } catch (error) {
      console.error(error.message)
      toast.error(error.message || 'something went wrong');

    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && window.location.pathname==='/login') {
      setToken(storedToken);
      navigate('/')
    }
  }, [])
  return (
    <div className='max-w-md mx-auto mt-20 p-6 bg-gradient-to-r from-indigo-400 to-blue-200 rounded shadow mb-20'>
      <h2 className='flex items-center justify-center text-2xl font-bold mb-4 text-blue-600'>
        {state === 'Login' ? 'Login' : 'Create Account'}
      </h2>
      <form onSubmit={handleSubmit} className='mt-5 space-y-5'>
        {state === 'Sign Up' && (
          <label htmlFor='name' className='block mb-6'>
            <span className='text-sm'>Full Name</span>
            <input className='w-full border-2 border-indigo-500  px-3 py-2 rounded'
              type='text'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)} />
          </label>
        )}
        <label htmlFor='email' className='block mb-6'>
          <span className='text-sm'>Email</span>
          <input className='w-full border-2 border-indigo-500 px-3 py-2 rounded'
            type='email'
            name='email'
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </label>
        <label htmlFor='password' className='block mb-8'>
          <span className='text-sm'>Password</span>
          <input
            type='password'
            name='password'
            className='w-full border-2 border-indigo-500  px-3 py-2 rounded'
            value={password}
            onChange={e => setPassword(e.target.value)} />
        </label>
        <button type='submit'
          disabled={loading}
          className='w-full bg-blue-600 text-white py-2 rounded hover:scale-105 cursor-pointer'>
          {loading ? 'Processing...' : state}
        </button>
        <p>
          {state === 'Login' ? (
            <>
              Don't have an account? Sign Up
              <span onClick={() => setState('Sign Up')} className='text-blue-700 cursor-pointer underline'>Create one</span>
            </>
          ) : (
            <>
              Already have an account? Login
              <span onClick={() => setState('Login')} className='text-blue-700 cursor-pointer underline'>Login</span>
            </>
          )
          }
        </p>
      </form>
    </div>
  )
}

export default Login


