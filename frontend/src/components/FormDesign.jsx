import React from 'react'
import FormImage from '../assets/form-design-background.png'

const FormDesign = () => {

    // const title = method ? 'Contribution Tracker' : 'Registration'
    
    return (
        <div className='w-[40vw] h-[80vh] bg-white rounded-2xl overflow-hidden'>
            <img src={FormImage} alt="form-design-photo" className='w-full h-full object-cover'/>
        </div>
    )
}

export default FormDesign
