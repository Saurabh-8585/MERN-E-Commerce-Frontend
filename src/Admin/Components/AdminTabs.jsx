import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, Typography, Box, useMediaQuery, Grid } from '@mui/material';
import ProductChart from './Charts/ProductChart';
import UserTable from './Tables/UserTable';
import axios from 'axios';
import ProductTable from './Tables/ProductTable';
import { VscGraph } from 'react-icons/vsc'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { FaShippingFast } from 'react-icons/fa'
import { TbReportMoney } from 'react-icons/tb'
import OrderTable from './Tables/OrderTable';
import Widget from './Widget';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}

        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography >{children} </Typography>

                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({ user, setUser, getUser }) {
    const [value, setValue] = useState(0);
    const [products, setProducts] = useState([]);
    const [review, setReview] = useState([]);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [paymentData, setPaymentData] = useState([]);

    useEffect(() => {
        getProductInfo();
    }, [])
    const getProductInfo = async () => {
        try {
            const { data } = await axios.get(process.env.REACT_APP_ADMIN_GET_CHART_DATA)
            setProducts(data.product);
            setReview(data.review);
            setCart(data.cart);
            setWishlist(data.wishlist);
            setPaymentData(data.payment);
        } catch (error) {
            console.log(error);

        }
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const totalRevenue = paymentData.reduce((acc, curr) => (acc + curr.totalAmount), 0);
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2} direction={isSmallScreen ? 'column' : 'row'} padding={1}>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Widget numbers={totalRevenue} heading='Revenue' color='#9932CC' icon={<TbReportMoney />} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Widget numbers={products.length} heading='Products' color='#FFC300' icon={<AiOutlineShoppingCart />} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Widget numbers={user.length} heading='Users' color='#FF69B4' icon={<CgProfile />} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Widget numbers={paymentData.length} heading='Orders' color='#1f77b4  ' icon={<FaShippingFast />} />
                </Grid>
            </Grid>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ overflowX: "a" }} >
                    <Tab label={!isSmallScreen && 'Statistics'}  {...a11yProps(0)} iconPosition='start' icon={<VscGraph fontSize={20} />} />
                    <Tab label={!isSmallScreen && "Users"} {...a11yProps(1)} iconPosition='start' icon={<CgProfile fontSize={20} />} />
                    <Tab label={!isSmallScreen && "Products"} {...a11yProps(2)} iconPosition='start' icon={<AiOutlineShoppingCart fontSize={20} />} />
                    <Tab label={!isSmallScreen && "Orders"} {...a11yProps(3)} iconPosition='start' icon={<FaShippingFast fontSize={20} />} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0} >
                <ProductChart
                    products={products}
                    review={review}
                    cart={cart}
                    wishlist={wishlist}
                    paymentData={paymentData}
                    user={user} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UserTable user={user} paymentData={paymentData} getUser={getUser} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ProductTable data={products} getProductInfo={getProductInfo} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <OrderTable orders={paymentData} />
            </TabPanel>
        </Box >
    );
}