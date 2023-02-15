import { Box, Fab, IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'

import ClientNames from './ClientNames'

export default function ClientList () {
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
        minWidth: { xs: '90%', md: '350px' },
        position: 'fixed',
        minHeight: { xs: 'calc(100vh - 57px)', md: 'calc(100vh - 64px)' },
        maxHeight: { xs: 'calc(100vh - 57px)', md: 'calc(100vh - 64px)' },
        borderRight: '1px solid #E0E1E5',
        borderLeft: '1px solid #E0E1E5',
        top: { xs: 57, md: 64 }
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
      <ClientNames />
      <Fab
        color='primary'
        aria-label='add'
        sx={{ position: 'absolute', bottom: 0, right: 0, mr: 2, mb: 2 }}
      >
        <AddIcon fontSize='large' />
      </Fab>
    </Box>
  )
}
