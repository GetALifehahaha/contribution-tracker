// import => set state variables => content variables

import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../api/constants'
import {motion, AnimatePresence, stagger, transform} from 'framer-motion'

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
  const submitButton = method == 'login' ? 'Login' : 'Register' 
  const redirectLink = method == 'login' ? 
    (<h5 className='text-sm ml-auto text-zinc-600'>New to Tracer? Click this to {<Link className='text-red-500 font-semibold' to='/register'>register</Link>}</h5>) : 
    (<h5 className='text-sm ml-auto text-zinc-600'>Already have an account? Click here to {<Link className='text-red-500 font-semibold' to='/login'>login</Link>}</h5>)

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

  const formContentAnimation = {
    hidden: {
      opacity: 0,
      y: 5
    },
    show: {
      opacity: 1,
      y: 0,

      transition: {
        ease: 'easeIn',
      }
    }
  }

  return (
    <motion.form className='bg-white px-8 py-2 flex flex-col gap-4 w-[50%] h-full' 
    onSubmit={handleSubmitRequest}
    variants={{
      hidden: {
        opacity: 0,
        y: 5
      },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          ease: 'easeIn',
          delayChildren: stagger(0.2)
        }
      }
    }}
    initial="hidden"
    animate="show">
      <h1 className='mr-auto font-extrabold text-xl text-gray-700 mb-[10%]'>{title}</h1>

      <motion.h3 
      variants={formContentAnimation}
      className='mx-auto font-bold tracking-tighter text-4xl text-center'>{welcomeMessage}</motion.h3>
      <motion.h3
      variants={formContentAnimation}
       className='mx-auto font-semibold text-zinc-500 mb-[5%] -mt-4'>{welcomeMessageAdditional}</motion.h3>

      <motion.div 
      variants={formContentAnimation}
      className='flex flex-col gap-2'>
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
      </motion.div>

      <motion.div 
      variants={formContentAnimation}
      className='flex flex-col gap-2'>
        {/* <label 
        htmlFor='password'
        className='font-semibold text-zinc-800'
        >Password</label> */}
        <input 
        type="password" 
        id='password' 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder='Password'
        className='border-2 text-sm border-zinc-300 p-4 rounded-lg placeholder:font-semibold placeholder:text-zinc-600 font-semibold text-zinc-800 focus:border-zinc-400 focus:outline-none'
        />
      </motion.div>

      <hr className="border-t border-2 border-zinc-300 my-[5%]" />

      <motion.button
      variants={formContentAnimation}
      type='submit' className='rounded-4xl bg-red-600 py-4 mt-auto font-semibold text-white'>{submitButton}</motion.button>

      <motion.div
      variants={formContentAnimation}
      className='ml-auto'>
        {redirectLink}
      </motion.div>
    </motion.form>
  )
}

export default Form
