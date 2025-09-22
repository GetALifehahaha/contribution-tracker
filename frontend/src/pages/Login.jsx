import React from 'react'
import Form from '../components/Form'
import FormDesign from '../components/FormDesign'
import {motion} from 'framer-motion'

const Login = () => {
  return (
    <div className='w-full h-[100vh] bg-zinc-300 flex justify-center items-center'>
      <motion.div
      initial={{
        y: 10,
      }}
      animate={{
        y: 0
      }}
      transition={{
        ease: 'easeInOut'
      }}
      className='p-4 bg-white rounded-3xl flex flex-row w-[70vw] h-[75vh]'>
        <FormDesign/>
        <Form route={'/api/token/'} method='login'/>
      </motion.div>
    </div>
  )
}

export default Login