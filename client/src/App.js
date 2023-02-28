import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import UserState from './Context/UserState'
import DashboardPage from './Pages/DashboardPage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'

function App () {
  return (
    <div className='App'>
      <Router>
        <UserState>
          <Routes>
            <Route path='/' element={<DashboardPage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/register' element={<RegisterPage />}></Route>
          </Routes>
        </UserState>
      </Router>
    </div>
  )
}

export default App
