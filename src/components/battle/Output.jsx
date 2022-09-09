import { useState, useEffect, useRef } from 'react'
import Spinner from '../../assets/Spinner'

import { Link } from 'react-router-dom'

const { useHttpClient } = require('../../hooks/httpHook')

const { useParams } = require('react-router-dom')

function Output({ code = '', battle }) {
  const iframe = useRef(null)
  const output = useRef(null)
  const iframeP = useRef(null)

  const [sliderActive, setSliderActive] = useState(true)

  const [score, setScore] = useState('')

  const [imgUrl, setImgUrl] = useState('')
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
        setScore(score => {
          if (score > responseData.submission.percentage) {
            return score
          } else {
            return responseData.submission.percentage
          }
        })
        window.alert('Your score is ' + responseData.submission.percentage)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    window.addEventListener('mousemove', e => {
      const x = e.clientX
      const y = e.clientY
      const outputLeft = output.current.getBoundingClientRect().left
      const outputTop = output.current.getBoundingClientRect().top
      const outputRight = output.current.getBoundingClientRect().right
      const outputBottom = output.current.getBoundingClientRect().bottom

      if (
        x > outputLeft &&
        x < outputRight &&
        y > outputTop &&
        y < outputBottom &&
        sliderActive
      ) {
        const diff = ((outputRight - x) * 100) / (outputRight - outputLeft)
        iframeP.current.style.width = 100 - diff + '%'
        output.current.style.cursor = 'col-resize'
      } else {
        iframeP.current.style.width = '100%'
        output.current.style.cursor = 'default'
      }
    })
  }, [sliderActive])

  return (
    <aside
      className='min-w-fit min-h-fit inline-block border-r-ccss border-tertiary px-4'
      aria-label='Sidebar'
    >
      <div className='overflow-y-auto bg-css-secondary rounded p-4'>
        <div className='text-white font-poppins mb-3 text-lg'>OUTPUT</div>
        <div className='relative cursor-col-resize' ref={output}>
          <div
            className='h-full overflow-hidden relative mix-blend-normal pointer-events-none z-10'
            ref={iframeP}
          >
            <iframe
              ref={iframe}
              title='output'
              className='h-300 w-400 bg-white border-0 outline-none'
              frameBorder='0'
            ></iframe>
          </div>
          <img
            src={imgUrl}
            alt='target_img'
            className='h-300 w-200 absolute top-0 left-0 '
            style={{
              width: 'clamp(0px, 400px, 100%)',
            }}
          />
        </div>
        <div className='flex items-center justify-start mt-3 text-white font-poppins'>
          <input
            type='checkbox'
            checked={sliderActive}
            className='mr-2'
            onChange={() => setSliderActive(!sliderActive)}
          />{' '}
          <span
            onClick={() => setSliderActive(!sliderActive)}
            className='cursor-pointer'
          >
            Slider Mode
          </span>
        </div>

        <div className='text-lg text-white font-poppins font-medium mt-3 px-4 py-6 bg-ccss-tertiary rounded-lg flex flex-col items-center justify-center'>
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
          <div className='text-slate-100 mt-4'>
            Last Best Score: {score + '%'}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Output
