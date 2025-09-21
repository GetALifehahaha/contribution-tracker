import React from 'react'
import Form from '../components/Form'
import FormDesign from '../components/FormDesign'

const Login = () => {
  return (
    <div className='w-full h-[100vh] bg-zinc-300 flex justify-center items-center'>
      <div className='p-4 bg-white rounded-3xl flex flex-row'>
        <FormDesign/>
        <Form route={'/api/token/'} method='login'/>
      </div>
    </div>
  )
}

export default Login