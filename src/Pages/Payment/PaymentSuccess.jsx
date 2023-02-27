import { Link, useSearchParams } from 'react-router-dom'
import { AiOutlineFileDone } from 'react-icons/ai'
import paymentImg from '../../Assets/Banner/payment.jpg'
import { Button } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
const PaymentSuccess = () => {
    const searchParams = useSearchParams()[0]
    const referenceNumber = searchParams.get('reference')
    useEffect(() => {
        // sendEmail()
    }, [])
    let email = localStorage.getItem('email')
    console.log(email);
        const sendEmail = async () => {
            try {
                const sendAuth = await axios.post('http://localhost:5000/api/send-order-email', { email: email })
                let d = await sendAuth.data;
                console.log(d);
            } catch (error) {
                console.log(error);
            }
        }
        return (
            <div>
                <h1>Payment Successful   <AiOutlineFileDone style={{ color: '#1976d2' }} /></h1>
                <h1>Reference Number ={referenceNumber}</h1>
                {/* <div className="img-box">
                <img src={paymentImg} alt="" className="img" />
            </div> */}
                <Link style={{ color: 'white' }} to='/'><Button variant='contained' sx={{ borderRadius: 3 }} >Back To Home</Button></Link>
            </div >
        )
    }


    export default PaymentSuccess