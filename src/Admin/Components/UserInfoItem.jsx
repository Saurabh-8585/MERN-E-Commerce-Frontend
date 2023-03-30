import React from 'react'
import { Container, Grid, TextField, Typography } from '@mui/material'

const UserInfoItem = ({ userData }) => {
    return (
        <Container sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: 10 }}>
            <Typography variant='h6' sx={{ margin: '20px 0' }}>User Details</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField inputProps={{ readOnly: true }} label="First Name" name='firstName' value={userData.firstName || ''} variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField inputProps={{ readOnly: true }} label="Last Name" name='lastName' value={userData.lastName || ''} variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField inputProps={{ readOnly: true }} label="Contact Number" type='tel' name='phoneNumber' value={userData.phoneNumber || ''} variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField inputProps={{ readOnly: true }} label="Email" name='userEmail' value={userData.email || ''} variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField inputProps={{ readOnly: true }} label="Address" name='address' value={userData.address || ''} variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField inputProps={{ readOnly: true }} label="City" name='city' value={userData.city || ''} variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField inputProps={{ readOnly: true }} type='tel' label="Postal/Zip Code" name='zipCode' value={userData.zipCode || ''} variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} >
                    <TextField inputProps={{ readOnly: true }} label="Province/State" name='userState' value={userData.userState || ''} variant="outlined" fullWidth />
                </Grid>
            </Grid>
        </Container >
    )
}

export default UserInfoItem