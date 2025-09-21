import React from 'react'
import Form from '../components/Form'

const Login = () => {
  return (
    <div className='w-full h-[100vh] bg-zinc-300 flex justify-center items-center'>
      <Form route={'/api/token/'} method='login'/>
    </div>
  )
}

export default Login