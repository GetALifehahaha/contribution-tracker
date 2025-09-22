import React, {useEffect, useState} from 'react'
import { FetchContributors } from '../services/ContributorsServices'
import ContributorSection from '../components/ContributorSection';
import AddContributorForm from '../components/AddContributorForm';
import ContributionSection from '../components/ContributionSection';
import { Link } from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion'

const Home = () => {

  // set state variables
  const [contributors, setContributors] = useState([]);
  const [isAddContributorFormShown, setIsAddContributorFormShown] = useState(false);

  // run the fetch function on render

  const fetchContributorsFunc = async () => {

    try {
      const resp = await FetchContributors();
      setContributors(resp.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchContributorsFunc();
  }, [])

  // 
  const handleContributorAdded = () => {
    fetchContributorsFunc();
  }

  return (
    <div className='w-full max-h-[100vh] bg-zinc-300 flex gap-2 p-2'>
      <Link className='px-4 py-1 rounded-4xl bg-red-500 font-medium text-white absolute right-0 top-0 m-4' to={'/logout'}>Log Out</Link>
      <div className='rounded-sm flex flex-col gap-2 overflow-auto [direction: rtl] max-h-[100vh]'>
          <ContributorSection contributors={contributors} />
          <AddContributorForm onContributorAdded={() => handleContributorAdded()}/>
      </div>
      <ContributionSection />
    </div>
  )
}

export default Home

