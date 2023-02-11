import { Avatar, Grid, Paper, Rating } from '@mui/material'
import React from 'react'


const CommentCard = ({ review }) => {
    let date = new Date(review.createdAt).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })


    return (
        <Paper style={{ padding: "10px 20px", margin: "15px" }}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar alt="Customer Avatar" />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>{review?.user?.name}</h4>
                    <p style={{ textAlign: "left", marginTop: 10 }}>
                        <Rating name="read-only" value={review.rating} readOnly />
                    </p>
                    <p style={{ textAlign: "left" }}>
                        {review.comment}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        {date}
                    </p>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default CommentCard