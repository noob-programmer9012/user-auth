import {
  Box,
  Fab,
  IconButton,
  InputBase,
  Paper,
  useMediaQuery,
  useTheme
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'

import ClientNames from '../Components/ClientNames'
import ResponsiveDialog from './AddClientForm'
import { useState } from 'react'

function CustomizedInputBase () {
  function handleSearch (e) {
    const clients = document.getElementsByClassName('company')
    for (let client of clients) {
      if (
        client.innerText.toUpperCase().indexOf(e.target.value.toUpperCase()) !==
        -1
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
        width: { xs: '90%', sm: '90%' },
        maxHeight: '48px',
        alignSelf: 'center'
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

function Debtors () {
  const [listChanged, setListChanged] = useState(false)
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {/* List */}
      <Box
        sx={{
          maxWidth: { xs: '100%', sm: '350px' },
          height: { xs: 'calc(100vh - 49px)', sm: 'calc(100vh - 64px)' },
          flex: 1,
          overflowY: 'auto',
          background: '#FFFFFF',
          borderRight: '1px solid #D8D9DA'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: '70px',
            background: '#F5F6F7',
            boxShadow: '4px 4px 5px grey',
            position: 'sticky',
            top: 0,
            justifyContent: 'center'
          }}
        >
          <CustomizedInputBase />
        </Box>
        {/* Client Names */}
        <ClientNames data={{ listChanged, setListChanged }} />
        <Fab
          color='primary'
          aria-label='add'
          sx={{
            position: 'fixed',
            bottom: 15,
            left: { xs: 320, sm: 500 },
            mr: 3
          }}
          onClick={handleClickOpen}
        >
          <AddIcon fontSize='large' />
        </Fab>
        <ResponsiveDialog
          data={{ open, fullScreen, handleClose, setListChanged }}
        />
      </Box>
      {/* Details */}
      <Box
        sx={{
          flex: 1,
          background: 'inherit',
          height: '500px',
          display: { xs: 'none' }
        }}
      >
        <h1>Main</h1>
      </Box>
    </Box>
  )
}

export default Debtors
