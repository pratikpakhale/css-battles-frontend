import React, { useState, useEffect } from 'react'

function Target({ battle }) {
  const [image, setImage] = useState('hii')
  const [colors, setColors] = useState([])

  useEffect(() => {
    if (battle) {
      setImage(
        process.env.REACT_APP_ENDPOINT + '/battles/' + battle.imgId + '.png'
      )
      setColors(battle.colors)
    }
  }, [battle])

  return (
    <aside
      className='min-w-min px-4 overflow-x-auto flex-shrink-0'
      aria-label='Sidebar'
    >
      <div className='overflow-auto bg-css-secondary rounded p-4'>
        <div className='text-white font-poppins mb-3 text-lg'>TARGET</div>
        <div>
          <img src={image} alt='target_img' className='h-300 w-400' />
        </div>

        <div className='text-md text-white font-poppins  mt-6 px-4 py-6 bg-ccss-tertiary rounded-lg'>
          <div className='mb-4 '>Colors (click to copy)</div>
          <div className='w-full grid grid-cols-2'>
            {colors.map(color => (
              <div
                key={color}
                className='flex justify-center items-center rounded border-2 w-fit px-4 py-2 cursor-pointer mb-3'
              >
                <div
                  className='h-6 w-6 rounded-full mr-2'
                  style={{ backgroundColor: color }}
                ></div>
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(color)
                  }}
                >
                  {color}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Target
