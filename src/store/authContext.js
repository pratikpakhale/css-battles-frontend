import { createContext } from 'react'

const authContext = createContext({
  isLoggedIn: false,
  studentId: null,
  token: null,
  type: 'student',
  login: () => {},
  logout: () => {},
})

export { authContext }
