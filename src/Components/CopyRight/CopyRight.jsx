import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const CopyRight = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props} style={{ color: '#1976d2' }}>
            {'Copyright © '}
            <Link to='/' style={{ color: '#1976d2' }}>
                Shop It
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export default CopyRight