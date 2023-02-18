import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Grid, TextField } from '@mui/material'
import styles from './Chekout.module.css'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { MdUpdate } from 'react-icons/md'
import { AiOutlineFileDone } from 'react-icons/ai'
import axios from 'axios'
import { ContextFunction } from '../../Context/Context'
import profileImg from '../../Assets/Banner/vecteezy_user-avatar-line-style_.jpg'
import { Link, useNavigate } from 'react-router-dom'

const CheckoutForm = () => {
    const { cart } = useContext(ContextFunction)
    const [userData, setUserData] = useState([])

    let authToken = localStorage.getItem('Authorization')
    let setProceed = authToken ? true : false
    let navigate = useNavigate()
    let totalAmount = localStorage.getItem('totalAmount')

    useEffect(() => {
        if (setProceed) {
            getUserData()
        }
        else {
            navigate('/')
        }
    }, [])

    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        userEmail: '',
        address: '',
        zipCode: '',
        city: '',
        userState: '',
        country: '',
    })
    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_GET_USER_DETAILS}`, {
                headers: {
                    'Authorization': authToken
                }
            })
            setUserData(data);
            userDetails.firstName = data.firstName
            userDetails.lastName = data.lastName
            userDetails.userEmail = data.email
            userDetails.phoneNumber = data.phoneNumber
        } catch (error) {
            console.log(error);
        }

    }

    const [disabled, setDisabled] = useState(false);
    // console.log(cart[0]?.user?._id);


    const checkOutHandler = async (e) => {
        e.preventDefault()
        const { data: { key } } = await axios.get(`${process.env.REACT_APP_GET_KEY}`)
        const { data } = await axios.post(`${process.env.REACT_APP_GET_CHECKOUT}`, {
            amount: 1,
            productDetails: JSON.stringify(cart),
            userId: userData._id,
            userDetails: JSON.stringify(userDetails)
        })

        const options = {
            key: key,
            amount: 1,
            currency: "INR",
            name: userData.firstName + ' ' + userData.lastName,
            description: "Payment",
            image: profileImg,
            order_id: data.order.id,
            callback_url: process.env.REACT_APP_GET_PAYMENTVERIFICATION,
            prefill: {
                name: userData.firstName + ' ' + userData.lastName,
                email: userData.email,
                contact: userData.phoneNumber
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#1976d2"
            },

        };
        const razor = new window.Razorpay(options);
        razor.open();
    }

    const handleOnchange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }
    const handleUpdateData = async () => {
        setDisabled(false)
    }
    const clickToUpdate = () => {
        setDisabled(true)
    }

    console.log(userDetails);
    return (
        <Container sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: 10 }}>
            <form noValidate autoComplete="off" className={styles.checkout_form} onSubmit={checkOutHandler} >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField disabled label="First Name" name='firsName' value={userDetails.firstName} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField disabled label="Last Name" name='lastName' value={userDetails.lastName} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField disabled label="Contact Number" type='tel' name='phoneNumber' value={userDetails.phoneNumber} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField disabled label="Email" name='userEmail' value={userDetails.userEmail} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Address" name='address' value={userDetails.address} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="City" name='city' value={userDetails.city} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField type='tel' label="Postal/Zip Code" name='zipCode' value={userDetails.zipCode} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Province/State" name='userState' value={userDetails.userState} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <TextField label="Country" name='country' value={userDetails.country} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                </Grid>
                <Container sx={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 5 }}>
                    <Button variant='contained' endIcon={<BsFillCartCheckFill />} type='submit'>Checkout</Button>
                    <Link to={`/update/${userData._id}`}> <Button variant='contained' endIcon={<MdUpdate />}>Update</Button></Link>
                </Container>
            </form >

        </Container >
    )
}

export default CheckoutForm