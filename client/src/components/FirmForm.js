import * as React from 'react'
import axios from 'axios'
import Dialog from '@mui/material/Dialog'
import { Alert, Box, Button, Collapse, TextField } from '@mui/material'
import UserContext from './context/userContext'

export default function FirmForm () {
  const [open, setOpen] = React.useState(true)

  const { user, setFirm } = React.useContext(UserContext)
  const user_id = user._id

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
    window.location.reload()
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
          '/api/firm/createFirm',
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
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: { xs: '100wh', md: '100wh', lg: '600px' },
            height: { xs: '100vh', md: '100vh', lg: '500px' }
          }}
        >
          <Collapse sx={{ mt: 2, width: '90%' }} in={show}>
            <Alert onClose={() => setShow(false)} severity='error'>
              {error}
            </Alert>
          </Collapse>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: '90%', md: '90%', lg: '90%' }
            }}
          >
            <Box
              component='form'
              onSubmit={HandleSubmit}
              noValidate
              sx={{ mt: 1, width: '100%' }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='firm'
                label='Company Name'
                name='companyname'
                autoFocus
                variant='standard'
                onChange={e => setCompanyName(e.target.value)}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='address1'
                label='Address Line 1'
                id='address1'
                variant='standard'
                onChange={e => setLine1(e.target.value)}
              />
              <Box
                sx={{
                  display: 'flex',
                  gap: 0.5,
                  flexDirection: { xs: 'column', md: 'column', lg: 'row' }
                }}
              >
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='address2'
                  label='Address Line 2'
                  id='address2'
                  variant='standard'
                  sx={{ flex: 1 }}
                  onChange={e => setLine2(e.target.value)}
                />{' '}
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='address3'
                  label='Address Line 3'
                  id='address3'
                  variant='standard'
                  sx={{ flex: 1 }}
                  onChange={e => setLine3(e.target.value)}
                />
              </Box>
              <TextField
                margin='normal'
                required
                fullWidth
                name='gstnumber'
                label='GST Number'
                id='gstnumber'
                variant='standard'
                inputProps={{ style: { textTransform: 'uppercase' } }}
                onChange={e => setGST(e.target.value)}
              />
              <TextField
                margin='normal'
                fullWidth
                name='contact'
                label='Mobile Number'
                id='contact'
                onChange={handleNumbers}
                variant='standard'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Register Firm
              </Button>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </div>
  )
}
