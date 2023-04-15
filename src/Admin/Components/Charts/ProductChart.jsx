import { Container } from '@mui/material';
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
const RADIAN = Math.PI / 175;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
const ProductChart = ({ products, review, cart, wishlist, paymentData }) => {
    console.log({ paymentData });

    const productData = [
        {
            name: "Cloths",
            Quantity: products.filter(prod => prod.type === "cloths").length
        },
        {
            name: "Shoes",
            Quantity: products.filter(prod => prod.type === "shoe").length
        },
        {
            name: "Electronics",
            Quantity: products.filter(prod => prod.type === "electronics").length
        },
        {
            name: "Books",
            Quantity: products.filter(prod => prod.type === "book").length
        },
        {
            name: "Jewelry",
            Quantity: products.filter(prod => prod.type === "jewelry").length
        },
    ];
    const reviewData = [
        {
            name: "One ⭐",
            Reviews: review.filter(prod => Math.round(prod.rating) === 1).length,
        },
        {
            name: "Two ⭐",
            Reviews: review.filter(prod => Math.round(prod.rating) === 2).length,
        },
        {
            name: "Three ⭐",
            Reviews: review.filter(prod => Math.round(prod.rating) === 3).length,
        },
        {
            name: "Four ⭐",
            Reviews: review.filter(prod => Math.round(prod.rating) === 4).length,
        },
        {
            name: "Five ⭐",
            Reviews: review.filter(prod => Math.round(prod.rating) === 5).length,
        },
    ];

    const cartData = [
        {
            name: "Cloths",
            "Quantity in cart": cart.filter(prod => prod.productId.type === "cloths").length
        },
        {
            name: "Shoes",
            "Quantity in cart": cart.filter(prod => prod.productId.type === "shoe").length
        },
        {
            name: "Electronics",
            "Quantity in cart": cart.filter(prod => prod.productId.type === "electronics").length
        },
        {
            name: "Books",
            "Quantity in cart": cart.filter(prod => prod.productId.type === "book").length
        },
        {
            name: "Jewelry",
            "Quantity in cart": cart.filter(prod => prod.productId.type === "jewelry").length
        },
    ];

    const wishlistData = [
        {
            name: "Cloths",
            "Quantity in wishlist": wishlist.filter(prod => prod.productId.type === "cloths").length
        },
        {
            name: "Shoes",
            "Quantity in wishlist": wishlist.filter(prod => prod.productId.type === "shoe").length
        },
        {
            name: "Electronics",
            "Quantity in wishlist": wishlist.filter(prod => prod.productId.type === "electronics").length
        },
        {
            name: "Books",
            "Quantity in wishlist": wishlist.filter(prod => prod.productId.type === "book").length
        },
        {
            name: "Jewelry",
            "Quantity in wishlist": wishlist.filter(prod => prod.productId.type === "jewelry").length
        },
    ];


    // const groupedData = paymentData.reduce((acc, curr) => {
    //     const month = curr.createdAt.split("-")[1];
    //     const existingIndex = acc.findIndex((d) => d.createdAt === month);

    //     if (existingIndex >= 0) {
    //         acc[existingIndex].amt += curr.totalAmount;
    //     } else {
    //         acc.push({
    //             createdAt: month,
    //             Amount: curr.totalAmount,
    //         });
    //     }

    //     return acc;
    // }, []);
    const groupedData = paymentData.reduce((acc, item) => {
        const month = item.createdAt.substr(0, 7); // Extract month from createdAt
        const index = acc.findIndex((el) => el.month === month); // Check if month already exists in accumulator
        if (index !== -1) {
            acc[index].totalAmount += item.totalAmount; // Add total amount to existing month
        } else {
            acc.push({ month: month, totalAmount: item.totalAmount }); // Add new month to accumulator
        }
        return acc;
    }, []);
    console.log({ groupedData });

    const formatXAxis = (tickItem) => {
        return new Date(tickItem).toLocaleString("default", { month: "short" });
    };


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#8884d8"];

    return (
        <Container sx={{ marginTop: 5, marginBottom: 15 }}>

            <h3 style={{ textAlign: "center", margin: "20px 0", color: "#8884d8" }}>Products</h3>
            <ResponsiveContainer width="100%" aspect={2.5}>
                <BarChart width={150} height={40} data={productData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Quantity" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
            <h3 style={{ textAlign: "center", margin: "30px 0", color: "#1f77b4" }}>Payment</h3>
            <ResponsiveContainer width="100%" aspect={2.5}>
                <LineChart
                    width={500}
                    height={300}
                    data={groupedData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tickFormatter={formatXAxis} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="totalAmount"
                        tickFormatter={formatXAxis}
                        stroke="#1f77b4"
                        activeDot={{ r: 8 }}
                    />
                    {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
            </ResponsiveContainer>
            <h3 style={{ textAlign: "center", margin: "15px 0", color: "#17becf" }}>Users Cart</h3>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 15, flexWrap: "wrap" }}>
                <h3 style={{ color: '#00C49F' }}>Shoes </h3>
                <h2 style={{ color: "#00C49F" }}>&#9632;</h2>
                <h3 style={{ color: '#0088FE' }}>Cloths</h3>
                <h2 style={{ color: "#0088FE" }}>&#9632;</h2>
                <h3 style={{ color: '#FF8042' }}>Books</h3>
                <h2 style={{ color: "#FF8042" }}>&#9632;</h2>
                <h3 style={{ color: '#FFBB28' }}>Electronics</h3>
                <h2 style={{ color: "#FFBB28" }}>&#9632;</h2>
                <h3 style={{ color: '#8884d8' }}>Jewelry</h3>
                <h2 style={{ color: "#8884d8" }}>&#9632;</h2>
            </div>
            {/* <ResponsiveContainer width="110%" aspect={1} height="100%" style={{ padding: 0 }}> */}
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <PieChart width={400} height={400} >
                    <Tooltip />
                    <Pie
                        data={cartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="Quantity in cart"

                    >
                        <Tooltip />
                        {cartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </Container>
            {/* </ResponsiveContainer> */}
            <h3 style={{ textAlign: "center", margin: "30px 0", color: "#e377c2    " }}>Users Wishlist</h3>
            <ResponsiveContainer width="100%" aspect={2.5}>
                <BarChart width={730} height={250} data={wishlistData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false}/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Quantity in wishlist" fill="#e377c2     " />
                </BarChart>
            </ResponsiveContainer>

            <h3 style={{ textAlign: "center", margin: "30px 0", color: "#83a6ed" }}>Reviews</h3>
            <ResponsiveContainer width="100%" aspect={2.5}>
                <BarChart width={730} height={250} data={reviewData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Reviews" fill="#83a6ed" />

                </BarChart>
            </ResponsiveContainer>

        </Container>
    )
}

export default ProductChart