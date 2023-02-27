import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, Button, CssBaseline, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { MdLockOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import CopyRight from '../../Components/CopyRight/CopyRight'

const AddNewPassword = () => {
    const { id, token } = useParams()
    const [password, setPassword] = useState('')
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const sendPassword = await axios.post(`${process.env.REACT_APP_FORGOT_PASSWORD}/${id}/${token}`, { newPassword: password })
            console.log(sendPassword);
            if (sendPassword.data.msg.name === "TokenExpiredError") {
                toast.error("Token has been expired ,Please try again", { autoClose: 500, theme: 'colored' })

            }
            else {
                toast.success(sendPassword.data.msg, { autoClose: 500, theme: 'colored' })
                navigate('/login')
            }
        } catch (error) {
            toast.error(error)
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
                    Forgot Password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Enter New Password"
                        value={password}
                        name='password'
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="password"
                        type='password'
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>

                </Box>
            </Box>
            <CopyRight sx={{ mt: 8, mb: 4 }} />
        </Container>
    )
}

export default AddNewPassword