import './login.css'
import { Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MdLockOutline } from 'react-icons/md'
import CopyRight from '../../Components/CopyRight/CopyRight'



const Login = () => {

  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const navigate = useNavigate()
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    try {
      if (!credentials.email && !credentials.password) {
        toast.error("Please Fill the all Fields", { autoClose: 500, theme: 'colored' })
      }
      else if (!emailRegex.test(credentials.email)) {
        toast.error("Please enter a valid email", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.password.length < 5) {
        toast.error("Please enter password with more than 5 characters", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.email && credentials.password) {
        const sendAuth = await axios.post(`${process.env.REACT_APP_LOGIN}`, { email: credentials.email, password: credentials.password })
        const receive = await sendAuth.data
        if (receive.success === true) {
          toast.success("Login Successfully", { autoClose: 500, theme: 'colored' })
          localStorage.setItem('Authorization', receive.authToken)
          navigate('/')
        }
      }
    }
    catch (error) {
      error.response.data.error.length === 1 ?
        toast.error(error.response.data.error[0].msg, { autoClose: 500, theme: 'colored' })
        : toast.error(error.response.data.error, { autoClose: 500, theme: 'colored' })
    }

  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
          <MdLockOutline />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            value={credentials.email}
            name='email'
            onChange={handleOnChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={credentials.password}
            name='password'
            onChange={handleOnChange}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgotpassword" variant="body2" style={{ color: '#1976d2' }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2" >
                Don't have an account?<span style={{ color: '#1976d2' }}> Sign Up</span>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <CopyRight sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}

export default Login