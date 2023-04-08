import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { getSingleProduct } from '../../Constants/Constant';
import axios from "axios";

import { Box, Button, Container, Grid, Skeleton, TextField, Typography } from '@mui/material';
import { AiOutlineFileDone } from 'react-icons/ai';
import { toast } from 'react-toastify';
const SingleProduct = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    let authToken = localStorage.getItem("Authorization")
    const [productInfo, setProductInfo] = useState({
        name: "",
        image: "",
        price: "",
        rating: "",
        category: "",
        type: "",
        description: "",
    });

    const { id, type } = useParams();
    console.log(type);
    useEffect(() => {
        getSingleProduct()
    }, [])
    const getSingleProduct = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_FETCH_PRODUCT}/${id}`)
        setProduct(data)
        productInfo.name = data.name
        productInfo.image = data.image
        productInfo.price = data.price
        productInfo.rating = data.rating
        productInfo.category = data.category
        productInfo.type = data.type
        productInfo.description = data.description
        setProduct(data)
        setLoading(false);

    }
    const handleOnchange = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value })

    }
    const productFilter = []

    if (type === 'book') {
        productFilter.push('scifi', 'business', 'mystery', 'cookbooks', 'accessories')
    }
    else if (type === 'cloths') {
        productFilter.push('men', 'women')
    }
    else if (type === 'shoe') {
        productFilter.push('running', 'football', 'formal', 'casual')
    }
    else if (type === 'electronics') {
        productFilter.push('monitor', 'ssd', 'hdd')

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productInfo.name && !productInfo.image && !productInfo.price && !productInfo.rating && !productInfo.category && !productInfo.type && !productInfo.description) {
            toast.error("Please fill the all fields", { autoClose: 500, })

        }
        if (!productFilter.includes(productInfo.category)) {
            setError(true)
            console.log(productInfo.category.includes(productFilter), productFilter);
        }
        else {
            setError(false)
            try {
                const { data } = await axios.put(`${process.env.REACT_APP_ADMIN_UPDATE_PRODUCT}/${product._id}`, { productDetails: productInfo }, {
                    headers: {
                        'Authorization': authToken
                    }
                })
                if (data.success) {
                    toast.success("Product updated successfully", { autoClose: 500, })

                }
                else {
                    toast.error("Something went wrong", { autoClose: 500, })
                }

            } catch (error) {
                toast.error("Something went wrong", { autoClose: 500, })

            }
        }
    }

    // console.log(productFilter);
    return (
        <Container sx={{ width: "100%",marginBottom:10 }}>
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
            <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{marginTop:30}} >
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <TextField label="Name" name='name' value={productInfo.name} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Price" name='price' value={productInfo.price} onChange={handleOnchange} variant="outlined" inputMode='numeric' fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Rating" name='rating' value={productInfo.rating} onChange={handleOnchange} variant="outlined" inputMode='numeric' fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Category" name='category' value={productInfo.category} onChange={handleOnchange} variant="outlined" fullWidth />
                        {error && <>
                            <p style={{ marginTop: 5, color: "red",padding:1 }}>Please add  correct category like</p>

                            {productFilter.map(prod => <span style={{marginRight:4,padding:2 }}>{prod}</span>)}
                        </>}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Product Type" name='type' value={productInfo.type} onChange={handleOnchange} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ margin: "10px auto" }}>
                        <TextField
                            id="filled-textarea"
                            value={productInfo.description} onChange={handleOnchange}
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