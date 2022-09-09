import React from 'react'

import { Link } from 'react-router-dom'

function BattleCard({ title, description, date, id, imgSrc }) {
  return (
    <div className='max-w-sm bg-secondary  rounded-lg border border-tertiary shadow-md '>
      <img className='rounded-t-lg' src={imgSrc} alt='' />

      <div className='p-5'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-slate-100'>
          {title}
        </h5>

        <p className='mb-3 font-normal text-slate-200 '>{description}</p>

        <p className='mb-3 font-normal text-slate-400 '>{date}</p>
        <Link to={`/admin/battle/${id}`}>
          <button className='py-2 px-4 mr-3 text-md font-medium text-white focus:outline-none rounded-lg border border-tertiary hover:bg-slate-300 hover:text-tertiary focus:z-10 focus:ring-2 focus:ring-primary '>
            Edit
          </button>
        </Link>
      </div>
    </div>
  )
}

export default BattleCard
