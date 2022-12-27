import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useState } from 'react';

export default function BasicRating({ rating }) {
    const [value, setValue] = useState(rating);

    return (
        <Box>

            <Rating name="read-only" value={Math.round(value)} readOnly />

        </Box>
    );
}