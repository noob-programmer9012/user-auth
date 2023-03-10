import * as React from 'react'
import axios from 'axios'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee'

import {
  Alert,
  Autocomplete,
  Button,
  Collapse,
  IconButton,
  InputAdornment
} from '@mui/material'

import UserContext from '../Context/UserContext'

export default function AddClient (props) {
  const flatProps = {
    options: ledger_type.map(option => option)
  }

  const { firm, serverUrl } = React.useContext(UserContext)
  const firmId = JSON.parse(firm)._id
  const [companyName, setCompanyName] = React.useState(null)
  const [ledgerGroup, setLedgerGroup] = React.useState(flatProps.options[0])
  const [openingBalance, setOpeningBalance] = React.useState(parseFloat(0.0))
  const [address1, setAddress1] = React.useState(null)
  const [address2, setAddress2] = React.useState(null)
  const [address3, setAddress3] = React.useState(null)
  const [pinCode, setPinCode] = React.useState('')
  const [gstNo, setGstNo] = React.useState('')
  const [mobile, setMobile] = React.useState('')
  const [email, setEmail] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [show, setShow] = React.useState(false)

  const token = localStorage.getItem('authToken')

  const postClient = async function () {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    try {
      await axios.post(
        `${serverUrl}/api/ledgers/createledger`,
        {
          firmId,
          companyName,
          ledgerGroup,
          openingBalance,
          address: { line1: address1, line2: address2, line3: address3 },
          pincode: pinCode,
          gst_no: gstNo,
          mobile,
          email
        },
        { headers: config.headers }
      )
      props.data.handleClose()
      props.data.setListChanged(true)
    } catch (error) {
      setError(error.response.data.message)
      setShow(true)
    }
  }

  const handleNumbers = e => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '')
    e.target.value = onlyNums
  }

  return (
    <React.Fragment>
      {show && (
        <>
          <Grid
            item
            xs={12}
            sx={{
              mb: 2,
              position: { xs: 'sticky', sm: 'inherit' },
              top: { xs: 5 },
              zIndex: 99
            }}
          >
            <Collapse in={show}>
              <Alert onClose={() => setShow(false)} severity='error'>
                {error}
              </Alert>
            </Collapse>
          </Grid>
        </>
      )}
      <Grid container sx={{ justifyContent: 'space-between' }}>
        <Typography fullWidth variant='h6' gutterBottom>
          Add Client
        </Typography>
        <IconButton
          aria-label='close'
          sx={{ mt: -0.8 }}
          onClick={() => props.data.handleClose()}
        >
          <CloseIcon sx={{ color: 'text.main' }} />
        </IconButton>
      </Grid>
      <Grid container spacing={3}>
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
        <Grid item xs={12} sm={6}>
          <Autocomplete
            {...flatProps}
            readOnly
            sx={{
              '& .MuiFormLabel-root': {
                color: 'text.main'
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: 'text.main'
              }
            }}
            id='ledgerType'
            defaultValue={ledgerGroup}
            renderInput={params => (
              <TextField {...params} variant='standard' label='Ledger Type' />
            )}
            onChange={e => setLedgerGroup(e.target.value)}
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
            id='openingBalance'
            name='openingBalance'
            label='Opening Balance'
            fullWidth
            defaultValue={'0.0'}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <CurrencyRupeeIcon fontSize='small' />
                </InputAdornment>
              )
            }}
            variant='standard'
            onChange={e => {
              e.target.value = e.target.value.replace(/[^0-9.]/g, '')
              setOpeningBalance(parseFloat(e.target.value))
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
            id='address1'
            name='address1'
            label='Address line 1'
            fullWidth
            variant='standard'
            onChange={e => setAddress1(e.target.value)}
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
            id='address2'
            name='address2'
            label='Address line 2'
            fullWidth
            variant='standard'
            onChange={e => setAddress2(e.target.value)}
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
            id='city'
            name='city'
            label='City'
            required
            fullWidth
            variant='standard'
            onChange={e => setAddress3(e.target.value)}
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
            id='zip'
            name='zip'
            label='Zip / Postal code'
            fullWidth
            variant='standard'
            onChange={e => {
              handleNumbers(e)
              setPinCode(e.target.value)
            }}
            inputProps={{ maxLength: 6 }}
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
            name='gstNo'
            label='GST Number'
            fullWidth
            variant='standard'
            inputProps={{
              style: { textTransform: 'uppercase' },
              maxLength: 15
            }}
            onChange={e => setGstNo(e.target.value)}
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
            onChange={e => {
              handleNumbers(e)
              setMobile(e.target.value)
            }}
            fullWidth
            variant='standard'
            inputProps={{ maxLength: 10 }}
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
            id='email'
            name='email'
            label='Email Address'
            fullWidth
            onChange={e => setEmail(e.target.value)}
            variant='standard'
          />
        </Grid>
        <Grid container justifyContent='flex-end' marginTop={1.5}>
          <Button
            variant='contained'
            endIcon={<AddCircleIcon />}
            onClick={() => {
              if (!companyName) {
                setError('Please enter Company name!')
                setShow(true)
              } else if (!address3) {
                setError('Please enter city name!')
                setShow(true)
              } else {
                postClient()
              }
            }}
          >
            Add Client
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

const ledger_type = ['Sundry Debtors', 'Sundry Creditors', 'Bank']
