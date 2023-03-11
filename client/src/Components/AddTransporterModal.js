import * as React from 'react'
import Dialog from '@mui/material/Dialog'

import { Box } from '@mui/material'
import AddTransporter from '../Forms/AddTranspoter'

export default function Modal (props) {
  const { open, setOpen, fullScreen, setChanged } = props.data

  function handleClose () {
    setOpen(false)
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <Box sx={{ p: 5 }}>
          <AddTransporter data={{ handleClose, open, setChanged }} />
        </Box>
      </Dialog>
    </div>
  )
}
