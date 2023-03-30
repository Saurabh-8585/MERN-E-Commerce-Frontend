import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
}
    from '@mui/material'
import { Link } from 'react-router-dom';
const UserTable = ({ user, setUser }) => {
    console.log(user);
    const columns = [
        {
            id: 'name',
            label: 'Name',
            minWidth: 170
        },
        {
            id: 'phone',
            label: 'Phone Number',
            align: 'center',
            minWidth: 100
        },
        {
            id: 'email',
            label: 'Email',
            minWidth: 170,
            align: 'center',

        },
        {
            id: 'date',
            label: 'Created On',
            minWidth: 170,
            align: 'center',

        },
    ];
    return (
        <TableContainer sx={{ maxHeight: 340 }} component={Paper}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                <b>{column.label}</b>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {user.map((info) => (
                        <TableRow
                            key={info._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Link to={`user/${info._id}`}>
                                    {info.firstName + " " + info.lastName}
                                </Link>
                            </TableCell>
                            <TableCell align="center">
                                <Link to={`user/${info._id}`}>
                                    {info.phoneNumber}
                                </Link>
                            </TableCell>
                            <TableCell align="center">
                                <Link to={`user/${info._id}`}>
                                    {info.email}
                                </Link>
                            </TableCell>
                            <TableCell align="center" >
                                <Link to={`/user/${info._id}`}>
                                    {
                                        new Date(info.createdAt).toLocaleDateString('en-us', {
                                            weekday: "long", year: "numeric", month: "short", day: "numeric"
                                        }
                                        )
                                    }
                                    {" "}
                                    {new Date(info.createdAt).toLocaleTimeString('en-US')}
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                    {user.map((info) => (
                        <TableRow
                            key={info._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Link to={`user/${info._id}`}>
                                    {info.firstName + " " + info.lastName}
                                </Link>
                            </TableCell>
                            <TableCell align="center">
                                <Link to={`user/${info._id}`}>
                                    {info.phoneNumber}
                                </Link>
                            </TableCell>
                            <TableCell align="center">
                                <Link to={`user/${info._id}`}>
                                    {info.email}
                                </Link>
                            </TableCell>
                            <TableCell align="center" >
                                <Link to={`/user/${info._id}`}>
                                    {
                                        new Date(info.createdAt).toLocaleDateString('en-us', {
                                            weekday: "long", year: "numeric", month: "short", day: "numeric"
                                        }
                                        )
                                    }
                                    {" "}
                                    {new Date(info.createdAt).toLocaleTimeString('en-US')}
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >

    )
}

export default UserTable