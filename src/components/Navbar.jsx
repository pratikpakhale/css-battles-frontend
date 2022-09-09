import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { authContext } from '../store/authContext'

import velocitySVG from '../assets/velocity.svg'
import logo from '../assets/logo.svg'

function Navbar() {
  const { isLoggedIn, type, logout } = useContext(authContext)

  return (
    <nav className=' flex justify-between items-center px-8 lg:px-24 py-2 border-b-ccss-sm  lg:border-b-ccss border-tertiary '>
      <Link to={'/'} className='flex items-center justify-center'>
        <img src={logo} alt='logo' className='mr-2' />
        <span className='text-white font-poppins text-2xl font-weight-500'>
          CSS Battles
        </span>
      </Link>
      <div className='flex items-center justify-center'>
        {type === 'admin' && (
          <Link
            to='/admin'
            className='py-2 px-4 mr-6 text-sm font-medium text-white focus:outline-none rounded-lg border border-tertiary hover:bg-slate-300 hover:text-tertiary focus:z-10 focus:ring-2 focus:ring-primary '
          >
            Admin
          </Link>
        )}

        {isLoggedIn && (
          <button
            type='button'
            className='py-2 px-4 mr-6 text-sm font-medium text-white focus:outline-none rounded-lg border border-tertiary hover:bg-slate-300 hover:text-tertiary focus:z-10 focus:ring-2 focus:ring-primary '
            onClick={logout}
          >
            Logout
          </button>
        )}

        <a href='https://velocityevents.live' target='blank'>
          <img
            src={velocitySVG}
            alt='velocity logo'
            className='h-12 rounded-full border-0 cursor-pointer'
          />
        </a>
      </div>
    </nav>
  )
}

export default Navbar
