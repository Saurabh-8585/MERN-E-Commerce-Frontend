import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import UserTable from '../Components/UserTable';

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
            toast.error("Something went wrong", { autoClose: 500, theme: "colored" });
        }
    }
    return (
        <div style={{padding:10}}>AdminHomePage
            <UserTable user={user} setUser={setUser} />
        </div>
    )
}

export default AdminHomePage