import { Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
const ProductChart = () => {
    const [products, setProducts] = useState([]);
    const [review, setReview] = useState([])
    const [cart, setCart] = useState([])
    const [wishlist, setWishlist] = useState([])

    useEffect(() => {
        getProducts()
    }, [])
    const getProducts = async () => {
        try {
            const { data } = await axios.get(process.env.REACT_APP_GET_CHART_DATA)
            console.log(data);
            setProducts(data.product)
            setReview(data.review)
            setCart(data.cart)
            setWishlist(data.wishlist)
        } catch (error) {
            console.log(error);

        }
    }

    let cloths = products.filter(prod => prod.type === "cloths");
    let shoes = products.filter(prod => prod.type === "shoe");
    let electronics = products.filter(prod => prod.type === "electronics");
    let books = products.filter(prod => prod.type === "book");
    let jewelry = products.filter(prod => prod.type === "jewelry");
    const productData = [
        {
            name: "Cloths",
            Quantity: cloths.length
        },
        {
            name: "Shoes",
            Quantity: shoes.length
        },
        {
            name: "Electronics",
            Quantity: electronics.length
        },
        {
            name: "Books",
            Quantity: books.length
        },
        {
            name: "Jewelry",
            Quantity: jewelry.length
        },
    ]
    let zero = review.filter(prod => Math.round(prod.rating) === 0);
    let one = review.filter(prod => Math.round(prod.rating) === 1);
    let two = review.filter(prod => Math.round(prod.rating) === 2);
    let three = review.filter(prod => Math.round(prod.rating) === 3);
    let four = review.filter(prod => Math.round(prod.rating) === 4);
    let five = review.filter(prod => Math.round(prod.rating) === 5);
    const reviewData = [
        {
            name: "Zero ⭐",
            Reviews: zero.length,
        },
        {
            name: "One ⭐",
            Reviews: one.length,
        },
        {
            name: "Two ⭐",
            Reviews: two.length,
        },
        {
            name: "Three ⭐",
            Reviews: three.length,
        },
        {
            name: "Four ⭐",
            Reviews: four.length,
        },
        {
            name: "Five ⭐",
            Reviews: five.length,
        },
    ]
    let CartCloths = cart.filter(prod => prod.productId.type === "cloths");
    let CartShoes = cart.filter(prod => prod.productId.type === "shoe");
    let CartElectronics = cart.filter(prod => prod.productId.type === "electronics");
    let CartBooks = cart.filter(prod => prod.productId.type === "book");
    let CartJewelry = cart.filter(prod => prod.productId.type === "jewelry");


    const cartData = [
        {
            name: "Cloths",
            "Quantity in cart": CartCloths.length
        },
        {
            name: "Shoes",
            "Quantity in cart": CartShoes.length
        },
        {
            name: "Electronics",
            "Quantity in cart": CartElectronics.length
        },
        {
            name: "Books",
            "Quantity in cart": CartBooks.length
        },
        {
            name: "Jewelry",
            "Quantity in cart": CartJewelry.length
        },
    ]

    let WishlistCloths = wishlist.filter(prod => prod.productId.type === "cloths");
    let WishlistShoes = wishlist.filter(prod => prod.productId.type === "shoe");
    let WishlistElectronics = wishlist.filter(prod => prod.productId.type === "electronics");
    let WishlistBooks = wishlist.filter(prod => prod.productId.type === "book");
    let WishlistJewelry = wishlist.filter(prod => prod.productId.type === "jewelry");




    const wishlistData = [
        {
            name: "Cloths",
            "Quantity in wishlist": WishlistCloths.length
        },
        {
            name: "Shoes",
            "Quantity in wishlist": WishlistShoes.length
        },
        {
            name: "Electronics",
            "Quantity in wishlist": WishlistElectronics.length
        },
        {
            name: "Books",
            "Quantity in wishlist": WishlistBooks.length
        },
        {
            name: "Jewelry",
            "Quantity in wishlist": WishlistJewelry.length
        },
    ]


    console.log(cart);
    return (
        <Container sx={{ marginTop: 5 }}>
            <h3 style={{ textAlign: "center", margin: "20px 0", color: "#8884d8" }}>Products</h3>
            <ResponsiveContainer width="100%" aspect={2.5}>
                <BarChart width={730} height={250} data={productData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Quantity" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>

            <h3 style={{ textAlign: "center", margin: "30px 0", color: "#17becf" }}>Users Cart</h3>
            <ResponsiveContainer width="100%" aspect={2.5}>
                <BarChart width={730} height={250} data={cartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Quantity in cart" fill="#17becf " />
                </BarChart>
            </ResponsiveContainer>


            <h3 style={{ textAlign: "center", margin: "30px 0", color: "#e377c2    " }}>Users Wishlist</h3>
            <ResponsiveContainer width="100%" aspect={2.5}>
                <BarChart width={730} height={250} data={wishlistData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Quantity in wishlist" fill="#e377c2     " />
                </BarChart>
            </ResponsiveContainer>



            <h3 style={{ textAlign: "center", margin: "30px 0", color: "#83a6ed" }}>Reviews</h3>
            <ResponsiveContainer width="100%" aspect={5}>
                <BarChart width={730} height={250} data={reviewData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Reviews" fill="#83a6ed" />

                </BarChart>
            </ResponsiveContainer>

        </Container>
    )
}

export default ProductChart