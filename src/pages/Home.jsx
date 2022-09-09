import { useState, useCallback, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { useHttpClient } from '../hooks/httpHook'

function Home() {
  const [battles, setBattles] = useState([])

  const { isLoading, sendRequest } = useHttpClient()

  const fetchBattles = useCallback(async () => {
    try {
      const responseData = await sendRequest('/battles/student')
      setBattles(responseData.battles)
    } catch (err) {
      console.log(err)
    }
  }, [sendRequest, setBattles])

  useEffect(() => {
    fetchBattles()
  }, [fetchBattles])

  return (
    <div className='px-4 mt-4'>
      <div className='mt-4 text-white '>
        {isLoading && <p>Loading...</p>}
        {battles.length === 0 && !isLoading && (
          <p className='text-2xl font-bold tracking-tight text-slate-100'>
            No Battles Found
          </p>
        )}
        {battles.length > 0 && (
          <div className='grid gap-2 grid-auto-fit'>
            {battles.map(battle => (
              <div
                className='max-w-sm bg-secondary  rounded-lg border border-tertiary shadow-md '
                key={battle._id}
              >
                <div className='p-5'>
                  <h5 className='mb-2 text-2xl font-bold tracking-tight text-slate-100'>
                    {battle.title}
                  </h5>

                  <p className='mb-3 font-normal text-slate-200 '>
                    {battle.description}
                  </p>

                  <p className='mb-3 font-normal text-slate-400 '>
                    {new Date(battle.startTime).toLocaleString()} to{' '}
                    {new Date(battle.endTime).toLocaleString()}
                  </p>
                  <Link to={`/battle/${battle._id}`}>
                    <button className='py-2 px-4 mr-3 text-md font-medium text-white focus:outline-none rounded-lg border border-tertiary hover:bg-slate-300 hover:text-tertiary focus:z-10 focus:ring-2 focus:ring-primary '>
                      Battle!
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
