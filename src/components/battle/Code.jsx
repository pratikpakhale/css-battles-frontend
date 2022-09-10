import CodeEditor from '@uiw/react-textarea-code-editor'
import { useState, useEffect } from 'react'

function Code({ updateCode }) {
  const [code, setCode] = useState(
    localStorage.getItem('code') ||
      `<div></div>
  <style>
    div {
      width: 100px;
      height: 100px;
      background: #dd6b4d;
    }
  </style>
  
  <!-- OBJECTIVE -->
  <!-- Write HTML/CSS in this editor and replicate the given target image in the least code possible. What you write here, renders as it is -->
  
  <!-- IMPORTANT: remove the comments before submitting -->
  `
  )

  useEffect(() => {
    updateCode(code)
  }, [code, updateCode])

  const handleChange = newCode => {
    setCode(newCode)
    localStorage.setItem('code', newCode)
  }

  return (
    <aside
      className='w-5/12 h-screen border-r-ccss border-tertiary'
      aria-label='Sidebar'
    >
      <div className='overflow-y-auto bg-css-secondary rounded p-4'>
        <div className='text-white font-poppins mb-3 text-lg '>CODE EDITOR</div>
        <div className='min-h-500 max-h-550 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-tertiary scrollbar-thumb-rounded-lg'>
          <CodeEditor
            value={code}
            language='html'
            placeholder='Please enter HTML code here.'
            onChange={evn => handleChange(evn.target.value)}
            padding={15}
            wrap={'wrap'}
            style={{
              fontSize: 15,
              fontFamily: 'IBM Plex Mono, monospace',
              lineHeight: 1.5,
              letterSpacing: '0.1em',
              color: '#fff',
              width: '100%',
            }}
          />
        </div>
      </div>
    </aside>
  )
}

export default Code
