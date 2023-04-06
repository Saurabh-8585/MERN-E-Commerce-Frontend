import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleProduct } from '../../Constants/Constant';
import { Box, Button, Container, Grid, Skeleton, TextField, Typography } from '@mui/material';
import { AiOutlineFileDone } from 'react-icons/ai';
const SingleProduct = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id, type } = useParams();
    console.log(type);
    useEffect(() => {
        getSingleProduct(setProduct, id, setLoading)
    }, [])
    const handleOnchange = (e) => {

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
                    <Grid item xs={12} >
                        <TextField label="Name" name='name' value={product.name || ""} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    {/* {type == "book" && <Grid item xs={12} sm={6}>
                        <TextField label="Author" name='author' value={product.author || ''} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    } */}
                    <Grid item xs={12} sm={6}>
                        <TextField label="Price" name='price' value={product.price || ''} onChange={handleOnchange} variant="outlined" inputMode='numeric' fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Rating" name='rating' value={product.rating || ''} onChange={handleOnchange} variant="outlined" inputMode='numeric' fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Category" name='category' value={product.category || ''} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Product Type" name='type' value={product.type || ''} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ margin: "10px auto" }}>
                        <TextField
                            id="filled-textarea"
                            value={product.description || ""} onChange={handleOnchange}
                            label="Description"
                            multiline
                            sx={{ width: "100%" }}
                            variant="outlined"

                        />
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