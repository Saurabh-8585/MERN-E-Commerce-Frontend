import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleProduct } from '../../Constants/Constant';
import { Box, Button, Container, Grid, Skeleton, TextField, Typography } from '@mui/material';
import { AiOutlineFileDone } from 'react-icons/ai';
const SingleProduct = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        getSingleProduct(setProduct, id, setLoading)
    }, [])
    const handleOnchange = () => {

    }
    const handleSubmit = () => {

    }
    console.log(product);
    return (
        <Container sx={{ width: "100%" }}>
            {loading ? (
                <section style={{ display: 'flex', flexWrap: "wrap", width: "100%", justifyContent: "space-around", alignItems: 'center' }}>
                    <Skeleton variant='rectangular' height={200} width="200px" />
                    <Skeleton variant='text' height={400} width={700} />

                </section>
            ) : (
                <Box sx={{ width: "100%", display: 'flex', flexWrap: "wrap", alignItems: "center", justifyContent: "space-around" }}>
                    <div className='detail-img-box'  >
                        <img alt={product.name} src={product.image} className='detail-img' />
                        <br />

                    </div>
                    <div >
                        <Typography variant='h4'>{product.name}</Typography>
                    </div>
                </Box>
            )}
            <form noValidate autoComplete="off" onSubmit={handleSubmit} >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField label="First Name" name='firstName' value={''} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Last Name" name='lastName' value={''} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Contact Number" type='tel' name='phoneNumber' value={''} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Email" name='email' value={''} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Address" name='address' value={''} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="City" name='city' value={''} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField type='tel' label="Postal/Zip Code" name='zipCode' value={''} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField label="Province/State" name='userState' value={''} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                </Grid>
                <Container sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 5 }}>
                    <Button variant='contained' endIcon={<AiOutlineFileDone />} type='submit'>Save</Button>
                </Container>
            </form >

        </Container>
    )
}

export default SingleProduct