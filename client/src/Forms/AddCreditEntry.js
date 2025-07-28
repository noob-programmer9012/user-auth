import * as React from 'react'
import axios from 'axios'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Alert, Box, Button, Collapse, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import UserContext from '../Context/UserContext'
import SelectX from '../Components/SelectX'

export default function AddCreditEntry(props) {
  const paymentTypes = ['UPI', 'CASH', 'SALES RETURN', 'ANGADIYA', 'NEFT/RTGS/IMPS']

  const { handleClose, open, setChanged, debtor, setTo } = props.data

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [date, setDate] = React.useState(dayjs(today));
  const [amount, setAmount] = React.useState(undefined);
  const [cno, setCno] = React.useState(undefined);
  const [show, setShow] = React.useState(false)
  const [error, setError] = React.useState(null)
  const { firm, serverUrl } = React.useContext(UserContext)
  const [paymentType, setPaymentType] = React.useState(paymentTypes[0])
  const token = localStorage.getItem("authToken");

  const handleNumbers = e => {
    const onlyNums = e.target.value.replace(/[^0-9.0-9]/g, '')
    if (onlyNums.indexOf('.') !== onlyNums.lastIndexOf('.')) {
      setError("Please enter valid amount.");
      setShow(true);
    } else {
      setShow(false);
      e.target.value = onlyNums;
      setAmount(e.target.value);
    }
  }

  const handleOnlyNumbers = e => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    e.target.value = onlyNums;
    setCno(e.target.value);
  }

  async function handleSubmit() {
    if (!amount) {
      setError("Amount field is required.");
      setShow(true);
    }
    const debtorId = debtor._id;
    const firmId = JSON.parse(firm)._id;

    try {
      const url = `${serverUrl}/api/ledgers/addcreditentry`;
      const body = {
        firmId,
        clientId: debtorId,
        date: new Date(date).toLocaleDateString(),
        amount,
        againstChallanNumber: cno,
        paymentType
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const data = await axios.post(url, body, config);
      if (data.data.success) {
        setChanged(true);
        setTo(dayjs(date))
        handleClose();
      }
    } catch (error) {
      setError(error.message);
      setShow(true);
    }
    return;
  }

  return (
    <Box open={open} onClose={() => handleClose()}>
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
          Add Credit Entry
        </Typography>
        <IconButton>
          <CloseIcon onClick={() => handleClose()} fontSize='medium' />
        </IconButton>
      </Grid>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
              <DatePicker
                label="Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                sx={{ width: "100%" }}
                format="DD-MM-YYYY"
              />
            </DemoContainer>
          </LocalizationProvider>
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
            id='amount'
            name='amount'
            label='Amount'
            onChange={e => handleNumbers(e)}
            fullWidth
            variant='outlined'
            value={amount}
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
            id='against'
            name='against'
            label='Challan Number'
            fullWidth
            variant='outlined'
            onChange={e => handleOnlyNumbers(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <SelectX defaultVal={paymentType} setVal={setPaymentType} arr={paymentTypes} label="Payment Type *" />
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
