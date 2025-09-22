import React, {useEffect, useState} from 'react'
import { FetchContributors } from '../services/ContributorsServices'
import { FetchContributions } from '../services/ContributionsServices';
import ContributorSection from '../components/ContributorSection';
import AddContributorForm from '../components/AddContributorForm';
import ContributionSection from '../components/ContributionSection';
import { Link } from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion'

const Home = () => {

  // set state variables
  const [contributors, setContributors] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [contributorId, setContributorId] = useState(1);
  
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

  const fetchContributionsFunc = async () => {
    try {
      const resp = await FetchContributions(contributorId);
      setContributions(resp.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchContributorsFunc();
    fetchContributionsFunc();
  }, [])

  // 
  const handleContributorAdded = () => {
    fetchContributorsFunc();
  }

  const handleSetContributorId = (id) => {
    setContributorId(id);
  }

  return (
    <div className='w-full max-h-[100vh] bg-zinc-300 flex gap-2 p-2'>
      <Link className='px-4 py-1 rounded-4xl bg-red-500 font-medium text-white absolute right-0 top-0 m-4' to={'/logout'}>Log Out</Link>
      <div className='rounded-sm flex flex-col gap-2 overflow-auto [direction: rtl] max-h-[100vh]'>
          <ContributorSection contributors={contributors} />
          <AddContributorForm onContributorAdded={() => handleContributorAdded()}/>
      </div>
      <ContributionSection contributions={contributions} onContributorClick={(id) => handleSetContributorId(id)}/>
    </div>
  )
}

export default Home

