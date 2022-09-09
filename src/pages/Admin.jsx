import React from 'react'

import { Link } from 'react-router-dom'

function Admin() {
  return (
    <div className='px-4 mt-4'>
      <Link to='/admin/battles'>
        <button className='py-2 px-4 mr-6 text-sm font-medium text-white focus:outline-none rounded-lg border border-tertiary hover:bg-slate-300 hover:text-tertiary focus:z-10 focus:ring-2 focus:ring-primary '>
          View Battles
        </button>
      </Link>
      {/* <Link to='/admin/registrations'>
        <button className='py-2 px-4 mr-6 text-sm font-medium text-white focus:outline-none rounded-lg border border-tertiary hover:bg-slate-300 hover:text-tertiary focus:z-10 focus:ring-2 focus:ring-primary '>
          View Registrations
        </button>
      </Link> */}
    </div>
  )
}

export default Admin
