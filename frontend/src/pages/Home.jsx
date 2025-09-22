import React, {useEffect, useState} from 'react'
import { FetchContributors } from '../services/ContributorsServices'
import ContributorSection from '../components/ContributorSection';
import AddContributorForm from '../components/AddContributorForm';

const Home = () => {

  // set state variables
  const [contributors, setContributors] = useState([]);

  // run the fetch function on render

  const fetchContributorsFunc = async () => {
    // FetchContributors()
    // .then(resp => {
    //   setContributors(resp.data);
    // })
    // .catch(err => {
    //   console.log(err)
    // })

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
    <div className='w-full h-[100vh] bg-zinc-300 flex justify-center items-center'>
      <div className='bg-white p-2 rounded-sm flex flex-col'>
        <ContributorSection contributors={contributors} />
        <AddContributorForm onContributorAdded={() => handleContributorAdded()}/>
      </div>
    </div>
  )
}

export default Home
