import { Box } from '@mui/material'

import ProductForm from '../Components/ProductForm'
import Products from '../Components/Products'

export default function ProductsPage () {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          height: 'calc(100vh - 64px)',
          justifyContent: 'center',
          alignItems: 'center',
          p: 3,
          gap: 2,
          overflow: 'hidden'
        }}
      >
        {/* Form Component */}
        <ProductForm />
        <Products />
      </Box>
    </>
  )
}
