import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import CommentCard from '../../Components/Card/Comment Card/CommentCard';


const UserReviewItem = ({ userReview }) => {
    return (
        <>
            <Typography variant='h6' sx={{ margin: '20px 0', textAlign: 'center' }}>User Reviews</Typography>
            <Box className='review-box' sx={{ padding: 1.5 }} >
                {
                    userReview.map(review =>
                        <Link to={`/Detail/type/${review.productId.type}/${review.productId._id}`} key={review._id}>
                            <CommentCard userReview={review} key={review._id} />
                        </Link>
                    )
                }
            </Box>
        </>
    )
}

export default UserReviewItem