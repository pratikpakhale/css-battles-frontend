import React, { useEffect, useCallback, useState } from 'react'

import { useHttpClient } from '../../hooks/httpHook'

import BattleCard from './BattleCard'

function BattleCards() {
  const [battles, setBattles] = useState([])
  const { isLoading, sendRequest } = useHttpClient()

  const fetchBattles = useCallback(async () => {
    try {
      const responseData = await sendRequest('/battles/admin')
      setBattles(responseData.battles)
    } catch (err) {
      console.log(err)
    }
  }, [sendRequest, setBattles])

  useEffect(() => {
    fetchBattles()
  }, [fetchBattles])

  return (
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
            <BattleCard
              key={battle._id}
              title={battle.title}
              description={battle.description}
              date={new Date(battle.startTime).toLocaleString()}
              imgSrc={
                process.env.REACT_APP_ENDPOINT +
                '/battles/' +
                battle.imgId +
                '.png'
              }
              id={battle._id}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default BattleCards
