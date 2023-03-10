import * as React from 'react'
import axios from 'axios'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import EditIcon from '@mui/icons-material/Edit'
import { Alert, Box, Button, Collapse, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import UserContext from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'

export default function EditTransporter (props) {
  const { handleClose, open, setChanged, currentTransporter } = props.data
  const [transporter, setTransporter] = React.useState(currentTransporter[0])
  const [gstNo, setGstNo] = React.useState(currentTransporter[1])
  const [show, setShow] = React.useState(false)
  const [error, setError] = React.useState(null)
  const { firm, serverUrl } = React.useContext(UserContext)

  const navigate = useNavigate()

  const token = localStorage.getItem('authToken')
  if (!token) {
    return navigate('/login')
  }

  async function handleSubmit () {
    const firmId = JSON.parse(firm)._id
    if (
      transporter === currentTransporter[0] &&
      gstNo === currentTransporter[1]
    ) {
      setError('No changes were made')
      setShow(true)
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/JSON',
          Authorization: `Bearer ${token}`
        }
      }
      const url = `${serverUrl}/api/transporter/edit/${currentTransporter[2]}/${firmId}`
      const data = await axios.put(
        url,
        { transporterName: transporter, gst_no: gstNo },
        config
      )
      console.log(data)
      setChanged(true)
      handleClose()
    } catch (error) {
      setError(error.response.data.message)
      setShow(true)
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
          Edit Transporter
        </Typography>
        <IconButton>
          <CloseIcon onClick={() => handleClose()} fontSize='medium' />
        </IconButton>
      </Grid>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12}>
          <TextField
            sx={{
              '& .MuiFormLabel-root': {
                color: 'text.main'
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: 'text.main'
              }
            }}
            required
            id='transporterName'
            name='transporterName'
            label='Transporter name'
            defaultValue={currentTransporter[0]}
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
            sx={{
              '& .MuiFormLabel-root': {
                color: 'text.main'
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: 'text.main'
              }
            }}
            required
            id='gst_no'
            name='gst_no'
            label='GST Number'
            defaultValue={currentTransporter[1]}
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
        <Grid container justifyContent='flex-end' marginTop={2} gap={1}>
          <Button
            variant='contained'
            endIcon={<EditIcon />}
            onClick={() => handleSubmit()}
            color='warning'
          >
            EDIT
          </Button>
          <Button
            variant='contained'
            endIcon={<CloseIcon />}
            onClick={() => handleClose()}
            color='error'
          >
            CANCEL
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
