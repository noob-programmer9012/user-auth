import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import {
  Box,
  LinearProgress,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business'

import UserContext from './context/userContext'
import AddFirmForm from './addFirmForm'

export default function Dashboard (props) {
  const { user, firm, setFirm } = useContext(UserContext)
  const [open, setOpen] = useState(true)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const getFirmData = async () => {
      try {
        const data = await axios.get(`/api/firm/getfirm/${user._id}`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        const json = JSON.stringify(data.data.data)
        setFirm(json)
      } catch (error) {
        console.log(error.message)
      }
    }
    getFirmData()
  }, [setFirm, user._id])

  const firms = JSON.parse(firm)

  if (!user.firm) {
    return <AddFirmForm data={{ open, setOpen, fullScreen }} />
  }

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {firm && <BusinessIcon sx={{ fontSize: '3rem' }} />}
      <Box>
        <Typography variant='h3' sx={{ fontWeight: 300 }}>
          {firms ? firms.companyName : <LinearProgress />}
        </Typography>
        <Typography sx={{ float: 'right', opacity: 0.5 }}>
          {firms ? firms.address.line3 : <LinearProgress />}
        </Typography>
      </Box>
    </Box>
  )
}
