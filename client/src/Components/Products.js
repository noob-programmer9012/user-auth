import { Box, Fab, Paper } from '@mui/material'
import ProductsDataGrid from './ProductsDataGrid'

import AddIcon from '@mui/icons-material/Add'

export default function Products (props) {
  const { showForm, setShowForm, productsListUpdated, setProductsListUpdated } =
    props.data
  return (
    <Paper
      sx={{
        position: 'relative',
        flex: 2,
        backgroundColor: 'background.paper',
        height: '100%',
        boxShadow: 15,
        borderRadius: 2,
        overflow: 'auto',
        display: { xs: showForm === false ? 'flex' : 'none', lg: 'flex' },
        alignItems: 'center',
        p: { sx: 0, sm: 2 }
      }}
    >
      <Fab
        color='primary'
        aria-label='add'
        sx={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          display: { sx: 'block', sm: 'none' }
        }}
        onClick={() => setShowForm(prev => !prev)}
      >
        <AddIcon fontSize='large' />
      </Fab>
      <Box sx={{ width: '100%', height: '100%' }}>
        <ProductsDataGrid
          data={{ productsListUpdated, setProductsListUpdated }}
        />
      </Box>
    </Paper>
  )
}
