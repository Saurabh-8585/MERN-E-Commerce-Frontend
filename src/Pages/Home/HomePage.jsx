import './Home.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Container } from '@mui/material'
import { Box } from '@mui/system'
import BannerData from '../../Helpers/HomePageBanner'
import { useContext } from 'react'
import { ContextFunction } from '../../Context/Context'
import ProductCard from '../../Components/Card/Product Card/ProductCard'
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
            <Container maxWidth='xl' style={{ display: 'flex', justifyContent: "center", flexDirection: "column" }}>
                <Box sx={{ display: "flex", alignItems: "center", }}>
                    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
                            </div>
                            {
                                BannerData.map((item) => (

                                    <Link to={`product/type/${item.name.toLowerCase()}`} key={item.name} >
                                        <div className="carousel-item active">
                                            <img src={item.img} className="d-block w-100" alt={item.name} />
                                            <div className="carousel-caption d-none d-md-block">
                                                <Button className='carousel-btn' variant='contained'>{item.name}</Button>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
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