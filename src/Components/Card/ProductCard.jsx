import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Rating } from '@mui/material';
import { Box } from '@mui/system';
import './ProductCard.css'

export default function ProductCard({ prod }) {
    const [isReadMode, SetisReadMode] = useState(true)

    useEffect(() => {
    }, [])


    return (
        <Card className='main-card'>
            <CardActionArea>
                <Box className='img-box'  >
                    <CardMedia
                        component="img"
                        alt={prod.name}
                        src={prod.image}
                        className='img'

                    />
                </Box>
                <CardContent>
                    <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
                        {isReadMode ? prod.name.slice(0, 20) : prod.name}
                        {
                            prod.name.length > 15 &&
                            <span
                                onClick={() => SetisReadMode(!isReadMode)}>
                                {isReadMode ? "..." : ""}
                            </span>
                        }
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
                <Typography variant="h6" color="primary">
                    ₹{prod.price}
                </Typography>
                <Typography >
                    <Rating precision={0.5} name="read-only" value={prod.rating} readOnly />
                </Typography>


            </CardActions>
        </Card >
    );
}