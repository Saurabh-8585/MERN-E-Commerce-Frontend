import { Card, CardActionArea, CardActions, Rating, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import styles from './ProductCard.module.css'

export default function ProductCard({ prod }) {
    return (
        <Card className={styles.main_card}>
            <CardActionArea className={styles.card_action}>
                <Box className={styles.cart_box}>
                    <img alt={prod.name} src={prod.image} loading='lazy' className={styles.cart_img} />
                </Box>
                <CardContent>
                    <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
                        {prod.name.length > 20 ? prod.name.slice(0, 20) + '...' : prod.name}
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