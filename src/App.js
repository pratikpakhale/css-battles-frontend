// dependencies
import { Route, Routes } from 'react-router-dom'

//components
import Navbar from './components/Navbar'
import Page404 from './components/404'

//pages
import Home from './pages/Home'
import Login from './pages/Login'
import Battles from './pages/Battles'
import AddBattle from './pages/AddBattle'
import EditBattle from './pages/EditBattle'
// import Admin from './pages/Admin'
import BattlePage from './pages/BattlePage'
import Leaderboard from './pages/Leaderboard'

// context
import { authContext } from './store/authContext'

//hooks
import { useAuth } from './hooks/authHook'

function App() {
  const { token, login, logout, studentId, type } = useAuth()

  return (
    <authContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        studentId,
        type,
        login: login,
        logout: logout,
      }}
    >
      <div className='bg-secondary min-h-screen'>
        <Navbar />
        <Routes>
          <Route path='/' element={<>{token ? <Home /> : <Login />}</>} />
          {token && (
            <>
              <Route path='/battle/:battleId' element={<BattlePage />} />
              <Route
                path='/battle/:battleId/leaderboard'
                element={<Leaderboard />}
              />
              {type === 'admin' && (
                <>
                  <Route path='/admin' element={<Battles />} />
                  <Route path='/admin/battles' element={<Battles />} />
                  <Route path='/admin/add-battle' element={<AddBattle />} />
                  <Route
                    path='/admin/battle/:battleId'
                    element={<EditBattle />}
                  />
                </>
              )}
            </>
          )}

          <Route path='/*' element={<Page404 />} />
        </Routes>
      </div>
    </authContext.Provider>
  )
}

export default App
