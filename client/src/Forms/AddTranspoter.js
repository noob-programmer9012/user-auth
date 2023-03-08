import * as React from 'react'
import axios from 'axios'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Alert, Box, Button, Collapse, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import UserContext from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'

export default function AddTransporter (props) {
  const { handleClose, open, setChanged } = props.data
  const [transporter, setTransporter] = React.useState(null)
  const [gstNo, setGstNo] = React.useState(null)
  const [show, setShow] = React.useState(false)
  const [error, setError] = React.useState(null)
  const { firm, serverUrl } = React.useContext(UserContext)

  const navigate = useNavigate()

  async function handleSubmit () {
    const firmId = await JSON.parse(firm)._id
    if (!transporter || !gstNo) {
      setError('Both fields are compulsory')
      setShow(true)
    } else {
      // Submit Data
      const token = localStorage.getItem('authToken')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      try {
        await axios.post(
          `${serverUrl}/api/transporter/addtransporter`,
          { firmId, transporterName: transporter, gst_no: gstNo },
          config
        )
        setChanged(true)
        handleClose()
      } catch (error) {
        if (
          error.response.data.message === 'Not authorized to access this route'
        ) {
          navigate('/login')
        }
        setError(error.response.data.message)
        setShow(true)
      }
    }
  }

  function notEmpty (e) {
    if (!e.target.value) {
      setError(`Please enter ${e.target.name}`)
      setShow(true)
    } else {
      setShow(false)
    }
  }

  return (
    <Box open={open} onClose={handleClose}>
      {setShow && (
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Collapse in={show}>
            <Alert onClose={() => setShow(false)} severity='error'>
              {error}
            </Alert>
          </Collapse>
        </Grid>
      )}
      <Grid
        container
        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography fullWidth variant='h6' fontWeight={600} gutterBottom>
          Add Transporter
        </Typography>
        <IconButton>
          <CloseIcon onClick={() => handleClose()} fontSize='medium' />
        </IconButton>
      </Grid>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12}>
          <TextField
            required
            id='transporterName'
            name='transporterName'
            label='Transporter name'
            fullWidth
            variant='outlined'
            inputProps={{
              style: { textTransform: 'uppercase' }
            }}
            onChange={e => {
              notEmpty(e)
              setTransporter(e.target.value)
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='gst_no'
            name='gst_no'
            label='GST Number'
            fullWidth
            variant='outlined'
            inputProps={{
              style: { textTransform: 'uppercase' },
              maxLength: 15
            }}
            onChange={e => {
              notEmpty(e)
              setGstNo(e.target.value)
            }}
          />
        </Grid>
        <Grid container justifyContent='flex-end' marginTop={2}>
          <Button
            variant='contained'
            endIcon={<AddCircleIcon />}
            onClick={() => handleSubmit()}
          >
            SUBMIT
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
