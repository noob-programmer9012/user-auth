import axios from 'axios'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Collapse,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Link,
  TextField,
  ThemeProvider,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const [username, setUsername] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [repeatePassword, setRepeatPassword] = useState(null)
  const [error, setError] = useState(null)
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  const theme = createTheme()

  const token = localStorage.getItem('authToken')
  if (token) {
    return <Navigate to='/' />
  }

  async function handleSubmit (e) {
    e.preventDefault()

    if (password !== repeatePassword) {
      setError('Passwords do not match!')
      setShow(true)
      return
    }

    if (!username || !email || !password || !repeatePassword) {
      setError('All fields are mandatory')
      setShow(true)
      return
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }

    try {
      const { data } = await axios.post(
        '/api/user/register',
        { username, email, password },
        config
      )
      localStorage.setItem('authToken', data.token)
      navigate('/')
    } catch (error) {
      setError(error.response.data.message)
      setShow(true)
    }
  }

  return (
    <ThemeProvider theme={theme}>
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
          <Collapse in={show} sx={{ width: '100%', mb: 3 }}>
            <Alert onClose={() => setShow(false)} severity='error'>
              {error}
            </Alert>
          </Collapse>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Register
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoComplete='username'
              autoFocus
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={e => setPassword(e.target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='repeatpassword'
              label='Repeat Password'
              type='repeatpassword'
              id='repeatpassword'
              autoComplete='current-password'
              onChange={e => setRepeatPassword(e.target.value)}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href='/login' variant='body2'>
                  {'Already have an account? Sign In'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default RegisterPage
