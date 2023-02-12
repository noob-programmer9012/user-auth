import { Box, IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

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

export default function ClientsPage () {
  return (
    <>
      {/* Clients List */}
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
        <Box sx={{ overflowY: 'auto' }}>
          <h1>Start</h1>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>End</h1>
        </Box>
      </Box>
      {/* Clients details */}
      <Box
        sx={{
          height: '100%',
          flex: 2,
          marginLeft: '370px',
          p: 2
        }}
      >
        <Box>
          <div>
            <h1>Main Content</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>Test</h1>
            <h1>End</h1>
          </div>
        </Box>
      </Box>
    </>
  )
}
