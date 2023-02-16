import * as React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'
import { Autocomplete, Button, IconButton } from '@mui/material'

export default function AddClient (props) {
  const flatProps = {
    options: top100Films.map(option => option)
  }

  return (
    <React.Fragment>
      <Grid container sx={{ justifyContent: 'space-between' }}>
        <Typography variant='h6' gutterBottom>
          Add Client
        </Typography>
        <IconButton
          aria-label='close'
          sx={{ mt: -0.8 }}
          onClick={() => props.data.handleClose()}
        >
          <CloseIcon sx={{ color: 'black' }} />
        </IconButton>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='companyName'
            name='companyName'
            label='Comapny name'
            fullWidth
            autoComplete='given-name'
            variant='standard'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            {...flatProps}
            readOnly
            id='ledgerType'
            defaultValue={flatProps.options[0]}
            renderInput={params => (
              <TextField {...params} variant='standard' label='Ledger Type' />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='openingBalance'
            name='openingBalance'
            label='Opening Balance'
            fullWidth
            defaultValue={'0.0'}
            variant='standard'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='address1'
            name='address1'
            label='Address line 1'
            fullWidth
            variant='standard'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='address2'
            name='address2'
            label='Address line 2'
            fullWidth
            variant='standard'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='city'
            name='city'
            label='City'
            fullWidth
            variant='standard'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='zip'
            name='zip'
            label='Zip / Postal code'
            fullWidth
            variant='standard'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='gstNo'
            name='gstNo'
            label='GST Number'
            fullWidth
            variant='standard'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='contactNo'
            name='contactNo'
            label='Mobile Number'
            fullWidth
            variant='standard'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='email'
            name='email'
            label='Email Address'
            fullWidth
            variant='standard'
          />
        </Grid>
        <Grid container justifyContent='flex-end' marginTop={1.5}>
          <Button variant='contained' endIcon={<SendIcon />}>
            Add Client
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

const top100Films = ['Sundry Debtors', 'Sundry Creditors', 'Bank']
