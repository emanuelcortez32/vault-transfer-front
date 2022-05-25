import { Grid } from '@mui/material';
import React from 'react';
import { Swap } from '../components/Swap/Swap';

export const Home = () => {

    return (
        <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center">
            <Swap />
        </Grid>
    )
}