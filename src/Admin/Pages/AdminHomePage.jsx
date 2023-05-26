import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Container } from '@mui/material';
import BasicTabs from '../Components/AdminTabs';
import CopyRight from '../../Components/CopyRight/CopyRight'
const AdminHomePage = () => {
    const [user, setUser] = useState([]);
    const [isAdmin, setAdmin] = useState(false);

    useEffect(() => {
        getUser();
    }, [])
    let navigate = useNavigate()
    let authToken = localStorage.getItem("Authorization")
    const getUser = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_GET_ALL_USERS}`, {
                headers: {
                    'Authorization': authToken
                }
            })
            setUser(data)
            setAdmin(true)
        } catch (error) {
            !isAdmin && navigate('/')
            toast.error(error.response.data, { autoClose: 500, theme: "colored" });
        }
    }
    return (
        <>
            {isAdmin && (
                <Container maxWidth="100%">
                    <h1 style={{ textAlign: "center", margin: "20px 0", color: "#1976d2" }}>Dashboard </h1>
                    <BasicTabs user={user} getUser={getUser} />
                </Container>)}
            <CopyRight sx={{ mt: 8, mb: 10 }} />

        </>
    )
}

export default AdminHomePage