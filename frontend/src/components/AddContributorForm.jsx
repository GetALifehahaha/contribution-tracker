import React, {useState, useEffect} from 'react'
import { AddContributor } from '../services/ContributorsServices';
import {motion, AnimatePresence} from 'framer-motion'

const AddContributorForm = ({onContributorAdded}) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleAddContributor = () => {
        AddContributor(firstName, lastName)
        .then(resp => {
            console.log(resp);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            onContributorAdded();
        })
    }

    return (
        <motion.div className='bg-white p-4 rounded-sm flex flex-col gap-2 h-min'
        >
            <h1 className='font-semibold text-zinc-400 text-md text-center'>Add Contributor Form</h1>
            <hr className="border-t border-2 border-zinc-300 my-[5%]" />
            
            <input 
            type="text" 
            id='firstname' 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            placeholder='First name'
            className='border-2 text-sm border-zinc-300 p-4 rounded-lg placeholder:font-semibold placeholder:text-zinc-600 font-semibold text-zinc-800 focus:border-zinc-400 focus:outline-none'
            />

            <input 
            type="text" 
            id='lastname' 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            placeholder='Last name'
            className='border-2 text-sm border-zinc-300 p-4 rounded-lg placeholder:font-semibold placeholder:text-zinc-600 font-semibold text-zinc-800 focus:border-zinc-400 focus:outline-none'
            />
            <hr className="border-t border-2 border-zinc-300 my-[5%]" />

            <button 
            type='submit' className='rounded-4xl bg-red-600 py-2 mt-auto font-semibold text-white cursor-pointer' 
            onClick={handleAddContributor}>Add Contributor</button>
        </motion.div>
    )
}

export default AddContributorForm