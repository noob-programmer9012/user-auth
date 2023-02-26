import axios from 'axios'
import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import UserContext from '../Context/UserContext'

const DashboardPage = () => {
  const { user, setUser } = useContext(UserContext)
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
        const data = await axios.get(
          `https://api.the-erp.in/api/dashboard`,
          config
        )
        setUser(JSON.stringify(data.data))
      } catch (error) {
        console.log(error.request.response)
        localStorage.removeItem('authToken')
        setUser(null)
      }
    }
    fetchUser()
  }, [user, setUser, navigate])

  return (
    <React.Fragment>
      <h1>Dashboard Page</h1>
    </React.Fragment>
  )
}

export default DashboardPage
