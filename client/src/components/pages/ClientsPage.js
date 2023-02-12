import { Box } from '@mui/material'

import ClientList from '../ClientList'

export default function ClientsPage () {
  return (
    <>
      {/* Clients List */}
      <ClientList />
      {/* Clients details */}
      <Box
        sx={{
          height: '100%',
          flex: 2,
          marginLeft: '370px',
          p: 2
        }}
      >
        <Box></Box>
      </Box>
    </>
  )
}
