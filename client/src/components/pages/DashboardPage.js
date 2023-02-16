import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { Box, Container, LinearProgress, Stack } from '@mui/material'

import Dashboard from '../Dashboard'
import UserContext from '../context/userContext'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

const DashboardPage = () => {
  const { user, setUser } = useContext(UserContext)

  const [width, setWidth] = useState('250px')
  const [component, setComponent] = useState(<Dashboard />)
  const [active, setActive] = useState('dashboard')

  const navigate = useNavigate()

  const token = localStorage.getItem('authToken')

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      try {
        const { data } = await axios.get('/api/dashboard', config)
        return setUser(data.data)
      } catch (error) {
        // console.log(error.response.data.message)
        localStorage.removeItem('authToken')
        setUser(null)
        navigate('/login')
      }
    }
    fetchData()
  }, [token, setUser, navigate])

  if (!token) {
    return <Navigate to='/login' />
  }

  function Success () {
    return (
      <>
        <Navbar
          data={{
            user,
            setUser,
            width,
            setWidth,
            component,
            setComponent,
            active,
            setActive
          }}
        />
        {/* Sidebar & Main Content */}
        <Container maxWidth='xxl' sx={{ mt: 2 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 2 }}
            sx={{ mt: '65px' }}
          >
            {/* Sidebar */}
            <Box
              maxWidth={width}
              sx={{
                flex: 1,
                ml: -2,
                display: {
                  xs: 'none',
                  md: 'none',
                  lg: 'block'
                }
              }}
            >
              {
                <Sidebar
                  data={width}
                  components={{
                    component,
                    setComponent,
                    active,
                    setActive
                  }}
                />
              }
            </Box>
            {/* Main Content */}
            <Box sx={{ flex: 2 }}>{component}</Box>
          </Stack>
        </Container>
      </>
    )
  }

  return user ? <Success /> : <LinearProgress />
}

export default DashboardPage
