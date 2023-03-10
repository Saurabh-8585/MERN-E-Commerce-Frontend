import './Home.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Container } from '@mui/material'
import { Box } from '@mui/system'
import { useContext } from 'react'
import { ContextFunction } from '../../Context/Context'
import ProductCard from '../../Components/Card/Product Card/ProductCard'
import Carousel from '../../Components/Carousel/Carousel'
const HomePage = () => {
    const { setCart } = useContext(ContextFunction)
    const [productData, setProductData] = useState([])

    let authToken = localStorage.getItem('Authorization')
    useEffect(() => {
        getData()
        getCart()
        window.scroll(0, 0)
    }, [])
    const getCart = async () => {
        if (authToken !== null) {
            const { data } = await axios.get(`${process.env.REACT_APP_GET_CART}`,
                {
                    headers: {
                        'Authorization': authToken
                    }
                })
            setCart(data);
        }

    }
    const getData = async () => {
        const { data } = await axios.get(process.env.REACT_APP_FETCH_PRODUCT)
        setProductData(data);
    }

    return (
        <>
            <Container maxWidth='xl' style={{ display: 'flex', justifyContent: "center", padding: 0, flexDirection: "column", }}>
                <Box padding={1}>
                    <Carousel />
                </Box>
                <Container maxWidth='xl' style={{ marginTop: 90, display: "flex", justifyContent: 'center', flexWrap: "wrap", paddingBottom: 20 }}>
                    {productData.map(prod => (
                        <Link to={`/Detail/type/${prod.type}/${prod._id}`} key={prod._id}>
                            <ProductCard prod={prod} />
                        </Link>
                    ))}
                </Container>
            </Container>
        </ >
    )
}

export default HomePage