import { useState } from 'react'
import {
  Box,
  Fab,
  IconButton,
  InputBase,
  Paper,
  useMediaQuery,
  useTheme
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'

import ClientNames from './ClientNames'
import ResponsiveDialog from './addClientForm'

export default function ClientList () {
  const [open, setOpen] = useState(false)
  const [listChanged, setListChanged] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function CustomizedInputBase () {
    function handleSearch (e) {
      const clients = document.getElementsByClassName('company')
      for (let client of clients) {
        if (
          client.innerText
            .toUpperCase()
            .indexOf(e.target.value.toUpperCase()) !== -1
        ) {
          client.parentNode.parentNode.style.display = 'flex'
        } else {
          client.parentNode.parentNode.style.display = 'none'
        }
      }
    }

    return (
      <Paper
        component='form'
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '80%',
          boxShadow: 8,
          height: '30px'
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label='menu'>
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder='Search Clients'
          inputProps={{ 'aria-label': 'search clients' }}
          onChange={handleSearch}
        />
      </Paper>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minWidth: { xs: '100%', md: '350px' },
        ml: { xs: -1.4 },
        position: { lg: 'fixed', xs: 'absolute' },
        minHeight: { xs: 'calc(100vh - 60px)', md: 'calc(100vh - 64px)' },
        maxHeight: { xs: 'calc(100vh - 60px)', md: 'calc(100vh - 64px)' },
        borderRight: { xs: 'none', md: 'none', lg: '1px solid #E0E1E5' },
        borderLeft: { xs: 'none', md: 'none', lg: '1px solid #E0E1E5' },
        top: { xs: 55, md: 64 }
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '60px',
          background: '#F6F7F9',
          zIndex: 99,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: '1px solid #E0E1E5',
          boxShadow: '0px 2px 5px #c0c1c2'
        }}
      >
        <CustomizedInputBase />
      </Box>
      {/* Client Names */}
      <ClientNames data={{ listChanged }} />
      <Fab
        color='primary'
        aria-label='add'
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          mr: 2,
          mb: { xs: 3, md: 3, lg: 2 }
        }}
        onClick={handleClickOpen}
      >
        <AddIcon fontSize='large' />
      </Fab>
      <ResponsiveDialog
        data={{ open, fullScreen, handleClose, setListChanged }}
      />
    </Box>
  )
}
