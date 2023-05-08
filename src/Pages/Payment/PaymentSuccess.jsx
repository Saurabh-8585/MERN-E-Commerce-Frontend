import { Link, useSearchParams } from 'react-router-dom'
import { AiOutlineFileDone } from 'react-icons/ai'
import { Box, Button, Typography } from '@mui/material'
import { payment } from '../../Assets/Images/Image'
import './Payment.css'
import CopyRight from '../../Components/CopyRight/CopyRight'
const PaymentSuccess = () => {
    const searchParams = useSearchParams()[0]
    const referenceNumber = searchParams.get('reference')
    return (
        <>
            <div className='main-payment-box'>
                <Typography variant='h6' sx={{ marginTop: 1 }}>Payment Successful   <AiOutlineFileDone style={{ color: '#1976d2' }} /></Typography>
                <Typography variant='body2'>Reference Number ={referenceNumber}</Typography>
                <Typography variant='body2' textAlign='center'>Your payment has been successfully submitted.
                    <br />oc
                    We've sent you an email with all of the details of your order.</Typography>

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="main-payment-card">
                        <img src={payment} alt="payment" className="payment-img" />
                        <Link style={{ color: 'white' }} to='/'><Button variant='contained' sx={{ borderRadius: 3 }} >Back To Home</Button></Link>
                    </div>
                </Box>
            </div >
            <CopyRight sx={{ mt: 8, mb: 10 }} />
        </>
    )
}


export default PaymentSuccess