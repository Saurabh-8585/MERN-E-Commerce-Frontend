import '../Login/login.css'
import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Button, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { toast, ToastContainer } from 'react-toastify'


const Register = () => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
  const navigate = useNavigate()
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!credentials.email && !credentials.name && !credentials.password.length) {
        toast.error("Please Fill the all Fields", { autoClose: 500, })
      }
      else if (credentials.name.length <= 3) {
        toast.error("Please enter name with more than 3 characters", { autoClose: 500, })
      }
      else if (credentials.email.length <= 3) {
        toast.error("Please enter email with more than 3 characters", { autoClose: 500, })
      }
      else if (credentials.password.length < 5) {
        toast.error("Please enter password with more than 5 characters", { autoClose: 500, })
      }
      else if (credentials.email && credentials.name && credentials.password.length) {
        const sendAuth = await axios.post(`${process.env.REACT_APP_REGISTER}`, { name: credentials.name, email: credentials.email, password: credentials.password })
        const receive = await sendAuth.data
        if (receive.success === true) {
          toast.success("Registered Successfully", { autoClose: 500, })
          localStorage.setItem('Authorization', receive.authToken)
          navigate('/')
        }
      }

    } catch (error) {
      toast.error(error.response.data.error[0].msg, { autoClose: 500, })
    }

  }
  return (
    <Container className="container">
      <ToastContainer />
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