import React, {useState, useEffect} from 'react'

const ContributionSection = ({contributions}) => {

    const listContributions = contributions.map((contribution, index) => <div key={contribution.id}>
        <h1>{index + 1}</h1>
        <h2>{contribution.amount}</h2>
        <h2>Paid: {contribution.is_paid ? 'Yes' : 'No'}</h2>
        <h2>Date Paid: {contribution.date_paid}</h2>
    </div>)

    return (
        <div className='px-8 py-4 bg-white rounded-sm flex flex-col gap-4 min-h-[50vh] flex-1'>
            <h1 className='font-semibold text-zinc-400 text-md text-center'>Contributions</h1>
            <hr className="border-t border-2 border-zinc-300 my-[2vh]" />

            {listContributions}
        </div>
    )
}

export default ContributionSection
