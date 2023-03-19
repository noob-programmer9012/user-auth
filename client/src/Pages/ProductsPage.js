import { Box } from '@mui/material'
import { useState } from 'react'

import ProductForm from '../Components/ProductForm'
import Products from '../Components/Products'

export default function ProductsPage () {
  const [showForm, setShowForm] = useState(false)
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          height: { xs: 'calc(100vh - 55px)', sm: 'calc(100vh - 64px)' },
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 0, sm: 2 },
          gap: 2,
          overflow: 'auto'
        }}
      >
        {/* Form Component */}
        <ProductForm data={{ showForm, setShowForm }} />
        <Products data={{ showForm, setShowForm }} />
      </Box>
    </>
  )
}
