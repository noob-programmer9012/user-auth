import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import UserState from './Context/UserState'
import DashboardPage from './Pages/DashboardPage'
import LoginPage from './Pages/LoginPage'

function App () {
  return (
    <div className='App'>
      <Router>
        <UserState>
          <Routes>
            <Route path='/' element={<DashboardPage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/register' element={<h1>Register Route</h1>}></Route>
          </Routes>
        </UserState>
      </Router>
    </div>
  )
}

export default App
