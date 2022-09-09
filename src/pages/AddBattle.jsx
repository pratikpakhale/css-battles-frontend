import { useState } from 'react'
import Spinner from '../assets/Spinner'

import { useNavigate } from 'react-router-dom'

const { useHttpClient } = require('../hooks/httpHook')

function AddBattle() {
  const navigate = useNavigate()

  const { isLoading, sendRequest } = useHttpClient()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [code, setCode] = useState('')
  const [colors, setColors] = useState('')

  const submitHandler = async e => {
    e.preventDefault()

    if (
      title.length === 0 ||
      description.length === 0 ||
      startTime.length === 0 ||
      endTime.length === 0 ||
      code.length === 0 ||
      colors.length === 0
    ) {
      window.alert('Please fill all the fields')
      return
    }

    try {
      const responseData = await sendRequest(
        '/battles',
        'POST',
        JSON.stringify({
          title,
          description,
          startTime,
          endTime,
          code,
          colors: colors.split(' '),
        }),
        {
          'Content-Type': 'application/json',
        }
      )
      console.log(responseData)
      navigate('/admin')
    } catch (err) {
      window.alert(err.message)
    }
  }

  return (
    <div className='px-4 mt-10 flex items-center justify-center'>
      <form
        className='w-3/4 py-6 border border-primary rounded-md px-6 mb-10'
        onSubmit={submitHandler}
      >
        <div className='mb-6'>
          <label className='block mb-2 font-medium text-gray-300'>Title</label>
          <input
            type='text'
            className='border text-gray-200 text-sm rounded-lg  block w-full p-2.5 bg-gray-800 border-gray-600 focus:border-primary focus:outline-none placeholder-gray-400 '
            placeholder='Some Title'
            autoComplete='off'
            required=''
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className='mb-6'>
          <label className='block mb-2 font-medium text-gray-300'>
            Description
          </label>
          <textarea
            className='border text-gray-200 text-sm rounded-lg  block w-full p-2.5 bg-gray-800 border-gray-600 focus:border-primary focus:outline-none placeholder-gray-400'
            placeholder='Some Description'
            autoComplete='off'
            required=''
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className='mb-6'>
          <label className='block mb-2 font-medium text-gray-300'>
            Battle Start
          </label>
          <input
            type={'datetime-local'}
            className='border text-gray-200 text-sm rounded-lg  block w-full p-2.5 bg-gray-800 border-gray-600 focus:border-primary focus:outline-none placeholder-gray-400'
            autoComplete='off'
            required=''
            onChange={e => setStartTime(e.target.value)}
          />
        </div>
        <div className='mb-6'>
          <label className='block mb-2 font-medium text-gray-300'>
            Battle End
          </label>
          <input
            type={'datetime-local'}
            className='border text-gray-200 text-sm rounded-lg  block w-full p-2.5 bg-gray-800 border-gray-600 focus:border-primary focus:outline-none placeholder-gray-400'
            autoComplete='off'
            required=''
            onChange={e => setEndTime(e.target.value)}
          />
        </div>
        <div className='mb-6'>
          <label className='block mb-2 font-medium text-gray-300'>Code</label>
          <textarea
            className='border text-gray-200 text-sm rounded-lg  block w-full p-2.5 bg-gray-800 border-gray-600 focus:border-primary focus:outline-none placeholder-gray-400'
            placeholder='<style></style>'
            autoComplete='off'
            required=''
            onChange={e => setCode(e.target.value)}
          />
        </div>
        <div className='mb-6'>
          <label className='block mb-2 font-medium text-gray-300'>
            Colors - Space Seperated
          </label>
          <textarea
            className='border text-gray-200 text-sm rounded-lg  block w-full p-2.5 bg-gray-800 border-gray-600 focus:border-primary focus:outline-none placeholder-gray-400'
            placeholder='#FFFFF #33333'
            autoComplete='off'
            required=''
            onChange={e => setColors(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className='py-2 px-4 mr-6 text-md font-medium text-white focus:outline-none rounded-lg border border-tertiary hover:bg-slate-300 hover:text-tertiary focus:z-10 focus:ring-2 focus:ring-primary '
        >
          {isLoading ? <Spinner color={'primary'} /> : 'Create'}
        </button>
      </form>
    </div>
  )
}

export default AddBattle
