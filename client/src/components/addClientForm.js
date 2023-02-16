import * as React from 'react'
import Dialog from '@mui/material/Dialog'

import AddClient from './Forms/AddClient'
import { Box } from '@mui/material'

export default function ResponsiveDialog (props) {
  const { open, fullScreen, handleClose } = props.data

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <Box sx={{ p: 5 }}>
          <AddClient data={{ handleClose }} />
        </Box>
      </Dialog>
    </div>
  )
}
