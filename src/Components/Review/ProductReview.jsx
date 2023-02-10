import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Rating from '@mui/material/Rating';
import {
    MdSentimentSatisfiedAlt,
    MdSentimentDissatisfied,
    MdSentimentVeryDissatisfied,
    MdSentimentNeutral,
    MdSentimentVerySatisfied,
    MdStarRate,
    MdOutlineSentimentVeryDissatisfied,
    MdSend
} from 'react-icons/md'
import Box from '@mui/material/Box';
import ReviewImg from '../../Assets/Banner/Customer_Review.jpg'
import { Button, TextField, Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import './Review.css'
import CommentCard from '../Card/Comment Card/CommentCard';


const labels = {
    0: <MdOutlineSentimentVeryDissatisfied style={{ color: 'red' }} />,
    0.5: <MdOutlineSentimentVeryDissatisfied style={{ color: 'red' }} />,
    1: <MdSentimentVeryDissatisfied style={{ color: 'red' }} />,
    1.5: <MdSentimentVeryDissatisfied style={{ color: 'red' }} />,
    2: <MdSentimentDissatisfied style={{ color: 'orange' }} />,
    2.5: <MdSentimentDissatisfied style={{ color: 'orange' }} />,
    3: <MdSentimentNeutral style={{ color: 'gold' }} />,
    3.5: <MdSentimentNeutral style={{ color: 'gold' }} />,
    4: <MdSentimentSatisfiedAlt style={{ color: 'green' }} />,
    4.5: <MdSentimentSatisfiedAlt style={{ color: 'green' }} />,
    5: <MdSentimentVerySatisfied style={{ color: 'green' }} />,
};


function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
const ProductReview = ({ authToken, setProceed, id, setOpenAlert, reviews, fetchReviews }) => {
    const [value, setValue] = useState('');
    const [hover, setHover] = useState(-1);
    const [comment, setComment] = useState('')
    // const [reviews, setReviews] = useState([])

    const handleSubmitReview = async (e) => {
        e.preventDefault()
        if (comment.length >= 4 && value > 0) {
            try {
                if (setProceed) {
                    const { data } = await axios.post(`${process.env.REACT_APP_ADD_REVIEW}`, { _id: id, comment: comment, rating: value }, {
                        headers: {
                            'Authorization': authToken
                        }
                    })
                    toast.success(data.msg, { autoClose: 500, })
                    fetchReviews()
                }
                else {
                    setOpenAlert(true)
                }
                setComment('')
                setValue(null)
            }
            catch (error) {
                toast.error(error.response.data.msg, { autoClose: 600, })
            }
        }
        else {
            toast.error("Please fill all field and add review more than 4 words", { autoClose: 500, })
        }
    }

    // const fetchReviews = async () => {
    //     const { data } = await axios.get(`${process.env.REACT_APP_GET_REVIEW}/${id}`)
    //     setReviews(data)
    //     console.log(data)
    // }
    return (
        <>
            <div className='form-container'>
                <form onSubmit={handleSubmitReview} className='form'>
                    <Box
                        sx={{
                            width: 300,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                        }}
                    >
                        <Rating
                            name="hover-feedback"
                            value={value}
                            precision={0.5}
                            getLabelText={getLabelText}
                            id="rating"
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);

                            }}
                            emptyIcon={<MdStarRate style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {value !== null && (
                            <Box className='expression-icon' sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                    </Box>
                    <TextField
                        id="filled-textarea"
                        value={comment} onChange={(e) => {
                            setComment(e.target.value)
                        }}
                        label="Add Review"
                        placeholder="Write review here"
                        multiline
                        className='comment'
                        variant="outlined"
                    />
                    <Tooltip title='Send Review'>
                        <Button className='all-btn' style={{ marginTop: 15 }} variant='contained' type='submit' endIcon=<MdSend /> >Send</Button>
                    </Tooltip>
                </form>
                <div className="form-img-box">
                    <img src={ReviewImg} alt="Customer Review" className='review-img' />
                </div>
            </div>
            <Box sx={{ width: "70%", display: 'flex', justifyContent: "center", flexDirection: 'column', margin: 'auto' }}>       {
                reviews.map(review =>
                    <CommentCard review={review} key={review._id} />
                )
            }
            </Box>

        </>
    )
}

export default ProductReview




