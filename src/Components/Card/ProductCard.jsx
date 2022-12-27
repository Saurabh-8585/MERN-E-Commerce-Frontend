import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Rating from '../Rating';
import { Box } from '@mui/system';


export default function ProductCard({ prod }) {
    const [isReadMode, SetisReadMode] = useState(true)

    useEffect(() => {
    }, [])


    return (
        <Card sx={{ width: 300, margin: "30px 10px 0 10px" }}>
            <CardActionArea>
                <Box className='img-box'  >
                    <CardMedia
                        component="img"
                        height="100%"
                        width="100%"
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
            <CardActions style={{ display: "flex", justifyContent: "space-around" }}>
                <Typography variant="h6" color="primary">
                    ₹{prod.price}
                </Typography>

                <Rating rating={prod.rating} />

            </CardActions>
        </Card >
    );
}