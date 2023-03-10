import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineFileDone } from 'react-icons/ai'
import { TiArrowBack } from 'react-icons/ti'
import { useNavigate} from 'react-router-dom'
import styles from './Update.module.css'
import { toast } from 'react-toastify'

const UpdateDetails = () => {
    const [userData, setUserData] = useState([])

    let authToken = localStorage.getItem('Authorization')
    let setProceed = authToken ? true : false
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
        zipCode: '',
        city: '',
        userState: '',
    })
    let navigate = useNavigate()
    useEffect(() => {
        setProceed ? getUserData() : navigate('/')
    }, [])
    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_GET_USER_DETAILS}`, {
                headers: {
                    'Authorization': authToken
                }
            })
            userDetails.firstName = data.firstName
            userDetails.lastName = data.lastName
            userDetails.email = data.email
            userDetails.phoneNumber = data.phoneNumber
            userDetails.address = data.address
            userDetails.zipCode = data.zipCode
            userDetails.city = data.city
            userDetails.userState = data.userState
            console.log(1);
            setUserData(data);
            
        } catch (error) {
            console.log(error);
        }
    }
    console.log(userData);
    const handleOnchange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }
    let phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/gm;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // let zipRegex = /^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/;

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!userDetails.email && !userDetails.firstName && !userDetails.phoneNumber && !userDetails.lastName && !userDetails.address && !userDetails.city && !userDetails.userState && !userDetails.zipCode) {
                toast.error("Please Fill the all Fields", { autoClose: 500, theme: 'colored' })
            }
            else if (userDetails.firstName.length < 3 || userDetails.lastName.length < 3) {
                toast.error("Please enter name with more than 3 characters", { autoClose: 500, theme: 'colored' })
            }
            else if (!emailRegex.test(userDetails.email)) {
                toast.error("Please enter valid email", { autoClose: 500, theme: 'colored' })
            }
            else if (!phoneRegex.test(userDetails.phoneNumber)) {
                toast.error("Please enter a valid phone number", { autoClose: 500, theme: 'colored' })
            }
            else if (userDetails.zipCode.length !== 6) {
                toast.error("Please enter valid Zip code", { autoClose: 500, theme: 'colored' })
            }
            else if (userDetails.address.length <= 3) {
                toast.error("Please enter address,more than 3 characters", { autoClose: 500, theme: 'colored' })
            }
            else if (userDetails.userState.length <= 3) {
                toast.error("Please enter address,more than 3 characters", { autoClose: 500, theme: 'colored' })
            }
            else if (userDetails.city.length <= 3) {
                toast.error("Please enter address,more than 3 characters", { autoClose: 500, theme: 'colored' })
            }
            else {
                const { data } = await axios.put(`${process.env.REACT_APP_UPDATE_USER_DETAILS}`, {
                    userDetails: JSON.stringify(userDetails)
                },
                    {
                        headers: {
                            'Authorization': authToken
                        }
                    })
                console.log(data.success);
                if (data.success === true) {
                    toast.success("Updated Successfully", { autoClose: 500, theme: 'colored' })
                    getUserData()
                }
                else {
                    toast.error("Something went wrong", { autoClose: 500, theme: 'colored' })
                }
            }

        }
        catch (error) {
            console.log(error);
            toast.error(error.response.data.error, { autoClose: 500, theme: 'colored' })
        }
    }
    return (
        <Container sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: 10 }}>
            <Typography variant='h6' sx={{ margin: '30px 0' }}>Update Information</Typography>
            <form noValidate autoComplete="off" className={styles.checkout_form} onSubmit={handleSubmit} >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField label="First Name" name='firstName' value={userDetails.firstName || ''} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Last Name" name='lastName' value={userDetails.lastName || ''} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Contact Number" type='tel' name='phoneNumber' value={userDetails.phoneNumber || ''} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Email" name='userEmail' value={userDetails.email || ''} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Address" name='address' value={userDetails.address || ''} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="City" name='city' value={userDetails.city || ''} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField type='tel' label="Postal/Zip Code" name='zipCode' value={userDetails.zipCode || ''} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField label="Province/State" name='userState' value={userDetails.userState || ''} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                </Grid>
                <Container sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 5 }}>
                    <Button variant='contained' endIcon={<TiArrowBack />} onClick={()=>navigate(-1)}>Go back</Button>
                    <Button variant='contained' endIcon={<AiOutlineFileDone />} type='submit'>Update</Button>
                </Container>
            </form >

        </Container >
    )
}

export default UpdateDetails