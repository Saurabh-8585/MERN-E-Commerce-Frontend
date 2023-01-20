import './login.css'
import { Button, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'


import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {

  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const navigate = useNavigate()
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const sendAuth = await axios.post(`${process.env.REACT_APP_LOGIN}`, { email: credentials.email, password: credentials.password })
    const receive = await sendAuth.data
    if (receive.success === true) {
      localStorage.setItem('Authorization', receive.authToken)
      navigate('/')
    }
  }
  return (
    <Container className="container">
      <form onSubmit={handleSubmit}>
        <Box className='form-box' >
          <TextField id="standard-basic" value={credentials.email} name='email' onChange={handleOnChange} label="Email" type='email' variant="standard" sx={{ width: "90%" }} />
          <TextField id="standard-basic1" value={credentials.password} name='password' onChange={handleOnChange} label="Password" type='password' variant="standard" sx={{ width: "90%" }} />
          <Button variant='contained' type='submit'>Sign In</Button>
          <Typography>Not member yet?<Link to='/register'> <span>Sign Up</span></Link></Typography>
        </Box>
      </form>
    </Container>
  )
}

export default Login