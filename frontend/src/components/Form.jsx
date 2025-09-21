// import => set state variables => content variables

import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../api/constants'

const Form = ({route, method }) => {

  // state variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // prepare content variables

  const title = method == 'login' ? 'Login' : 'Register'

  // const prep post request

  const handleSubmitRequest = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, {username, password});

      if (method == 'login') {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className='bg-white px-4 py-8 rounded-md flex flex-col gap-4' onSubmit={handleSubmitRequest}>
      <h1 className='mx-auto font-bold text-2xl tracking-tight'>{title}</h1>

      <div className='flex flex-col gap-2'>
        <label 
        htmlFor='username'
        className='font-semibold text-zinc-800'
        >Username</label>
        <input 
        type="text" 
        id='username' 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder='Enter your username here'
        className='border-b-2 border-zinc-400 pb-2'
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label 
        htmlFor='password'
        className='font-semibold text-zinc-800'
        >Password</label>
        <input 
        type="text" 
        id='password' 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder='Enter your password here'
        className='border-b-2 border-zinc-400 pb-2'
        />
      </div>

      <button type='submit'>{title}</button>
    </form>
  )
}

export default Form
