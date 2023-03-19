import {
  Alert,
  Box,
  Button,
  Collapse,
  MobileStepper,
  Paper,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { useState } from 'react'

const steps = ['Start', 'End']

export default function ProductForm (props) {
  const theme = useTheme()
  const { showForm, setShowForm } = props.data
  const [activeStep, setActiveStep] = useState(0)

  // Form States
  const [productName, setProductName] = useState(null)
  const [hsn, setHsn] = useState(null)
  const [show, setShow] = useState(false)
  const [error, setError] = useState(null)

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
    setActiveStep(prev => prev - 1)
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
            height: '45px',
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
                onChange={e => setProductName(e.target.value)}
              ></TextField>
              <TextField
                size={showForm ? 'small' : 'medium'}
                fullWidth
                variant='outlined'
                id='description'
                label='Description'
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
                onChange={e => setHsn(e.target.value)}
              ></TextField>
              <TextField
                size={showForm ? 'small' : 'medium'}
                fullWidth
                select
                variant='outlined'
                id='productType'
                label='Product Type'
              ></TextField>
              <TextField
                size={showForm ? 'small' : 'medium'}
                fullWidth
                variant='outlined'
                id='unit'
                label='Unit'
                defaultValue='Pcs'
              ></TextField>
              <TextField
                size={showForm ? 'small' : 'medium'}
                fullWidth
                variant='outlined'
                id='qty'
                label='Opening Quantity'
                defaultValue={0}
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
              ></TextField>
              <TextField
                size={showForm ? 'small' : 'medium'}
                fullWidth
                select
                required
                variant='outlined'
                id='igstOutside'
                label='IGST-Outside'
              ></TextField>
              <TextField
                size={showForm ? 'small' : 'medium'}
                fullWidth
                variant='outlined'
                id='purchaseRate'
                label='Purchase Rate'
                defaultValue={0}
              ></TextField>
              <TextField
                size={showForm ? 'small' : 'medium'}
                fullWidth
                variant='outlined'
                id='saleRate'
                label='Sale Rate'
                defaultValue={0}
              ></TextField>
              <Button
                variant='contained'
                type='submit'
                onClick={e => e.preventDefault()}
              >
                SUBMIT
              </Button>
            </>
          )}
        </Box>
        {/* End Form */}
        {/* Mobile Stepper */}
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
      </Paper>
    </>
  )
}
