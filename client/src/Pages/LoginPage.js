import * as React from 'react'
import axios from 'axios'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Navigate, useNavigate } from 'react-router-dom'
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

function Copyright (props) {
  return (
    <Typography variant='body2' color='text.main' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://the-erp.in/'>
        the-erp.in
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function LoginPage () {
  const { serverUrl } = React.useContext(UserContext)
  const [email, setEmail] = React.useState(null)
  const [password, setPassword] = React.useState(null)
  const [show, setShow] = React.useState(false)
  const [error, setError] = React.useState('')
  const [progress, setProgress] = React.useState(false)
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const token = localStorage.getItem('authToken')
  if (token) {
    return <Navigate to='/' />
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (!email || !password) {
      setShow(true)
      setError('Please provide username and password')
    } else {
      setProgress(true)

      try {
        var { data } = await axios.post(`${serverUrl}/api/user/login`, {
          email,
          password
        })
        localStorage.setItem('authToken', data.token)
        navigate('/')
      } catch (error) {
        setProgress(false)
        setShow(true)
        setError(error.response.data.message)
        localStorage.removeItem('authToken')
      }
    }
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.dark' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            sx={{
              '& .MuiFormLabel-root': {
                color: 'text.main'
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: 'text.main'
              }
            }}
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={e => {
              setEmail(e.target.value)
              setShow(false)
            }}
          />
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
              Password
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
          </FormControl>
          <Button
            disabled={progress}
            id='login'
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            {!progress && <Typography>Sign In</Typography>}
            {progress && <CircularProgress size={30} color='secondary' />}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='/forgotpassword' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='/register' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}
