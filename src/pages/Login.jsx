import React, { useState, useContext } from 'react'
import { authContext } from '../store/authContext'

import { Navigate } from 'react-router-dom'

import Spinner from '../assets/Spinner'

const { useHttpClient } = require('../hooks/httpHook')

function Login() {
  const [alert, setAlert] = useState(null)
  const [registrationNumber, setRegistrationNumber] = useState('')
  const [password, setPassword] = useState('')
  const [loginSuccess, setLoginSuccess] = useState(false)

  const auth = useContext(authContext)

  const { isLoading, sendRequest } = useHttpClient()

  const registrationNumberChangeHandler = e => {
    setRegistrationNumber(e.target.value.trim().toUpperCase())
  }

  const passwordChangeHandler = e => {
    setPassword(e.target.value.trim())
  }

  const loginHandler = async e => {
    e.preventDefault()

    if (registrationNumber.length === 0 || password.length === 0) {
      setAlert('Please enter your registration number and password')
      setTimeout(() => {
        setAlert(null)
      }, 3000)
      return
    }

    try {
      const responseData = await sendRequest(
        '/auth/login',
        'POST',
        JSON.stringify({
          registrationNumber,
          password,
        }),
        {
          'Content-Type': 'application/json',
        }
      )

      auth.login(responseData.studentId, responseData.token, responseData.type)
      setLoginSuccess(true)
    } catch (err) {
      setAlert(err.message)
      setTimeout(() => {
        setAlert(null)
      }, 3000)
    }

    return
  }

  return (
    <section className='flex items-center justify-center'>
      {loginSuccess && <Navigate to='/' />}

      <form
        className='mt-20 px-20 py-12 border-2 border-primary mx-auto'
        onSubmit={loginHandler}
      >
        <input
          type='text'
          placeholder='Registration Number'
          className='text-white placeholder:text-gray-400 bg-secondary border-b-2 border-primary px-2 pb-2 focus:outline-none block'
          onChange={registrationNumberChangeHandler}
          value={registrationNumber}
        />
        <input
          type='password'
          placeholder='Password'
          className='text-white placeholder:text-gray-400 bg-secondary border-b-2 border-primary px-2  pb-2 focus:outline-none mt-8 block'
          onChange={passwordChangeHandler}
          value={password}
        />
        <button
          className='mt-8 border-2 border-tertiary text-gray-300 px-4 py-2'
          onClick={loginHandler}
        >
          {isLoading ? <Spinner color={'primary'} /> : 'Login'}
        </button>
        {alert && (
          <div
            className='mt-8 p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg'
            role='alert'
          >
            <span className='font-medium'>Error!</span> {alert}
          </div>
        )}
        <div
          className='mt-8 p-4 mb-4 text-sm text-white  rounded-lg'
          role='alert'
        >
          <span className='font-medium'>Info-</span> For any issues, contact
          team velocity.
        </div>
      </form>
    </section>
  )
}

export default Login
