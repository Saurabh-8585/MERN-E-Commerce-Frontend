import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, Button, CssBaseline, InputAdornment, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { MdLockOutline } from 'react-icons/md'
import axios from 'axios'
import { toast } from 'react-toastify'
import CopyRight from '../../Components/CopyRight/CopyRight'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';


const AddNewPassword = () => {
    const { id, token } = useParams()
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const { data } = await axios.post(`${process.env.REACT_APP_FORGOT_PASSWORD}/${id}/${token}`, { newPassword: password })
            if (data.msg.name == "TokenExpiredError") {
                toast.error("Token is expired Please try again", { autoClose: 500, theme: 'colored' })
                navigate('/login')
            }
            else {
                toast.success(data.msg, { autoClose: 500, theme: 'colored' })
                navigate('/login')
            }

        } catch (error) {
            toast.error(error.response.data.msg, { autoClose: 500, theme: 'colored' })
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
                        label="Enter New Password"
                        value={password}
                        name='password'
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="password"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" onClick={handleClickShowPassword} sx={{ cursor: 'pointer' }}>
                                    {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                                </InputAdornment>
                            )
                        }}
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