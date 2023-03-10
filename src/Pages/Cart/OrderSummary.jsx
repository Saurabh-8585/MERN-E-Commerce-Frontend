import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'

const OrderSummary = ({ proceedToCheckout, total, shippingCoast }) => {
    return (
        <Card
            sx={{
                position: "sticky",
                top: "1rem",
                minWidth: 350,
                margin: '20px auto',
                // height:250,


            }}
            // className={classes.root}

            elevation={15}
        >
            <CardContent >
                <Typography variant="div" component="h1">
                    {" "}
                    Order Summary
                </Typography>
                <Typography variant="subtitle2">
                    <hr />
                </Typography>
                <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }} >
                        <Typography variant="body1" component="div" color='primary'>
                            SubTotal
                        </Typography>
                        <Typography variant="h6" component="div" color='primary'>
                            ₹{total - shippingCoast}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }} >
                        <Typography variant="body1" component="div" color='primary'>
                            Shipping
                        </Typography>
                        <Typography variant="h6" component="div" color='primary'>
                            ₹{shippingCoast}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2}}>
                        <Typography variant="body1" component="div" color='primary'>
                            Total
                        </Typography>
                        <Typography variant="h6" component="div" color='primary'>
                            ₹{total}
                        </Typography>
                    </Box>
                </Grid>
            </CardContent>
            <CardActions>
                <Button variant='contained' size="large" color="primary" onClick={proceedToCheckout}>
                    Proceed To Checkout
                </Button>
            </CardActions>
        </Card >
    )
}

export default OrderSummary