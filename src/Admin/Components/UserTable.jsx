import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container,
    InputAdornment,
    TextField,
}
    from '@mui/material'
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
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


    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        console.log(filteredUsers);
    };


    const filteredUsers = user.filter((user) => {
        const firstName = user.firstName.toLowerCase();
        const lastName = user.lastName.toLowerCase();
        const fullName = user.firstName.toLowerCase() + user.lastName.toLowerCase();
        const phoneNumber = user.phoneNumber.toString();
        const email = user.email.toLowerCase();
        const queries = searchQuery.toLowerCase().split(" ");

        return queries.every((query) => firstName.includes(query) || lastName.includes(query) || fullName.includes(query) || phoneNumber.includes(query) || email.includes(query));
    });

    const searchCriteria = [
        { key: "name", placeholder: "Search user by name" },
        { key: "email", placeholder: "Search user by email" },
        { key: "number", placeholder: "Search user by number" },
    ];
    const [selectedCriteria, setSelectedCriteria] = useState(searchCriteria[0].key);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentIndex = searchCriteria.findIndex((c) => c.key === selectedCriteria);
            const nextIndex = (currentIndex + 1) % searchCriteria.length;
            setSelectedCriteria(searchCriteria[nextIndex].key);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [selectedCriteria]);

    return (
        <>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 5, marginTop: 5 }}>
                <TextField
                    id="search"
                    type="search"
                    // label="Search"
                    placeholder={searchCriteria.find((c) => c.key === selectedCriteria).placeholder}
                    onChange={handleSearchInputChange}
                    className="placeholder-animation"
                    sx={{ width: { xs: 350, sm: 500, md: 800 }, }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <AiOutlineSearch />
                            </InputAdornment>
                        ),
                    }}
                />
            </Container>
            <Paper
                style={{
                    overflow: "auto",
                    // maxHeight: "300px"
                }}
            >
                <TableContainer component={Paper}>
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

                            {filteredUsers.length === 0 && (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%", padding: 15 }}>
                                    <h3>User not found</h3>
                                </div>
                            )}
                            {filteredUsers.map((info) => (
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
        </>

    )
}

export default UserTable