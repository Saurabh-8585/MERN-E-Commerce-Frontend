import {  Skeleton } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

const Loading = () => {
    return (

        <Stack className='loading' spacing={1}>
            <Skeleton variant="rounded" width={180} height={200} />
            <Skeleton className='prod-name' variant="text" width={140} height={15} />
            <div className="divider">
                <Skeleton variant="rounded" width={110} height={20} />
                <Skeleton variant="rounded" width={110} height={20} />
            </div>
        </Stack>
    )
}

export default Loading