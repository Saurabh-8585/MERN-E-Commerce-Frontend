import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container,
}
    from '@mui/material'
import { Link } from 'react-router-dom';
const UserTable = ({ user, setUser }) => {
    const columns = [
        {
            id: 'name',
            label: 'Name',
            minWidth: 170,
            align: 'left',
        },
        {
            id: 'phone',
            label: 'Phone Number',
            align: 'right',
            minWidth: 100
        },
        {
            id: 'email',
            label: 'Email',
            minWidth: 170,
            align: 'right',

        },
        {
            id: 'date',
            label: 'Created On',
            minWidth: 170,
            align: 'right',

        },
    ];
    return (
        <Paper
            style={{
                overflow: "auto",
                maxHeight: "300px"
            }}
        >
            <TableContainer  component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, color: "#1976d2" }}
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
                                
                            >
                                <TableCell component="th" scope="row" align="left">
                                    <Link to={`user/${info._id}`}>
                                        {info.firstName + " " + info.lastName}
                                    </Link>
                                </TableCell>
                                <TableCell align="right">
                                    <Link to={`user/${info._id}`}>
                                        {info.phoneNumber}
                                    </Link>
                                </TableCell>
                                <TableCell align="right">
                                    <Link to={`user/${info._id}`}>
                                        {info.email}
                                    </Link>
                                </TableCell>
                                <TableCell align="right" >
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
        </Paper>

    )
}

export default UserTable