import * as React from 'react'
// import axios from 'axios'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
// import { Navigate, useNavigate } from 'react-router-dom'
import {
  Alert,
  CircularProgress,
  Collapse,
  CssBaseline,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'

import UserContext from '../Context/UserContext'

export default function LoginPage() {
  const { serverUrl } = React.useContext(UserContext)
  const [password, setPassword] = React.useState(null)
  const [show, setShow] = React.useState(false)
  const [error, setError] = React.useState('')
  const [progress, setProgress] = React.useState(false)

  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleSubmit = async event => {
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Collapse sx={{ mb: 5, width: '100%' }} in={show}>
          <Alert onClose={() => setShow(false)} severity='error'>
            {error}
          </Alert>
        </Collapse>
        <Typography component='h1' variant='h5'>
          Reset Password
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl
            variant='outlined'
            fullWidth
            sx={{
              mt: 1,
              '& .MuiFormLabel-root': {
                color: 'text.main'
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: 'text.main'
              }
            }}
          >
            <InputLabel htmlFor='outlined-adornment-password' required>
              New Password
            </InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={showPassword ? 'text' : 'password'}
              autoComplete='current-password'
              onChange={e => {
                setPassword(e.target.value)
                setShow(false)
              }}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
            <TextField
              id="outlined-password-input"
              label="Retype Password"
              type="password"
              sx={{ mt: 2 }}
            />
          </FormControl>
          <Button
            disabled={progress}
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            {!progress && <Typography>Reset Password</Typography>}
            {progress && <CircularProgress size={30} color='secondary' />}
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
