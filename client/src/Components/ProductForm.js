import {
  Box,
  Button,
  MobileStepper,
  Paper,
  Step,
  StepLabel,
  Stepper,
  useTheme
} from '@mui/material'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { useState } from 'react'

const steps = ['Part 1', 'Part 2', 'End']

export default function ProductForm () {
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0)

  return (
    <>
      <Paper
        sx={{
          backgroundColor: 'background.paper',
          flex: 1,
          height: '100%',
          boxShadow: 15,
          borderRadius: 2,
          pt: 2,
          pb: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1
        }}
      >
        {/* Stepper */}
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {/* End of stepper */}
        <MobileStepper
          variant='dots'
          steps={steps.length}
          position='static'
          activeStep={activeStep}
          nextButton={
            <Button
              size='small'
              onClick={() => setActiveStep(prev => prev + 1)}
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
              size='small'
              onClick={() => setActiveStep(prev => prev - 1)}
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
      </Paper>
    </>
  )
}
