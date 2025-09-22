import React from 'react'
import Form from '../components/Form'
import FormDesign from '../components/FormDesign'
import {motion} from 'framer-motion'

const Register = () => {
  return (
    <div className='w-full h-[100vh] bg-zinc-300 flex justify-center items-center'>
      <motion.div
      initial={{
        y: 20,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        ease: 'easeIn'
      }}
      className='p-4 bg-white rounded-3xl flex flex-row w-[70vw] h-[75vh]'>
        <FormDesign/>
        <Form route='/api/user/register/' method='register' />
      </motion.div>
    </div>
  )
}

export default Register
