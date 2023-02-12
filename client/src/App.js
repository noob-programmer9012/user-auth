import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { UserState } from './components/context/UserState'

import DashboardPage from './components/pages/DashboardPage'
import LoginPage from './components/pages/signIn'
import RegisterPage from './components/pages/RegisterPage'

function App () {
  return (
    <div className='App'>
      <Router>
        <UserState>
          <Routes>
            <Route exact path='/' element={<DashboardPage />}></Route>
            <Route exact path='/login' element={<LoginPage />}></Route>
            <Route exact path='/register' element={<RegisterPage />}></Route>
          </Routes>
        </UserState>
      </Router>
    </div>
  )
}

export default App
