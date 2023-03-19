import { Fab, Paper } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'

export default function Products (props) {
  const { showForm, setShowForm } = props.data
  return (
    <Paper
      sx={{
        position: 'relative',
        flex: 2,
        backgroundColor: 'background.paper',
        height: '100%',
        boxShadow: 15,
        borderRadius: 2,
        overflow: 'hidden',
        display: { xs: showForm === false ? 'flex' : 'none', lg: 'flex' }
      }}
    >
      <Fab
        color='primary'
        aria-label='add'
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          display: { sx: 'block', sm: 'none' }
        }}
        onClick={() => setShowForm(prev => !prev)}
      >
        <AddIcon fontSize='large' />
      </Fab>
    </Paper>
  )
}
