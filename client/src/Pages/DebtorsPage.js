import {
  Box,
  Fab,
  IconButton,
  InputBase,
  Paper,
  Slide,
  useMediaQuery,
  useTheme
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'

import ClientNames from '../Components/ClientNames'
import ResponsiveDialog from './AddClientForm'
import { useState } from 'react'
import DebtorDetails from './DebtorDetails'

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
  const [debtor, setDebtor] = useState(null)
  const [open, setOpen] = useState(false)
  const [showlist, setShowlist] = useState(true)
  const [checked, setChecked] = useState(false)
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
      {/* List with animation*/}
      <Slide direction='right' in={!checked} mountOnEnter unmountOnExit>
        <Box
          sx={{
            maxWidth: { xs: '100%', md: '350px' },
            height: { xs: 'calc(100vh - 49px)', sm: 'calc(100vh - 64px)' },
            flex: 1,
            overflowY: 'auto',
            backgroundColor: 'background.paper',
            borderRight: 1,
            borderColor: 'background.border',
            display: { xs: showlist ? 'block' : 'none', md: 'none' }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              height: '70px',
              backgroundColor: 'background.default',
              boxShadow: 3,
              position: 'sticky',
              top: 0,
              justifyContent: 'center'
            }}
          >
            <CustomizedInputBase />
          </Box>
          {/* Client Names */}
          <ClientNames
            data={{
              listChanged,
              setListChanged,
              setDebtor,
              setShowlist,
              setChecked
            }}
          />
          <Fab
            color='primary'
            aria-label='add'
            sx={{
              position: 'fixed',
              bottom: 15,
              right: 0,
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
      </Slide>
      {/* List without animation */}
      <Box
        sx={{
          maxWidth: { xs: '100%', md: '350px' },
          height: { xs: 'calc(100vh - 49px)', sm: 'calc(100vh - 64px)' },
          flex: 1,
          overflowY: 'auto',
          backgroundColor: 'background.paper',
          borderRight: 1,
          borderColor: 'background.border',
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: '70px',
            backgroundColor: 'background.default',
            boxShadow: 5,
            position: 'sticky',
            top: 0,
            justifyContent: 'center'
          }}
        >
          <CustomizedInputBase />
        </Box>
        {/* Client Names */}
        <ClientNames
          data={{
            listChanged,
            setListChanged,
            setDebtor,
            setShowlist,
            setChecked
          }}
        />
        <Fab
          color='primary'
          aria-label='add'
          sx={{
            position: 'fixed',
            bottom: 15,
            left: { sm: 510 },
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
      <Slide direction='left' in={checked} mountOnEnter unmountOnExit>
        <Box
          sx={{
            flex: 1,
            backgroundColor: 'background.default',
            height: '500px',
            display: { xs: showlist === false ? 'block' : 'none', md: 'block' }
          }}
        >
          {debtor && (
            <DebtorDetails
              data={{ debtor, showlist, setShowlist, setChecked }}
            />
          )}
        </Box>
      </Slide>
    </Box>
  )
}

export default Debtors
