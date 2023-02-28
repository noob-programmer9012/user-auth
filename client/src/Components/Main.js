import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useState, useContext } from 'react'

import UserContext from '../Context/UserContext'

function Main () {
  const { user, setUser } = useContext(UserContext)
  const { username } = JSON.parse(user).data

  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ dipslay: 'flex', flexGrow: 1 }}>
      <AppBar
        position='sticky'
        top={0}
        sx={{ boxShadow: 0, background: '#346CB0' }}
      >
        <Toolbar sx={{ dipslay: 'flex', justifyContent: 'flex-end' }}>
          <div>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem
                onClick={() => {
                  localStorage.removeItem('authToken')
                  setUser(null)
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ p: 2 }}>
        <h1>Welcome, {username}!</h1>
      </Box>
    </Box>
  )
}

export default Main
