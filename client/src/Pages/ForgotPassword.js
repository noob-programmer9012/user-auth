import axios from 'axios'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Collapse,
  Container,
  CssBaseline,
  TextField,
  Typography
} from '@mui/material'
import { useState, useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import UserContext from '../Context/UserContext'

const ForgotPasswordPage = () => {
  const { serverUrl } = useContext(UserContext)
  const [email, setEmail] = useState(null)
  const [error, setError] = useState(null)
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  const token = localStorage.getItem('authToken')
  if (token) {
    return <Navigate to='/' />
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!email) {
      setError("Please enter your email address.");
      setShow(true);
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
        `${serverUrl}/api/user/forgotpassword`,
        { email },
        config
      )
      if (data.success) navigate("/");
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
      setShow(true)
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
        <Collapse in={show} sx={{ width: '100%', mb: 3 }}>
          <Alert onClose={() => setShow(false)} severity='error'>
            {error}
          </Alert>
        </Collapse>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.dark' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Send Password Reset Link
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            sx={{
              mt: 1,
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
            autoFocus
            onChange={e => setEmail(e.target.value)}
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Send Link
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default ForgotPasswordPage
