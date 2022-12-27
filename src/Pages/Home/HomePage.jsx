import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ProductCard from '../../Components/Card/ProductCard'
import { Container } from '@mui/material'

const HomePage = () => {
    const [productData, setProductData] = useState([])

    useEffect(() => {
        getData()
        window.scroll(0, 0)
    }, [])
    const getData = async () => {
        const response = await axios.get(process.env.REACT_APP_FETCH_PRODUCT)
        setProductData(response.data);
    }
    const data = productData.map(prod => (
        <Link to={`/Detail/${prod._id}`} key={prod._id}>
            <ProductCard prod={prod} />
        </Link>
    ))
    return (
        <Container maxWidth='xl' style={{ marginTop: 90, display: "flex", flexWrap: "wrap",paddingLeft:70 }}>
            {data}
        </Container>
    )
}

export default HomePage