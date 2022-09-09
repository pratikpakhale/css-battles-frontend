import { useState, useCallback, useEffect } from 'react'
import Spinner from '../assets/Spinner'

import { useNavigate, useParams } from 'react-router-dom'

const { useHttpClient } = require('../hooks/httpHook')

function EditBattle() {
  const navigate = useNavigate()

  const { isLoading, sendRequest } = useHttpClient()

  const battleId = useParams().battleId

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [code, setCode] = useState('')
  const [colors, setColors] = useState('')

  const loadBattle = useCallback(async () => {
    try {
      const responseData = await sendRequest(`/battles/admin/${battleId}`)
      console.log(responseData)
      setTitle(responseData.battle.title)
      setDescription(responseData.battle.description)
      setStartTime(
        new Date(responseData.battle.startTime).toISOString().split('.')[0]
      )
      setEndTime(
        new Date(responseData.battle.endTime).toISOString().split('.')[0]
      )
      setCode(responseData.battle.code)
      setColors(responseData.battle.colors.join(' '))
    } catch (err) {
      console.log(err)
    }
  }, [sendRequest, battleId])

  useEffect(() => {
    loadBattle()
  }, [loadBattle])

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
        '/battles/' + battleId,
        'PUT',
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

  const deleteHandler = async () => {
    const confirm = window.prompt(
      'Are you sure you want to delete this battle? This action cannot be undone. Please type "CONFIRM" to delete '
    )

    if (confirm !== 'CONFIRM') {
      window.alert('Delete cancelled')
      return
    }

    try {
      const responseData = await sendRequest(
        '/battles/' + battleId,
        'DELETE',
        null,
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
            value={title}
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
            value={description}
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
            value={startTime}
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
            value={endTime}
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
            value={code}
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
            value={colors}
            onChange={e => setColors(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className='py-2 px-4 mr-6 text-md font-medium text-white focus:outline-none rounded-lg border border-tertiary hover:bg-slate-300 hover:text-tertiary focus:z-10 focus:ring-2 focus:ring-primary '
        >
          {isLoading ? <Spinner color={'primary'} /> : 'Update'}
        </button>
        <button
          type='button'
          className='py-2 px-4 mr-6 text-md font-medium text-white focus:outline-none rounded-lg border border-tertiary hover:bg-slate-300 hover:text-tertiary focus:z-10 focus:ring-2 focus:ring-primary '
          onClick={deleteHandler}
        >
          {isLoading ? <Spinner color={'primary'} /> : 'Delete'}
        </button>
      </form>
    </div>
  )
}

export default EditBattle
