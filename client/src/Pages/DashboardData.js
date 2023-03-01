import { Box } from '@mui/material'
import { useContext } from 'react'

import UserContext from '../Context/UserContext'

function DashboardData () {
  const { user } = useContext(UserContext)
  const { username } = JSON.parse(user).data

  return (
    <Box>
      <h1>Welcome, {username}!</h1>
    </Box>
  )
}

export default DashboardData
