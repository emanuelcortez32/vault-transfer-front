import { Grid } from '@mui/material';
import React from 'react';
import { TransferBox } from '../components/Transfer/TransferBox';

export const Home = () => {

    return (
        <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center">
            <TransferBox />
        </Grid>
    )
}