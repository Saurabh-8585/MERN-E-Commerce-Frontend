import './login.css'
import { Button, TextField } from '@mui/material'
import { Box, Container } from '@mui/system'


import React from 'react'
import { useState } from 'react'
import axios from 'axios'
const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
    console.log(credentials);
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    const sendAuth = await axios.post(`${process.env.REACT_APP_LOGIN}`, { email: credentials.email, password: credentials.password })
    const receive = await sendAuth.data
    console.log(receive);
    if (receive.success === true) {
      localStorage.setItem('Authorization', receive.authToken)
    }
  }
  return (
    <Container className="container">
      <form onSubmit={handleSubmit}>
        <Box className='form-box' >
          <TextField id="standard-basic" value={credentials.email} name='email' onChange={handleOnChange} label="Email" type='email' variant="standard" sx={{ width: "90%" }} />
          <TextField id="standard-basic1" value={credentials.password} name='password' onChange={handleOnChange} label="Password" type='password' variant="standard" sx={{ width: "90%" }} />
          <Button variant='contained' type='submit'>Sign In</Button>
        </Box>
      </form>
    </Container>
  )
}

export default Login