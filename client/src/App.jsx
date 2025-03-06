import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material'
import { useMemo, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import UserState from './Context/UserState'
import DashboardPage from './Pages/DashboardPage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import ForgotPasswordPage from './Pages/ForgotPassword'
import ResetPasswordPage from './Pages/ResetPasswordPage'

function App() {
  const getDesignTokens = mode => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
          // palette values for light mode
          primary: {
            main: '#346CB0',
            dark: '#30619F',
            light: '#346CB0'
          },
          background: {
            default: '#F6F7F9',
            paper: '#FFF',
            border: '#D8D9DA'
          },
          text: {
            primary: '#363642',
            secondary: '#BDBFC8'
          }
        }
        : {
          // palette values for dark mode
          primary: {
            main: '#346CB0',
            dark: '#30619F',
            light: '#346CB0'
          },
          background: {
            default: '#191927',
            paper: '#222230',
            border: '#343441'
          },
          text: {
            main: '#FFFFFF',
            link: '#A6ABBD',
            primary: '#D6D8E1',
            secondary: '#5D606E'
          }
        })
    }
  })

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  !localStorage.getItem('darkMode') &&
    localStorage.setItem('darkMode', prefersDarkMode ? 'dark' : 'light')
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode'))

  const theme = useMemo(
    () => (darkMode === 'dark' ? 'dark' : 'light'),
    [darkMode]
  )

  const userTheme = createTheme(getDesignTokens(theme))

  return (
    <ThemeProvider theme={userTheme}>
      <div className='App'>
        <Router>
          <UserState>
            <Routes>
              <Route
                path='/'
                element={<DashboardPage mode={{ setDarkMode, darkMode }} />}
              ></Route>
              <Route path='/login' element={<LoginPage />}></Route>
              <Route path='/register' element={<RegisterPage />}></Route>
              <Route path='/forgotpassword' element={<ForgotPasswordPage />}></Route>
              <Route path='/resetpassword/:resetToken' element={<ResetPasswordPage />}></Route>
            </Routes>
          </UserState>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
