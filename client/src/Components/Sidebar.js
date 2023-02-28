import { useState } from 'react'
import {
  AppBar,
  Box,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Toolbar,
  Typography
} from '@mui/material'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import MenuIcon from '@mui/icons-material/Menu'

function Sidebar () {
  const [width, setWidth] = useState('270px')
  const [active, setActive] = useState('Dashboard')

  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <Box
      sx={{
        minWidth: { width },
        width: { width },
        display: { xs: 'none', md: 'block' }
      }}
    >
      <AppBar
        position='sticky'
        top={0}
        sx={{
          boxShadow: '0',
          background: '#30619E'
        }}
      >
        <Toolbar sx={{ display: 'flex', ml: -0.8 }}>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            sx={{ mr: 0 }}
            onClick={() =>
              width === '60px' ? setWidth('270px') : setWidth('60px')
            }
          >
            <MenuIcon />
          </IconButton>
          {width === '270px' && (
            <Typography
              variant='h5'
              component='div'
              sx={{ flexGrow: 1, letterSpacing: 5 }}
            >
              ERP
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Box
        position='sticky'
        top={64}
        sx={{
          borderRight: '1px solid #E0E0E4',
          height: 'calc(100vh - 64px)',
          overflow: 'auto'
        }}
      >
        <MenuList>
          <MenuItem onClick={() => setActive('Dashboard')}>
            <ListItemIcon>
              <DashboardIcon
                sx={{
                  color: active === 'Dashboard' ? '#f58802' : '#525252'
                }}
              />
            </ListItemIcon>
            {width === '270px' && (
              <ListItemText
                sx={{
                  color: active === 'Dashboard' ? '#f58802' : '#525252'
                }}
              >
                Dashboard
              </ListItemText>
            )}
          </MenuItem>

          <MenuItem onClick={handleClick}>
            {width === '270px' && (
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
            )}
            {width === '270px' && <ListItemText>Ledgers</ListItemText>}
            {open ? <ExpandLess /> : <ExpandMore />}
          </MenuItem>

          <Collapse in={open} timeout='auto' unmountOnExit>
            <List
              component='div'
              disablePadding
              onClick={() => setActive('Ledgers')}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <PeopleIcon
                    sx={{
                      color: active === 'Ledgers' ? '#f58802' : '#525252'
                    }}
                  />
                </ListItemIcon>
                {width === '270px' && (
                  <ListItemText
                    sx={{ color: active === 'Ledgers' ? '#f58802' : '#525252' }}
                  >
                    Clients
                  </ListItemText>
                )}
              </ListItemButton>
            </List>
          </Collapse>

          <MenuItem onClick={() => setActive('Ledgers')}>
            <ListItemIcon></ListItemIcon>
          </MenuItem>
        </MenuList>
      </Box>
    </Box>
  )
}

export default Sidebar
