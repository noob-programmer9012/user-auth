import * as React from 'react'
import axios from 'axios'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Alert, Box, Button, Collapse } from '@mui/material'

import UserContext from '../Context/UserContext'

export default function AddFirm () {
  const [open, setOpen] = React.useState(true)

  const { user, setFirm, serverUrl } = React.useContext(UserContext)
  const user_id = JSON.parse(user).data._id

  const [company_name, setCompanyName] = React.useState(null)
  const [line1, setLine1] = React.useState(null)
  const [line2, setLine2] = React.useState(null)
  const [line3, setLine3] = React.useState(null)
  const [gst_no, setGST] = React.useState(null)
  const [mobile, setMobile] = React.useState(null)
  const [error, setError] = React.useState('')
  const [show, setShow] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const HandleSubmit = e => {
    e.preventDefault()

    const saveData = async () => {
      const token = localStorage.getItem('authToken')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const { data } = await axios.post(
          `${serverUrl}/api/firm/createFirm`,
          {
            user_id: user_id,
            company_name: company_name,
            address: {
              line1: line1,
              line2: line2,
              line3: line3
            },
            mobile: mobile,
            gst_no: gst_no
          },
          { headers: config.headers }
        )
        setOpen(false)
        setFirm(data.data)
        window.location.reload()
      } catch (error) {
        setError(error.response.data.message)
        setShow(true)
      }
    }
    saveData()
  }

  const handleNumbers = e => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '')
    e.target.value = onlyNums
    setMobile(e.target.value)
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
      <Grid container sx={{ justifyContent: 'space-between' }}>
        <Typography fullWidth variant='h6' gutterBottom>
          Install Company
        </Typography>
      </Grid>
      <Grid container spacing={3}>
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
            id='companyName'
            name='companyName'
            label='Comapny name'
            fullWidth
            autoComplete='given-name'
            variant='standard'
            onChange={e => {
              setShow(false)
              if (e.target.value === '') {
                setError('Company name field can not be blank!')
                setShow(true)
              }
              setCompanyName(e.target.value)
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
            id='line1'
            name='line1'
            label='Address Line 1'
            fullWidth
            variant='standard'
            onChange={e => setLine1(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{
              '& .MuiFormLabel-root': {
                color: 'text.main'
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: 'text.main'
              }
            }}
            id='line2'
            name='line2'
            label='Address line 2'
            fullWidth
            variant='standard'
            onChange={e => setLine2(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{
              '& .MuiFormLabel-root': {
                color: 'text.main'
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: 'text.main'
              }
            }}
            id='line3'
            name='line3'
            label='City'
            required
            fullWidth
            variant='standard'
            onChange={e => setLine3(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{
              '& .MuiFormLabel-root': {
                color: 'text.main'
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: 'text.main'
              }
            }}
            id='gstNo'
            required
            name='gstNo'
            label='GST Number'
            fullWidth
            variant='standard'
            inputProps={{
              style: { textTransform: 'uppercase' },
              maxLength: 15
            }}
            onChange={e => setGST(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{
              '& .MuiFormLabel-root': {
                color: 'text.main'
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: 'text.main'
              }
            }}
            id='contactNo'
            name='contactNo'
            label='Mobile Number'
            onChange={e => handleNumbers(e)}
            fullWidth
            variant='standard'
          />
        </Grid>
        <Grid container justifyContent='flex-end' marginTop={5}>
          <Button
            variant='contained'
            endIcon={<AddCircleIcon />}
            onClick={e => {
              if (!line3) {
                setError('Please enter your City name.')
                setShow(true)
              } else {
                HandleSubmit(e)
              }
            }}
          >
            Add Firm
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
