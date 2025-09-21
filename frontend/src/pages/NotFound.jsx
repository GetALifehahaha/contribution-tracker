import React from 'react'

const NotFound = () => {
  return (
    <div className='w-full h-[100vh] flex flex-col gap-2 justify-center items-center bg-gradient-to-b via-white to-zinc-50'>
      <span className='font-semibold text-4xl flex gap-2'>
        <h1 className='text-zinc-600 font-semibold'>404</h1>
        <h1 className='text-zinc-900 font-semibold'> Not Found</h1>
      </span>
      <p className='font-semibold text-zinc-500'>The page you're looking for doesn't exist</p>
    </div>
  )
}

export default NotFound