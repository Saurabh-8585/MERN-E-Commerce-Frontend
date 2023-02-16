import { useEffect, useState } from 'react';
import { Card, CardActionArea, CardActions, Rating, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';
import styles from './ProductCard.module.css'

export default function ProductCard({ prod }) {
    const [isReadMode, SetisReadMode] = useState(true)

    useEffect(() => {
    }, [])


    return (
        <Card className={styles.main_card}>
            <CardActionArea className={styles.card_action}>
                    <CardMedia
                        component="img"
                        alt={prod.name}
                        src={prod.image}
                        className={styles.cart_img}
                    />
                <CardContent>
                    <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
                        {isReadMode ? prod.name.slice(0, 15) : prod.name}
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