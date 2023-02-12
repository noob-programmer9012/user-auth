import {
  Box,
  Divider,
  Fab,
  IconButton,
  InputBase,
  Paper,
  Typography
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'

function CustomizedInputBase () {
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
        inputProps={{ 'aria-label': 'search google maps' }}
      />
    </Paper>
  )
}

export default function ClientList () {
  const colors = [
    '#0179A8',
    '#346CB0',
    '#5F4B8B',
    '#B76BA3',
    '#EA6759',
    '#EC935E',
    '#F7C46C',
    '#A7C796',
    '#00A28A',
    '#3686A0',
    '#0179A8',
    '#346CB0'
  ]
  const name = 'Zathunicon'
  const randomNumber = Math.floor(Math.random() * colors.length)

  const randomColor = colors[randomNumber]

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minWidth: '350px',
        position: 'fixed',
        minHeight: 'calc(100vh - 64px)',
        maxHeight: 'calc(100vh - 64px)',
        borderRight: '1px solid #E0E1E5',
        borderLeft: '1px solid #E0E1E5',
        top: 64
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
      <Box
        sx={{
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          mt: 1
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 2,
            cursor: 'pointer'
          }}
          id='box1'
          onClick={e => alert(e.target.id)}
        >
          <Box
            sx={{
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              background: randomColor,
              border: 0,
              ml: 2,
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: 600,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {name[0]}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h6'>Zathunicon, Inc</Typography>
            <Typography variant='p' sx={{ fontSize: '0.9rem' }}>
              San Francisco, United States
            </Typography>
          </Box>
        </Box>
        <Divider
          sx={{
            background: '1px solid #E0E1E5',
            mt: 1.5,
            width: '80%',
            alignSelf: 'flex-end'
          }}
        />
      </Box>
      <Fab
        color='secondary'
        aria-label='add'
        sx={{ position: 'absolute', bottom: 0, right: 0, mr: 2, mb: 2 }}
      >
        <AddIcon />
      </Fab>
    </Box>
  )
}
