import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../Components/Card/ProductCard'
import { Container } from '@mui/system'
import { Box, Button } from '@mui/material'



const SingleCategory = () => {
    const [productData, setProductData] = useState([])
    const { cat } = useParams()
    useEffect(() => {
        getCategoryProduct()
        window.scroll(0, 0)
    }, [])
    const getCategoryProduct = async () => {
        const getData = await axios.post(`${process.env.REACT_APP_PRODUCT_TYPE}`, { userType: cat })
        setProductData(getData.data)
        console.log(getData.data);
    }
    const productFilter = []


    if (cat === 'book') {
        productFilter.push('all', 'scifi', 'business', 'mystery', 'cookbooks', 'accessories', 'price low to high', 'price high to low','high rated','low rated')
    }
    else if (cat === 'cloths') {
        productFilter.push('All', 'Men', 'Women', 'price low to high', 'price high to low', 'high rated', 'low rated')
    }
    else if (cat === 'shoes') {
        productFilter.push('formal', 'sneker', 'price low to high', 'price high to low', 'high rated', 'low rated')
    }
    else if (cat === 'electronics') {
        productFilter.push('all', 'monitor', 'ssd', 'hdd', 'price low to high', 'price high to low', 'high rated', 'low rated')

    }
    const handleClick = async (e) => {
        const filter = e.target.innerText.split(" ").join().replaceAll(',', '').toLowerCase()
        const response = await axios.post(`${process.env.REACT_APP_PRODUCT_TYPE_CATEGORY_}`, { userType: cat, userCategory: filter })
        setProductData(response.data)
        console.log(response.data);
    }


    return (
        <Container maxWidth='xl' style={{ marginTop: 90, paddingRight: 50, display: 'flex', justifyContent: "center", flexDirection: "column" }}>
            <Box sx={{ minWidth: 120, alignSelf: 'center' }}>
                {productFilter.map(prod => (
                    <Button key={prod} defaultValue={prod.trim()} onClick={(e) => handleClick(e)} >{prod}</Button>

                ))}
            </Box>
            <Container maxWidth='xl' style={{ marginTop: 90, display: "flex", flexWrap: "wrap", paddingLeft: 50, paddingBottom: 20 }}>
                {productData.map(prod => (
                    <Link to={`/Detail/${prod._id}`} key={prod._id}>
                        <ProductCard prod={prod} />

                    </Link>
                ))}
            </Container>
        </Container>
    )
}


export default SingleCategory