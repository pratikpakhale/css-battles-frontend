import { useState, useCallback, useRef, useEffect } from 'react'

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const activeHttpRequests = useRef([])

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true)
      const httpAbortCtrl = new AbortController()
      activeHttpRequests.current.push(httpAbortCtrl)

      try {
        const studendData = localStorage.getItem('studentData')

        if (studendData) {
          const { token } = JSON.parse(studendData)
          headers['Authorization'] = `Bearer ${token}`
        }

        const response = await fetch(process.env.REACT_APP_ENDPOINT + url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        })

        const responseData = await response.json()

        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
        )

        if (!response.ok) {
          setIsLoading(false)
          throw new Error(responseData.message)
        }

        if (response.status === 401) {
          localStorage.removeItem('studentData')
          window.location.reload()
        }

        if (response.status !== 200 && response.status !== 201) {
          setIsLoading(false)
          throw new Error(responseData.message)
        }

        setIsLoading(false)
        return responseData
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
        throw err
      }
    },
    []
  )

  const clearError = () => {
    setError(null)
  }

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
    }
  }, [])

  return { isLoading, error, sendRequest, clearError }
}
