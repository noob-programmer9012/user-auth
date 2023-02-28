import { Box, LinearProgress } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import UserContext from '../Context/UserContext'
import Sidebar from '../Components/Sidebar'
import Main from '../Components/Main'

const DashboardPage = () => {
  const { user, setUser, serverUrl } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      navigate('/login')
    }
    const fetchUser = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      try {
        const data = await axios.get(`${serverUrl}/api/dashboard`, config)
        setUser(JSON.stringify(data.data))
        console.log(data)
      } catch (error) {
        console.log(error.request.response)
        localStorage.removeItem('authToken')
        setUser(null)
        navigate('/login')
      }
    }
    fetchUser()
  }, [user, setUser, navigate, serverUrl])

  function Success () {
    // const { username } = JSON.parse(user).data
    return (
      <React.Fragment>
        {/* <h1>Welcome, {username}</h1> */}
        <Box sx={{ display: 'flex' }}>
          <Sidebar />
          {/* Main Content */}
          <Main />
        </Box>
      </React.Fragment>
    )
  }

  return user ? <Success /> : <LinearProgress />
}

export default DashboardPage
