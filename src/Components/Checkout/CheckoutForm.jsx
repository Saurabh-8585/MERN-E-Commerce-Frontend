import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Dialog, DialogActions, DialogContent, Grid, TextField, Typography } from '@mui/material'
import styles from './Chekout.module.css'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { MdUpdate } from 'react-icons/md'
import axios from 'axios'
import { ContextFunction } from '../../Context/Context'
import { Link, useNavigate } from 'react-router-dom'
import { profile } from '../../Assets/Images/Image'
import { toast } from 'react-toastify'
import CopyRight from '../CopyRight/CopyRight'
import { Transition, handleClose } from '../../Constants/Constant'
import { AiFillCloseCircle, AiOutlineSave } from 'react-icons/ai'

const CheckoutForm = () => {
    const { cart } = useContext(ContextFunction)
    const [userData, setUserData] = useState([])
    const [openAlert, setOpenAlert] = useState(false);

    let authToken = localStorage.getItem('Authorization')
    let setProceed = authToken ? true : false
    let navigate = useNavigate()
    let totalAmount = sessionStorage.getItem('totalAmount')

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

    })
    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_GET_USER_DETAILS}`, {
                headers: {
                    'Authorization': authToken
                }
            })
            setUserData(data);
            if (!data.address || !data.city || !data.zipCode || !data.userState) {
                setOpenAlert(true);
                console.log(1);
              }
            userDetails.firstName = data.firstName
            userDetails.lastName = data.lastName
            userDetails.userEmail = data.email
            userDetails.phoneNumber = data.phoneNumber
            userDetails.address = data.address
            userDetails.zipCode = data.zipCode
            userDetails.city = data.city
            userDetails.userState = data.userState
        } catch (error) {
            console.log(error);
        }

    }

    const checkOutHandler = async (e) => {
        e.preventDefault()

        if (!userDetails.firstName || !userDetails.lastName || !userDetails.userEmail || !userDetails.phoneNumber || !userDetails.address || !userDetails.zipCode || !userDetails.city || !userDetails.userState) {
            toast.error("Please fill all fields", { autoClose: 500, theme: "colored" })
        }
        else {
            try {
                const { data: { key } } = await axios.get(`${process.env.REACT_APP_GET_KEY}`)
                const { data } = await axios.post(`${process.env.REACT_APP_GET_CHECKOUT}`, {
                    amount: totalAmount,
                    productDetails: JSON.stringify(cart),
                    userId: userData._id,
                    userDetails: JSON.stringify(userDetails),
                })

                const options = {
                    key: key,
                    amount: totalAmount,
                    currency: "INR",
                    name: userData.firstName + ' ' + userData.lastName,
                    description: "Payment",
                    image: profile,
                    order_id: data.order.id,
                    callback_url: process.env.REACT_APP_GET_PAYMENTVERIFICATION,
                    prefill: {
                        name: userData.firstName + ' ' + userData.lastName,
                        email: userData.email,
                        contact: userData.phoneNumber
                    },
                    notes: {
                        "address": `${userData.address} ${userData.city} ${userData.zipCode} ${userData.userState}`
                    },
                    theme: {
                        "color": "#1976d2"
                    },

                };
                const razor = new window.Razorpay(options);
                razor.open();
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleOnchange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }



    return (
        <>
            <Container sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: 10 }}>
                <Typography variant='h6' sx={{ margin: '20px 0' }}>Checkout</Typography>
                <form noValidate autoComplete="off" className={styles.checkout_form} onSubmit={checkOutHandler} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField inputProps={{ readOnly: true }} disabled label="First Name" name='firstName' value={userDetails.firstName || ''} onChange={handleOnchange} variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField inputProps={{ readOnly: true }} disabled label="Last Name" name='lastName' value={userDetails.lastName || ''} onChange={handleOnchange} variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField inputProps={{ readOnly: true }} disabled label="Contact Number" type='tel' name='phoneNumber' value={userDetails.phoneNumber || ''} onChange={handleOnchange} variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField inputProps={{ readOnly: true }} disabled label="Email" name='userEmail' value={userDetails.userEmail || ''} onChange={handleOnchange} variant="outlined" fullWidth />
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
                    <Container sx={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 5 }}>
                        <Link to='/update'> <Button variant='contained' endIcon={<MdUpdate />}>Update</Button></Link>
                        <Button variant='contained' endIcon={<BsFillCartCheckFill />} type='submit'>Checkout</Button>
                    </Container>
                </form >

                <Dialog
                    open={openAlert}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => handleClose(setOpenAlert)}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 }, display: 'flex', justifyContent: 'center' }}>
                        <Typography variant='h6'>Add permanent address then you don't have to add again.  </Typography>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Link to='/update'> <Button variant='contained' endIcon={<AiOutlineSave />} color='primary' >Add</Button></Link>
                        <Button variant='contained' color='error' endIcon={<AiFillCloseCircle />} onClick={() => handleClose(setOpenAlert)}>Close</Button>
                    </DialogActions>
                </Dialog>

            </Container >
            <CopyRight sx={{ mt: 8, mb: 10 }} />

        </>
    )
}

export default CheckoutForm