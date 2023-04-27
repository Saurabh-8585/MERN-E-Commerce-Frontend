import { Box, IconButton, Typography, useMediaQuery } from '@mui/material'
import React from 'react'

const Widget = ({ numbers, heading, color, icon }) => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <Box
            sx={{
                backgroundColor: color,
                borderRadius: 4,
                p: 2,
                maxWidth: isSmallScreen ? "100 % " : 300,
                display: "flex", justifyContent: "space-between", alignItems: "center",
                boxShadow: '0px 8px 13px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-5px)',
                },

            }}>
            <Box>
                < Typography variant="h6" sx={{
                    color: "white", mb: 1, fontWeight: 'bold',
                }}>
                    {heading}
                </Typography >
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h4" sx={{ color: "white", textAlign: 'center' }}>
                            {numbers}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box>
                <IconButton sx={{ fontSize: 45, color: "white" }}>
                    {icon}
                </IconButton>
            </Box>
        </Box >

    )
}

export default Widget