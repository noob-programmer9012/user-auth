import * as React from 'react'
import Dialog from '@mui/material/Dialog'

import { Box } from '@mui/material'
import EditTransporter from '../Forms/EditTransporter'

export default function EditTranspoter (props) {
  const { open, setOpen, fullScreen, setChanged, currentTransporter } =
    props.data

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
          <EditTransporter
            data={{ handleClose, open, setChanged, currentTransporter }}
          />
        </Box>
      </Dialog>
    </div>
  )
}
