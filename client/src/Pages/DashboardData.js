import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useContext, useState } from 'react'

import UserContext from '../Context/UserContext'
import AddFirmForm from '../Pages/AddFirmForm'

function DashboardData () {
  const [open, setOpen] = useState(true)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const { user } = useContext(UserContext)
  const { username, firm } = JSON.parse(user).data

  return (
    <Box>
      <h1>Welcome, {username}!</h1>
      {!firm && <AddFirmForm data={{ open, setOpen, fullScreen }} />}
    </Box>
  )
}

export default DashboardData
