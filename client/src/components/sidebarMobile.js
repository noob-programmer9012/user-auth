import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import SettingsIcon from '@mui/icons-material/Settings'
import EventNoteIcon from '@mui/icons-material/EventNote'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import Dashboard from './Dashboard'
import ClientsPage from './pages/ClientsPage'

const SidebarMobile = props => {
  const { active, setActive, setComponent } = props.components

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Box>
        <Paper
          sx={{
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
                  sx={{ color: active === 'dashboard' ? '#f58802' : '#525252' }}
                />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
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
                  sx={{ color: active === 'clients' ? '#f58802' : '#525252' }}
                />
              </ListItemIcon>
              <ListItemText>Clients</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => setActive('settings')}
              sx={{ color: active === 'settings' ? '#f58802' : '#525252' }}
            >
              <ListItemIcon>
                <SettingsIcon
                  sx={{ color: active === 'settings' ? '#f58802' : '#525252' }}
                />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => setActive('events')}
              sx={{ color: active === 'events' ? '#f58802' : '#525252' }}
            >
              <ListItemIcon>
                <EventNoteIcon
                  sx={{ color: active === 'events' ? '#f58802' : '#525252' }}
                />
              </ListItemIcon>
              <ListItemText>Events</ListItemText>
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
              <DarkModeIcon />
            </ListItemIcon>
            <ListItemText>Dark Mode</ListItemText>
          </MenuItem>
        </MenuList>
      </Box>
    </Box>
  )
}

export default SidebarMobile
