import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const OrderTable = ({ orders }) => {
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
                                <TableCell align='center' sx={{ color: "#1976d2",fontWeight:'bold' }}>User Name</TableCell>
                                <TableCell align='center' sx={{ color: "#1976d2",fontWeight:'bold' }}>Email</TableCell>
                                <TableCell align='center' sx={{ color: "#1976d2",fontWeight:'bold' }}>Contact</TableCell>
                                <TableCell align='center' sx={{ color: "#1976d2",fontWeight:'bold' }}>Billing Amount</TableCell>
                                <TableCell align='center' sx={{ color: "#1976d2",fontWeight:'bold' }}>Order Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedOrders.map((order) => (
                                <TableRow key={order._id}>
                                    <TableCell align='center'>
                                        <Link to={`user/${order.user}`}>
                                            {`${order.userData.firstName} ${order.userData.lastName}`}
                                        </Link>
                                    </TableCell>

                                    <TableCell align='center'>
                                        <Link to={`user/${order.user}`}>
                                            {order.userData.userEmail}
                                        </Link>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Link to={`user/${order.user}`}>
                                            {order.userData.phoneNumber}
                                        </Link>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Link to={`user/${order.user}`}>
                                            {order.totalAmount}
                                        </Link>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Link to={`user/${order.user}`}>
                                            {new Date(order.createdAt).toLocaleString()}
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>

    );
};

export default OrderTable;
