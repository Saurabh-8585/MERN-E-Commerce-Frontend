import './singlecategory.css'
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Container } from '@mui/system'
import { Box, Button, MenuItem, FormControl, Select } from '@mui/material'
import Loading from '../Components/loading/Loading'
import { BiFilterAlt } from 'react-icons/bi';
import ProductCard from '../Components/Card/Product Card/ProductCard'
import CopyRight from '../Components/CopyRight/CopyRight'



const SingleCategory = () => {

    const [productData, setProductData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [filterOption, setFilterOption] = useState('All')
    const [title, setTitle] = useState('All')
    const { cat } = useParams()

    useEffect(() => {
        getCategoryProduct()
        window.scroll(0, 0)
    }, [])

    const getCategoryProduct = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.post(`${process.env.REACT_APP_PRODUCT_TYPE}`, { userType: cat })
            setIsLoading(false)
            setProductData(data)

        } catch (error) {
            console.log(error);
        }
    }

    const productFilter = []

    if (cat === 'book') {
        productFilter.push('All', 'Scifi', 'Business', 'Mystery', 'Cookbooks', 'Accessories', 'Price Low To High', 'Price High To Low', 'High Rated', 'Low Rated')
    }
    else if (cat === 'cloths') {
        productFilter.push('All', 'Men', 'Women', 'Price Low To High', 'Price High To Low', 'High Rated', 'Low Rated')
    }
    else if (cat === 'shoe') {
        productFilter.push('All', 'Running', 'Football', 'Formal', 'Casual', 'Price Low To High', 'Price High To Low', 'High Rated', 'Low Rated')
    }
    else if (cat === 'electronics') {
        productFilter.push('All', 'Monitor', 'SSD', 'HDD', 'Price Low To High', 'Price High To Low', 'High Rated', 'Low Rated')

    }
    else if (cat === 'jewelry') {
        productFilter.push('All')

    }

    const handleChange = (e) => {
        setFilterOption(e.target.value.split(" ").join("").toLowerCase())
        setTitle(e.target.value)
    }
    // pricelowtohigh 
    // pricehightolow
    // highrated
    // lowrated
  
    const getData = async () => {
        setIsLoading(true)
        const filter = filterOption.toLowerCase()
        const { data } = await axios.post(`${process.env.REACT_APP_PRODUCT_TYPE_CATEGORY_}`, { userType: cat, userCategory: filter })
        setProductData(data)
        setIsLoading(false)
    }
    useEffect(() => {
        getData()
    }, [filterOption])

    const loading = isLoading ?
        (
            <Container maxWidth='xl' style={{ marginTop: 10, display: "flex", justifyContent: "center", flexWrap: "wrap", paddingLeft: 10, paddingBottom: 20 }}>
                <Loading /><Loading /><Loading /><Loading />
                <Loading /><Loading /><Loading /><Loading />
            </Container >
        )
        : ""
    return (
        <>
            <Container maxWidth='xl' style={{ marginTop: 90, display: 'flex', justifyContent: "center", flexDirection: "column" }}>
                < Box sx={{ minWidth: 140 }}>
                    <FormControl sx={{ width: 140 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, width: "80vw" }}>
                            <Button endIcon={<BiFilterAlt />}>Filters</Button>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={title}
                                sx={{ width: 200 }}
                                onChange={(e) => handleChange(e)}
                            >
                                {productFilter.map(prod => (
                                    <MenuItem key={prod} value={prod}>{prod}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </FormControl>
                </Box>
                {loading}
                <Container maxWidth='xl' style={{ marginTop: 10, display: "flex", justifyContent: 'center', flexWrap: "wrap", paddingBottom: 20, marginBottom: 30, width: '100%' }}>
                    {productData.map(prod => (
                        <Link to={`/Detail/type/${cat}/${prod._id}`} key={prod._id}>
                            <ProductCard prod={prod} />

                        </Link>
                    ))}
                </Container>
            </Container >
            <CopyRight sx={{ mt: 8, mb: 10 }} />
        </>
    )
}


export default SingleCategory

    //         