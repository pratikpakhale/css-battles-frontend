import { useState, useEffect, useRef } from 'react'
import Spinner from '../../assets/Spinner'

import { Link } from 'react-router-dom'

const { useHttpClient } = require('../../hooks/httpHook')

const { useParams } = require('react-router-dom')

function Output({ code = '', battle }) {
  const iframe = useRef(null)

  const [score, setScore] = useState('')

  const [imgUrl, setImgUrl] = useState('')
  console.log(imgUrl)

  useEffect(() => {
    if (battle) {
      setImgUrl(
        process.env.REACT_APP_ENDPOINT + '/battles/' + battle.imgId + '.png'
      )
    }
  }, [battle])

  const { isLoading, sendRequest } = useHttpClient()
  const battleId = useParams().battleId

  useEffect(() => {
    const ctx = iframe.current.contentWindow.document
    ctx.open()
    ctx.write(code)
    ctx.close()
  }, [code])

  const submitHandler = async () => {
    try {
      const responseData = await sendRequest(
        '/submissions',
        'POST',
        JSON.stringify({
          code,
          battleId,
        }),
        {
          'Content-Type': 'application/json',
        }
      )
      console.log(responseData)
      if (responseData.submission) {
        setScore(responseData.submission.percentage)
        window.alert('Your score is ' + responseData.submission.percentage)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <aside
      className='min-w-min border-r-ccss border-tertiary px-4'
      aria-label='Sidebar'
    >
      <div className='overflow-y-auto bg-css-secondary rounded p-4'>
        <div className='text-white font-poppins mb-3 text-lg'>OUTPUT</div>
        <div>
          <iframe
            ref={iframe}
            title='output'
            className='h-300 w-400 bg-white '
            frameBorder='0'
          ></iframe>
          <div>
            {/* <imgs
              src={imgUrl}
              alt='target_img'
              className='h-300 w-400 hidden '
            /> */}
          </div>
        </div>
        <div className='text-lg text-white font-poppins font-medium mt-6 px-4 py-6 bg-ccss-tertiary rounded-lg flex flex-col items-center justify-center'>
          <div>
            <button
              type='button'
              className='py-2 px-4 mr-6 text-xl font-medium text-white focus:outline-none rounded-lg border border-tertiary hover:bg-slate-300 hover:text-tertiary focus:z-10 focus:ring-2 focus:ring-primary '
              onClick={submitHandler}
            >
              {isLoading && <Spinner />}
              {!isLoading && 'SUBMIT'}
            </button>
            <Link to={'/battle/' + battleId + '/leaderboard'}>
              <button
                type='button'
                className='py-2 px-4 mr-6 text-xl font-medium text-white focus:outline-none rounded-lg border border-tertiary hover:bg-slate-300 hover:text-tertiary focus:z-10 focus:ring-2 focus:ring-primary '
                onClick={submitHandler}
              >
                {!isLoading && 'Leaderboard'}
              </button>
            </Link>
          </div>
          <div className='text-slate-100 mt-4'>Last Score: {score}</div>
        </div>
      </div>
    </aside>
  )
}

export default Output
