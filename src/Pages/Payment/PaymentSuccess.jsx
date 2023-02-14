import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AiOutlineFileDone } from 'react-icons/ai'
import paymentImg from '../../Assets/Banner/payment.jpg'
import { Button } from '@mui/material'
const PaymentSuccess = () => {
    const searchParams = useSearchParams()[0]
    const referenceNumber = searchParams.get('reference')
    return (
        <div>
            <h1>Payment Succesfull <AiOutlineFileDone style={{ color: '#1976d2' }} /></h1>
            <h1>Reference Number ={referenceNumber}</h1>
            <div className="img-box">
                <img src={paymentImg} alt="" className="img" />
            </div>
            <Link style={{ color: 'white' }} to='/'><Button variant='contained' sx={{ borderRadius: 3 }} >Back To Home</Button></Link>
        </div >
    )
}

export default PaymentSuccess