import '../Login/login.css'
import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Button, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'


const Register = () => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
  const navigate = useNavigate()
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
    console.log(credentials);
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const sendAuth = await axios.post(`${process.env.REACT_APP_REGISTER}`, { name: credentials.name, email: credentials.email, password: credentials.password })
    const receive = await sendAuth.data
    console.log(receive);
    if (receive.success === true) {
      localStorage.setItem('Authorization', receive.authToken)
      navigate('/')
    }

  }
  return (
    <Container className="container">
      <form onSubmit={handleSubmit}>
        <Box className='form-box' >

          <TextField id="standard-basic" value={credentials.name} name='name' onChange={handleOnChange} label="Name" type='text' variant="standard" sx={{ width: "90%" }} />
          <TextField id="standard-basic2" value={credentials.email} name='email' onChange={handleOnChange} label="Email" type='email' variant="standard" sx={{ width: "90%" }} />
          <TextField id="standard-basic3" value={credentials.password} name='password' onChange={handleOnChange} label="Password" type='password' variant="standard" sx={{ width: "90%" }} />
          <Button variant='contained' type='submit'>Sign In</Button>
          <Typography>Already a member?  <Link to='/login'> <span>Sign In</span></Link></Typography>
        </Box>
      </form>
    </Container>
  )
}

export default Register