import React from 'react'

import { Link } from 'react-router-dom'

function Page404() {
  return (
    <div className='mt-10 mx-auto text-white font-lato flex justify-center'>
      Error 404 : Page Not Found!
      <Link to='/' className='mx-3 text-primary font-extrabold '>
        Go to Home?
      </Link>
    </div>
  )
}

export default Page404
