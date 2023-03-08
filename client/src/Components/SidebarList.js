import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  MenuList,
  Toolbar,
  Typography
} from '@mui/material'

import ListItemIcon from '@mui/material/ListItemIcon'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import CircleIcon from '@mui/icons-material/Circle'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { useContext, useState } from 'react'

import UserContext from '../Context/UserContext'
import DashboardData from '../Pages/DashboardData'
import DebtorsPage from '../Pages/DebtorsPage'
import TransporterPage from '../Pages/TransporterPage'

export const SidebarList = () => {
  const { setComponent, active, setActive } = useContext(UserContext)
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(prev => !prev)
  }

  return (
    <Box>
      <Toolbar
        sx={{
          background: '#30619F',
          display: { xs: 'none', sm: 'flex' }
        }}
      >
        <Typography variant='h5' sx={{ color: 'white' }}>
          The ERP
        </Typography>
      </Toolbar>
      <MenuList sx={{ background: '#F6F7F9' }}>
        <MenuItem
          onClick={() => {
            setComponent(<DashboardData />)
            setActive('Dashboard')
          }}
        >
          <ListItemIcon>
            <DashboardIcon
              sx={{
                color: active === 'Dashboard' ? '#f58802' : '#525252'
              }}
            />
          </ListItemIcon>

          <ListItemText
            sx={{
              color: active === 'Dashboard' ? '#f58802' : '#525252'
            }}
          >
            Dashboard
          </ListItemText>
        </MenuItem>

        <MenuItem onClick={handleClick}>
          <ListItemIcon>
            <PeopleIcon
              sx={{ color: active === 'Ledgers' ? '#f58802' : '#525252' }}
            />
          </ListItemIcon>

          <ListItemText
            sx={{ color: active === 'Ledgers' ? '#f58802' : '#525252' }}
          >
            Ledgers
          </ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </MenuItem>

        <Collapse in={open} timeout='auto' unmountOnExit>
          <List
            component='div'
            disablePadding
            onClick={() => {
              setComponent(<DebtorsPage />)
              setActive('Ledgers')
            }}
          >
            <ListItemButton sx={{ pl: 5 }}>
              <CircleIcon
                sx={{
                  mr: 1,
                  fontSize: '0.8rem',
                  color: active === 'Ledgers' ? '#f58802' : '#525252'
                }}
              />
              <ListItemText
                sx={{ color: active === 'Ledgers' ? '#f58802' : '#525252' }}
              >
                Clients
              </ListItemText>
            </ListItemButton>
          </List>
        </Collapse>

        <MenuItem
          onClick={() => {
            setActive('Transporter')
            setComponent(<TransporterPage />)
          }}
        >
          <ListItemIcon>
            <LocalShippingIcon
              sx={{
                color: active === 'Transporter' ? '#f58802' : '#525252'
              }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{
              color: active === 'Transporter' ? '#f58802' : '#525252'
            }}
          >
            Transporter
          </ListItemText>
        </MenuItem>
      </MenuList>
    </Box>
  )
}
