import axios from 'axios'
import {
  Alert,
  Box,
  Button,
  Collapse,
  MenuItem,
  MobileStepper,
  Paper,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { useContext, useState } from 'react'

import UserContext from '../Context/UserContext'

const steps = ['Start', 'End']

const gstTax = ['0% GST', '5% GST', '12% GST', '18% GST', '28% GST']
const igstTax = ['0% IGST', '5% IGST', '12% IGST', '18% IGST', '28% IGST']
const productTypes = ['Goods', 'Service']

export default function ProductForm (props) {
  const theme = useTheme()
  const { serverUrl, firm } = useContext(UserContext)
  const { showForm, setShowForm, setProductsListUpdated } = props.data
  const [activeStep, setActiveStep] = useState(0)

  // Form States
  const [productName, setProductName] = useState(null)
  const [description, setDescription] = useState(null)
  const [productType, setProductType] = useState('Goods')
  const [unit, setUnit] = useState('Pcs')
  const [openingQty, setOpeningQty] = useState(0)
  const [openingRate, setOpeningRate] = useState(0)
  const [purchaseRate, setPurchaseRate] = useState(0)
  const [saleRate, setSaleRate] = useState(0)
  const [hsn, setHsn] = useState(null)
  const [gstState, setGstState] = useState(null)
  const [igstOutside, setIgstOutside] = useState(null)
  const [show, setShow] = useState(false)
  const [error, setError] = useState(null)

  const resetForm = () => {
    setProductName(null)
    setDescription(null)
    setProductType('Goods')
    setUnit('Pcs')
    setOpeningQty(0)
    setOpeningRate(0)
    setPurchaseRate(0)
    setSaleRate(0)
    setHsn(null)
    setGstState(null)
    setIgstOutside(null)
  }

  const nextStep = () => {
    if (!productName) {
      setError('Please enter Product Name')
      setShow(true)
      return
    }
    if (!hsn) {
      setError('Please enter HSN Code')
      setShow(true)
      return
    }
    setShow(false)
    setActiveStep(prev => prev + 1)
  }

  const prevStep = () => {
    setShow(false)
    setActiveStep(prev => prev - 1)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setProductsListUpdated(false)
    if (!gstState || !igstOutside) {
      setError('Please Select GST-State and IGST-Outside')
      setShow(true)
      return
    }
    const token = localStorage.getItem('authToken')
    try {
      const firmId = JSON.parse(firm)._id
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      await axios.post(
        `${serverUrl}/api/products/addProduct`,
        {
          firmId,
          productName,
          description,
          hsn,
          productType,
          unit,
          openingQty,
          openingRate,
          gstState,
          igstOutside,
          purchaseRate,
          saleRate
        },
        config
      )
      setProductsListUpdated(true)
      setShowForm(false)
      resetForm()
      setActiveStep(0)
    } catch (error) {
      setError(error.response.data.message)
      setShow(true)
    }
  }

  return (
    <>
      <Paper
        sx={{
          backgroundColor: 'background.paper',
          flex: 1,
          width: { xs: '100%' },
          height: { xs: '100%' },
          boxShadow: 15,
          borderRadius: { xs: 0, sm: 2 },
          p: { xs: 1, sm: 2 },
          m: 0,
          display: { xs: showForm === false ? 'none' : 'flex', lg: 'flex' },
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 1, sm: 2 },
          overflowY: 'auto'
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '55px',
            position: 'absolute',
            top: 56,
            boxShadow: 10,
            backgroundColor: 'background.default',
            display: { xs: 'flex', sm: 'none' },
            mb: 2
          }}
        >
          <Button
            sx={{ color: 'text.primary', '&:hover': { background: 'none' } }}
            onClick={() => setShowForm(false)}
          >
            <KeyboardArrowLeft />
            <Typography variant='p'>Back</Typography>
          </Button>
        </Box>
        {/* Error */}
        {show && (
          <Box sx={{ width: '100%', position: 'sticky', top: 0, zIndex: 99 }}>
            <Collapse in={show}>
              <Alert onClose={() => setShow(false)} severity='error'>
                {error}
              </Alert>
            </Collapse>
          </Box>
        )}
        {/* End Error */}
        <Typography component='h1' variant='h5' sx={{ mb: 2 }}>
          Add Product
        </Typography>
        {/* Form */}
        <Box
          component='form'
          noValidate
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
          onSubmit={handleSubmit}
        >
          {activeStep === 0 && (
            <>
              <TextField
                size={showForm ? 'small' : 'medium'}
                fullWidth
                required
                variant='outlined'
                id='productName'
                label='Product Name'
                value={productName}
                inputProps={{
                  style: { textTransform: 'uppercase' }
                }}
                onChange={e => {
                  setShow(false)
                  setProductName(e.target.value)
                }}
              ></TextField>
              <TextField
                size={showForm ? 'small' : 'medium'}
                fullWidth
                variant='outlined'
                id='description'
                label='Description'
                onChange={e => setDescription(e.target.value)}
              ></TextField>
              <TextField
                size={showForm ? 'small' : 'medium'}
                fullWidth
                select
                variant='outlined'
                id='productGroup'
                label='Product Group'
              ></TextField>
              <TextField
                size={showForm ? 'small' : 'medium'}
                fullWidth
                required
                variant='outlined'
                id='hsn'
                label='HSN Code'
                value={hsn}
                onChange={e => {
                  setShow(false)
                  e.target.value = e.target.value.replace(/[^0-9]/g, '')
                  setHsn(e.target.value)
                }}
                inputProps={{
                  maxLength: 8
                }}
              ></TextField>
              <TextField
                size={showForm ? 'small' : 'medium'}
                fullWidth
                select
                variant='outlined'
                id='productType'
                label='Product Type'
                defaultValue={productTypes[0]}
                onChange={e => setProductType(e.target.value)}
              >
                {productTypes.map(type => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                size={showForm ? 'small' : 'medium'}
                fullWidth
                variant='outlined'
                id='unit'
                label='Unit'
                defaultValue='Pcs'
                onChange={e => setUnit(e.target.value)}
              ></TextField>
              <TextField
                size={showForm ? 'small' : 'medium'}
                fullWidth
                variant='outlined'
                id='qty'
                label='Opening Quantity'
                defaultValue={0}
                onChange={e => setOpeningQty(e.target.value)}
              ></TextField>
            </>
          )}
          {activeStep === 1 && (
            <>
              <TextField
                size={showForm ? 'small' : 'medium'}
                fullWidth
                variant='outlined'
                id='rate'
                label='Opening Rate'
                onChange={e => setOpeningRate(e.target.value)}
                defaultValue={0}
              ></TextField>
              <TextField
                size={showForm ? 'small' : 'medium'}
                fullWidth
                select
                required
                variant='outlined'
                id='gstState'
                label='GST-State'
                onChange={e => setGstState(e.target.value)}
              >
                {gstTax.map(tax => (
                  <MenuItem key={tax} value={tax}>
                    {tax}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                size={showForm ? 'small' : 'medium'}
                fullWidth
                select
                required
                variant='outlined'
                id='igstOutside'
                label='IGST-Outside'
                onChange={e => setIgstOutside(e.target.value)}
              >
                {igstTax.map(tax => (
                  <MenuItem key={tax} value={tax}>
                    {tax}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                size={showForm ? 'small' : 'medium'}
                fullWidth
                variant='outlined'
                id='purchaseRate'
                label='Purchase Rate'
                onChange={e => setPurchaseRate(e.target.value)}
                defaultValue={0}
              ></TextField>
              <TextField
                size={showForm ? 'small' : 'medium'}
                fullWidth
                variant='outlined'
                id='saleRate'
                label='Sale Rate'
                onChange={e => setSaleRate(e.target.value)}
                defaultValue={0}
              ></TextField>
              <Button variant='contained' type='submit'>
                SUBMIT
              </Button>
            </>
          )}
        </Box>
        {/* End Form */}
        {/* Mobile Stepper */}
        {(activeStep === 0 || show) && (
          <Box sx={{ width: '100%', mt: 2 }}>
            <MobileStepper
              variant='dots'
              steps={steps.length}
              position='static'
              activeStep={activeStep}
              nextButton={
                <Button
                  size={showForm ? 'small' : 'medium'}
                  onClick={nextStep}
                  disabled={activeStep === steps.length - 1}
                >
                  Next
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size={showForm ? 'small' : 'medium'}
                  onClick={prevStep}
                  disabled={activeStep === 0}
                >
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            ></MobileStepper>
          </Box>
        )}
      </Paper>
    </>
  )
}
