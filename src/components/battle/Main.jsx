import { useState, useCallback, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { useHttpClient } from '../../hooks/httpHook'

import Code from './Code'
import Output from './Output'
import Target from './Target'

function Main() {
  const { battleId } = useParams()
  const { sendRequest } = useHttpClient()

  const [battle, setBattle] = useState(null)

  const loadBattle = useCallback(async () => {
    try {
      const responseData = await sendRequest(`/battles/student/${battleId}`)
      console.log(responseData)
      setBattle(responseData.battle)
    } catch (err) {
      console.log(err)
    }
  }, [sendRequest, battleId])

  useEffect(() => {
    loadBattle()
  }, [loadBattle])

  const [code, setCode] = useState('')

  return (
    <div className='flex'>
      <Code updateCode={setCode} />
      <Output code={code} battle={battle} />
      <Target battle={battle} />
    </div>
  )
}

export default Main
