import './Home.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ProductCard from '../../Components/Card/ProductCard'
import { Container } from '@mui/material'
import { Box } from '@mui/system'
import Book from '../../Assets/Banner/Book.jpg'
import FemaleCloth from '../../Assets/Banner/Female-Cloth.jpg'
import MaleCloth from '../../Assets/Banner/Male-Cloth.jpg'
import Electronics from '../../Assets/Banner/Mobile-Laptop-Banner.jpg'
import Shoes from '../../Assets/Banner/Nike-Shoe.jpg'


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
    const banner = <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
            <Link to="product/type/cloths">
                <div className="carousel-item active">
                    <img src={MaleCloth} className="d-block w-100" alt="Cloths" />
                </div>
            </Link>
            <Link to="product/type/cloths">
                <div className="carousel-item active">
                    <img src={FemaleCloth} className="d-block w-100" alt="Cloths" />
                </div>
            </Link>
            <Link to="product/type/shoes/">
                <div className="carousel-item">
                    <img src={Shoes} className="d-block w-100 " alt="Shoes" />
                </div>
            </Link>
            <Link to="product/type/electronics">
                <div className="carousel-item">
                    <img src={Electronics} className="d-block w-100 " alt="Electronics" />
                </div>
            </Link>
            <Link to="product/type/book">
                <div className="carousel-item">
                    <img src={Book} className="d-block w-100 " alt="Book" />
                </div>
            </Link>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>

    return (
        <>
            <Container maxWidth='xl' style={{ marginTop: 90 }}>
                <Box sx={{ border: "2px solid black", display: "flex", alignItems: "center" }}>
                    {banner}
                </Box>
                <Container maxWidth='xl' style={{ marginTop: 90, display: "flex", flexWrap: "wrap", paddingLeft: 70 }}>
                    {data}
                </Container>
            </Container>
        </ >
    )
}

export default HomePage