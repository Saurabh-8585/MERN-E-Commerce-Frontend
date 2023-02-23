import { Avatar, Box, Grid, Rating, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { TbH1 } from 'react-icons/tb';
import { toast } from 'react-toastify';
const CommentCard = ({ userReview, setReviews, reviews, authToken }) => {
    let date = new Date(userReview.updatedAt).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })
    const [authUser, setAuthUser] = useState()

    useEffect(() => {
        getUser()
    }, [])
    const getUser = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_GET_USER_DETAILS}`, {
            headers: {
                'Authorization': authToken
            }
        })
        setAuthUser(data._id);
    }
    const handleDeleteComment = async () => {
        setReviews(reviews.filter(r => r._id !== userReview._id))
        try {
            const deleteReview = await axios.delete(`${process.env.REACT_APP_DELETE_REVIEW}/${userReview._id}`, {
                headers: {
                    'Authorization': authToken
                }
            })

            if (deleteReview.data.msg === 'Successful') {
                toast.success("Review Deleted", { autoClose: 500, theme: 'colored' })
            }
        } catch (error) {
            console.log(error);
        }

    }
    const handleEditComment = async () => {
        console.log(2);

    }
    return (
        // <Paper style={{ padding: "8px 10px", margin: "15px", backgroundColor:'#1976d' }}>
        
            <Grid container wrap="nowrap" spacing={2} sx={{ backgroundColor: '#1976d', boxShadow: '0px 8px 13px rgba(0, 0, 0, 0.2)', borderRadius: 5, margin: '20px auto' }
            }>
                <Grid item>
                    <Avatar alt="Customer Avatar" />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth >
                    <h4 style={{ margin: 0, textAlign: "left" }}>{userReview?.user?.firstName + '' + userReview?.user?.lastName}</h4>
                    <p style={{ textAlign: "left", marginTop: 10 }}>
                        <Rating name="read-only" value={userReview.rating} readOnly />
                    </p>
                    <p style={{ textAlign: "left", wordBreak: 'break-word', paddingRight: 10 }}>
                        {userReview.comment}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        {date}
                    </p>
                    {authUser === userReview?.user?._id &&
                        <Box sx={{ height: 20, transform: 'translateZ(0px)', flexGrow: 1 }}>
                            <SpeedDial
                                ariaLabel="SpeedDial basic example"
                                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                                icon={<SpeedDialIcon />}
                            >
                                {/* {actions.map((action) => ( */}
                                <SpeedDialAction
                                    icon={<AiFillEdit />}
                                    tooltipTitle={"Edit"}
                                    onClick={handleEditComment}
                                />
                                <SpeedDialAction
                                    icon={<AiFillDelete />}
                                    tooltipTitle={"Delete"}
                                    onClick={handleDeleteComment}
                                />

                                {/* ))} */}
                            </SpeedDial>
                        </Box>
                    }
                </Grid>
            </Grid>


    )
}

export default CommentCard