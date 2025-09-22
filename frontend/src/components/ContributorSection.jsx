import React, { useEffect } from 'react'
import {motion} from 'framer-motion'

const ContributorSection = ({contributors, onContributorClick}) => {

    const listContributors = contributors.map((contributor, index) => 
        <motion.div 
        whileHover={{
            backgroundColor: "#f0f0f0"
        }}

        key={contributor.id} 
        className='flex flex-col gap-2 p-2 bg-white relative shadow rounded-sm cursor-pointer
                    before:content-[""] before:h-[20%] before:aspect-square before:bg-blue-600 before:rounded-full
                    before:left-0 before:top-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:absolute
                    '>
            <h5 className='font-semibold text-sm text-zinc-300'>{index + 1}</h5>

            <div className='flex flex-row gap-2 mx-10'>
                <h1 className='font-medium text-zinc-800'>{contributor.first_name}</h1>
                <h1 className='font-medium text-zinc-800'>{contributor.last_name}</h1>
            </div>

            <h5 className='font-medium text-zinc-400'>Balance: <strong className='font-semibold text-zinc-800'>{contributor.balance}</strong></h5>
        </motion.div>
    )

    return (
        <div className='px-8 py-4 bg-white rounded-sm flex flex-col gap-4 min-h-[80vh] min-w-[15vw]'>
            <h1 className='font-semibold text-zinc-400 text-md'>Contributor Section</h1>
            <hr className="border-t border-2 border-zinc-300 my-[2vh]" />

            {listContributors}
            <button onClick={() => onContributorClick(2)}>Click me to change</button>
        </div>
    )
}

export default ContributorSection