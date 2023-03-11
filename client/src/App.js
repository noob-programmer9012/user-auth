import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material'
import { useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import UserState from './Context/UserState'
import DashboardPage from './Pages/DashboardPage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'

function App () {
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
  const theme = useMemo(
    () => (prefersDarkMode ? 'dark' : 'light'),
    [prefersDarkMode]
  )
  const userTheme = createTheme(getDesignTokens(theme))

  // const [darkMode, setDarkMode] = useState(theme)

  return (
    <ThemeProvider theme={userTheme}>
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
    </ThemeProvider>
  )
}

export default App
