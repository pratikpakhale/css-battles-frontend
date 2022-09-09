import React from 'react'

import { Link } from 'react-router-dom'

import BattleCards from '../components/admin/BattleCards'

function Battles() {
  return (
    <div className='px-4 mt-4'>
      <div>
        <Link to='/admin/add-battle'>
          <button className='py-2 px-4 mr-6 text-sm font-medium text-white focus:outline-none rounded-lg border border-tertiary hover:bg-slate-300 hover:text-tertiary focus:z-10 focus:ring-2 focus:ring-primary '>
            Add Battle
          </button>
        </Link>
      </div>
      <BattleCards />
    </div>
  )
}

export default Battles
