import { Box, ListItemText, MenuItem, MenuList, Paper } from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import HomeIcon from '@mui/icons-material/Home'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import SettingsIcon from '@mui/icons-material/Settings'
import EventNoteIcon from '@mui/icons-material/EventNote'
import DarkModeIcon from '@mui/icons-material/DarkMode'

import Dashboard from './Dashboard'
import ClientsPage from './pages/ClientsPage'

const Sidebar = props => {
  const width = props.data
  const { active, setActive, setComponent } = props.components

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        mt: '64px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 64px)',
        justifyContent: 'space-between',
        borderRight: '1px solid #EAEBED'
      }}
    >
      <Box>
        <Paper
          sx={{
            width: { width },
            boxShadow: 0
          }}
        >
          <MenuList>
            <MenuItem
              sx={{ color: active === 'dashboard' ? '#f58802' : '#525252' }}
              onClick={() => {
                setActive('dashboard')
                setComponent(<Dashboard />)
              }}
            >
              <ListItemIcon>
                <HomeIcon
                  fontSize={width === '60px' ? 'medium' : 'small'}
                  sx={{ color: active === 'dashboard' ? '#f58802' : '#525252' }}
                />
              </ListItemIcon>
              {width !== '60px' && <ListItemText>Dashboard</ListItemText>}
            </MenuItem>
            <MenuItem
              sx={{ color: active === 'clients' ? '#f58802' : '#525252' }}
              onClick={() => {
                setActive('clients')
                setComponent(<ClientsPage />)
              }}
            >
              <ListItemIcon>
                <PeopleAltIcon
                  fontSize={width === '60px' ? 'medium' : 'small'}
                  sx={{ color: active === 'clients' ? '#f58802' : '#525252' }}
                />
              </ListItemIcon>
              {width !== '60px' && <ListItemText>Clients</ListItemText>}
            </MenuItem>
            <MenuItem
              onClick={() => setActive('settings')}
              sx={{ color: active === 'settings' ? '#f58802' : '#525252' }}
            >
              <ListItemIcon>
                <SettingsIcon
                  fontSize={width === '60px' ? 'medium' : 'small'}
                  sx={{ color: active === 'settings' ? '#f58802' : '#525252' }}
                />
              </ListItemIcon>
              {width !== '60px' && <ListItemText>Settings</ListItemText>}
            </MenuItem>
            <MenuItem
              onClick={() => setActive('events')}
              sx={{ color: active === 'events' ? '#f58802' : '#525252' }}
            >
              <ListItemIcon>
                <EventNoteIcon
                  fontSize={width === '60px' ? 'medium' : 'small'}
                  sx={{ color: active === 'events' ? '#f58802' : '#525252' }}
                />
              </ListItemIcon>
              {width !== '60px' && <ListItemText>Events</ListItemText>}
            </MenuItem>
          </MenuList>
        </Paper>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <DarkModeIcon fontSize={width === '60px' ? 'medium' : 'small'} />
            </ListItemIcon>
            {width !== '60px' && <ListItemText>Dark Mode</ListItemText>}
          </MenuItem>
        </MenuList>
      </Box>
    </Box>
  )
}

export default Sidebar
