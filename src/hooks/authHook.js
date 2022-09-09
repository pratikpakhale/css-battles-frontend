import { useState, useCallback, useEffect } from 'react'

let logoutTimer

export const useAuth = () => {
  const [token, setToken] = useState(false)
  const [tokenExpirationDate, setTokenExpirationDate] = useState()
  const [studentId, setUserId] = useState(false)
  const [type, setType] = useState('student')

  const login = useCallback((uid, token, ttype, expirationDate) => {
    setToken(token)
    setUserId(uid)
    setType(ttype)
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
    setTokenExpirationDate(tokenExpirationDate)
    localStorage.setItem(
      'studentData',
      JSON.stringify({
        studentId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
        type: ttype,
      })
    )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setTokenExpirationDate(null)
    setUserId(null)
    setType('student')
    localStorage.removeItem('studentData')
  }, [])

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, logout, tokenExpirationDate])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('studentData'))
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.studentId,
        storedData.token,
        storedData.type,
        new Date(storedData.expiration)
      )
    }
  }, [login])

  return { token, login, logout, studentId, type }
}
