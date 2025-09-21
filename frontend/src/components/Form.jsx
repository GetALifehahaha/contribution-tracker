// import => set state variables => content variables

import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../api/constants'

const Form = ({route, method }) => {

  // state variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // prepare content variables

  const title = method == 'login' ? 'Tracer' : 'Register'
  const welcomeMessage = method == 'login' ? 'Welcome back, Leader' : 'Hello, new Leader'
  const welcomeMessageAdditional = method == 'login' ? "Let's get back to business!" : "Welcome to Tracer!"
  const submitButtion = method == 'login' ? 'Login' : 'Register' 
  const redirectLink = method == 'login' ? 
    (<h5 className='ml-auto text-zinc-600'>New to Tracer? Click this to {<Link className='text-red-500 font-semibold' to='/register'>register</Link>}</h5>) : 
    (<h5 className='ml-auto text-zinc-600'>Already have an account? Click here to {<Link className='text-red-500 font-semibold' to='/login'>login</Link>}</h5>)

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
    <form className='bg-white px-8 py-2 flex flex-col gap-4 w-[50%] h-full' onSubmit={handleSubmitRequest}>
      <h1 className='mr-auto font-extrabold text-xl text-gray-700 mb-[10%]'>{title}</h1>

      <h3 className='mx-auto font-bold tracking-tighter text-4xl'>{welcomeMessage}</h3>
      <h3 className='mx-auto font-semibold text-zinc-500 mb-[5%] -mt-4'>{welcomeMessageAdditional}</h3>

      <div className='flex flex-col gap-2'>
        {/* <label 
        htmlFor='username'
        className='font-semibold text-zinc-800'
        >Username</label> */}
        <input 
        type="text" 
        id='username' 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder='Username'
        className='border-2 text-sm border-zinc-300 p-4 rounded-lg placeholder:font-semibold placeholder:text-zinc-600 font-semibold text-zinc-800 focus:border-zinc-400 focus:outline-none'
        />
      </div>

      <div className='flex flex-col gap-2'>
        {/* <label 
        htmlFor='password'
        className='font-semibold text-zinc-800'
        >Password</label> */}
        <input 
        type="text" 
        id='password' 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder='Email'
        className='border-2 text-sm border-zinc-300 p-4 rounded-lg placeholder:font-semibold placeholder:text-zinc-600 font-semibold text-zinc-800 focus:border-zinc-400 focus:outline-none'
        />
      </div>

      <div className='w-full h-0.5 my-[5%] bg-zinc-300 content-none rounded-sm'></div>

      <button type='submit' className='rounded-4xl bg-red-600 py-4 mt-auto font-semibold text-white'>{submitButtion}</button>

      {redirectLink}
    </form>
  )
}

export default Form
