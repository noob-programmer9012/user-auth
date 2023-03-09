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
          backgroundColor: 'primary.dark',
          display: { xs: 'none', sm: 'flex' }
        }}
      >
        <Typography variant='h5' sx={{ color: 'white' }}>
          The ERP
        </Typography>
      </Toolbar>
      <MenuList
        sx={{
          backgroundColor: 'background.default',
          height: { xs: 'calc(100vh - 56px)', sm: '100%' }
        }}
      >
        <MenuItem
          onClick={() => {
            setComponent(<DashboardData />)
            setActive('Dashboard')
          }}
        >
          <ListItemIcon>
            <DashboardIcon
              sx={{
                color: active === 'Dashboard' ? 'primary.light' : 'text.link'
              }}
            />
          </ListItemIcon>

          <ListItemText
            sx={{
              color: active === 'Dashboard' ? 'primary.light' : 'text.link'
            }}
          >
            Dashboard
          </ListItemText>
        </MenuItem>

        <MenuItem onClick={handleClick}>
          <ListItemIcon>
            <PeopleIcon
              sx={{
                color: active === 'Ledgers' ? 'primary.light' : 'text.link'
              }}
            />
          </ListItemIcon>

          <ListItemText
            sx={{ color: active === 'Ledgers' ? 'primary.light' : 'text.link' }}
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
                  color: active === 'Ledgers' ? 'primary.light' : 'text.link'
                }}
              />
              <ListItemText
                sx={{
                  color: active === 'Ledgers' ? 'primary.light' : 'text.link'
                }}
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
                color: active === 'Transporter' ? 'primary.light' : 'text.link'
              }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{
              color: active === 'Transporter' ? 'primary.light' : 'text.link'
            }}
          >
            Transporter
          </ListItemText>
        </MenuItem>
      </MenuList>
    </Box>
  )
}
