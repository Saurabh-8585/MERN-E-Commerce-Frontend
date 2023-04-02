import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import UserTable from '../Components/UserTable';
import ProductChart from '../Components/Charts/ProductChart';

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
            console.log(error);
            !isAdmin && navigate('/')
            toast.error(error.response.data, { autoClose: 500, theme: "colored" });
        }
    }
    return (
        <>
            <div style={{ padding:"0 50px" }}>
                <h1 style={{ textAlign: "center", margin: "20px 0", color: "#1976d2" }}>Admin Home Page</h1>
                {isAdmin ? <UserTable user={user} setUser={setUser} />
                    : <h1 style={{ textAlign: "center" }}>Not Authorized User</h1>}
            </div>
            <ProductChart />
        </> 
    )
}

export default AdminHomePage