import React from 'react'
import FormImage from '../assets/form-design-background.png'
import {motion} from 'framer-motion'

const FormDesign = () => {

    // const title = method ? 'Contribution Tracker' : 'Registration'
    
    return (
        <motion.div
        initial={{
            y: -100,
            opacity: 0,
            scaleY: 1.05
        }}
        animate={{
            y: 0,
            opacity: 1,
            scaleY: 1
        }}
        transition={{
            duration: 2,
            delay: .2,
            ease: 'backInOut'
        }}
        className='w-[50%] h-full bg-white rounded-2xl overflow-hidden'>
            <img src={FormImage} alt="form-design-photo" className='w-full h-full object-cover'/>
        </motion.div>
    )
}

export default FormDesign
