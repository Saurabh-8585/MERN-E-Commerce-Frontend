import { Avatar, Grid, Paper, Rating } from '@mui/material'
const CommentCard = ({ review }) => {
    let date = new Date(review.createdAt).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })


    return (
        // <Paper style={{ padding: "8px 10px", margin: "15px", backgroundColor:'#1976d' }}>
        <Grid container wrap="nowrap" spacing={2} sx={{ backgroundColor: '#1976d', boxShadow:'0px 8px 13px rgba(0, 0, 0, 0.2)' ,borderRadius:5,marginTop:5 }}>
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
        // </Paper>
    )
}

export default CommentCard