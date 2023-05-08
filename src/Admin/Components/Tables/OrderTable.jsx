import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Collapse,
    Typography,
} from '@mui/material';
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Link } from 'react-router-dom';

const OrderTable = ({ orders }) => {
    const [openOrderId, setOpenOrderId] = useState("");
    const sortedOrders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return (
        <>
            <Paper
                style={{
                    overflow: "auto",
                    maxHeight: "500px"
                }}
            >
                <TableContainer sx={{ maxHeight: '500px' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead sx={{ position: 'sticky', top: 0 }}>
                            <TableRow>
                                <TableCell />
                                <TableCell sx={{ color: "#1976d2", fontWeight: 'bold' }}>User Name</TableCell>
                                <TableCell sx={{ color: "#1976d2", fontWeight: 'bold' }}>Email</TableCell>
                                <TableCell sx={{ color: "#1976d2", fontWeight: 'bold' }}>Phone Number</TableCell>
                                <TableCell sx={{ color: "#1976d2", fontWeight: 'bold' }}>Total Amount</TableCell>
                                <TableCell sx={{ color: "#1976d2", fontWeight: 'bold' }}>Order Created Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedOrders.map((order) => (
                                <React.Fragment key={order._id}>
                                    <TableRow>
                                        <TableCell>
                                            <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() => setOpenOrderId(openOrderId === order._id ? "" : order._id)}

                                            >
                                                {<MdKeyboardArrowDown />}
                                            </IconButton>
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            <Link to={`user/${order.user}`}>
                                                {`${order.userData.firstName} ${order.userData.lastName}`}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link to={`user/${order.user}`}>{order.userData.userEmail}</Link></TableCell>
                                        <TableCell>
                                            <Link to={`user/${order.user}`}>{order.userData.phoneNumber}</Link></TableCell>
                                        <TableCell>
                                            <Link to={`user/${order.user}`}>{order.totalAmount}</Link></TableCell>
                                        <TableCell><Link to={`user/${order.user}`}>{
                                            new Date(order.createdAt).toLocaleDateString('en-us', {
                                                weekday: "long", year: "numeric", month: "short", day: "numeric"
                                            }
                                            )
                                        }
                                            {" "}
                                            {new Date(order.createdAt).toLocaleTimeString('en-US')}</Link></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={openOrderId === order._id} timeout="auto" unmountOnExit>
                                                <div>

                                                    <Typography>{`Address: ${order.userData.address}`}</Typography>
                                                    <Typography>{`Zip Code: ${order.userData.zipCode}`}</Typography>
                                                    <Typography>{`City: ${order.userData.city}`}</Typography>
                                                    <Typography>{`State: ${order.userData.userState}`}</Typography>
                                                    <Table size="small" aria-label="purchases">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell align="left" sx={{ color: "#1976d2", fontWeight: 'bold' }}>Product Name</TableCell>
                                                                <TableCell align="left" sx={{ color: "#1976d2", fontWeight: 'bold' }}>Image</TableCell>
                                                                <TableCell align="left" sx={{ color: "#1976d2", fontWeight: 'bold' }}>Price</TableCell>
                                                                <TableCell align="left" sx={{ color: "#1976d2", fontWeight: 'bold' }}>Quantity</TableCell>
                                                                <TableCell align="left" sx={{ color: "#1976d2", fontWeight: 'bold' }}>Rating</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {order.productData.map(product => (
                                                                <TableRow key={product._id}>
                                                                    <TableCell align="left" >
                                                                        <Link to={`/admin/home/product/${product.productId.type}/${product.productId._id}`}>
                                                                            {product.productId.name}
                                                                        </Link>
                                                                    </TableCell>
                                                                    <TableCell align="left">
                                                                        <Link to={`/admin/home/product/${product.productId.type}/${product.productId._id}`}>
                                                                            <img src={product.productId.image} alt={product.productId.name} style={{ width: "100px", height: "100px", objectFit: "contain" }} />
                                                                        </Link>
                                                                    </TableCell>
                                                                    <TableCell align="left" >
                                                                        <Link to={`/admin/home/product/${product.productId.type}/${product.productId._id}`}>
                                                                            {product.productId.price}
                                                                        </Link>
                                                                    </TableCell>
                                                                    <TableCell align="left" >
                                                                        <Link to={`/admin/home/product/${product.productId.type}/${product.productId._id}`}>
                                                                            {product.quantity}
                                                                        </Link>
                                                                    </TableCell>
                                                                    <TableCell align="left" >
                                                                        <Link to={`/admin/home/product/${product.productId.type}/${product.productId._id}`}>
                                                                            {product.productId.rating}
                                                                        </Link>
                                                                    </TableCell>

                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>

    );
};

export default OrderTable;
