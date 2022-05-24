import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import QrCodeIcon from '@mui/icons-material/QrCode';

import { styled } from '@mui/material/styles';
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Web3State } from '../../redux/reducers/web3slice';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#14213d',
    padding: theme.spacing(1),
}));

export const TransferBox = () => {

    const { walletConnected } = useSelector<RootState, Web3State>(state => state.web3);

    return (
        <Box
            sx={{
                width: 420,
                height: 380,
                backgroundColor: '#14213d',
                borderRadius: 5,
                padding: 2
            }}
        >
            <Box
                sx={{
                    width: 'auto',
                    height: 'auto',
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    padding: 2
                }}
            >
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                <OutlinedInput
                                    disabled={!walletConnected}
                                    id="outlined-adornment-amount"
                                    value={0}
                                    startAdornment={<InputAdornment sx={{ fontWeight: 'bold' }} position="start">ETH</InputAdornment>}
                                    label="Amount"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="outlined-adornment-from">From</InputLabel>
                                <OutlinedInput
                                    disabled
                                    id="outlined-adornment-from"
                                    value={""}
                                    startAdornment={<InputAdornment position="start"><AccountBalanceWalletIcon /></InputAdornment>}
                                    label="From"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <div style={{ marginTop: 4, marginBottom: 2 }}>
                <Grid container
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <ArrowCircleDownIcon fontSize='large' sx={{ color: '#fff' }} />
                </Grid>
            </div>
            <Box
                sx={{
                    width: 'auto',
                    height: 'auto',
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    padding: 2
                }}
            >
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="outlined-adornment-to">To</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-to"
                                    disabled={!walletConnected}
                                    value={""}
                                    startAdornment={<InputAdornment position="start"><QrCodeIcon /></InputAdornment>}
                                    label="To"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <div style={{ marginTop: 15, marginBottom: 2 }}>
                <Grid container
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <Button disabled={!walletConnected} sx={{borderRadius: 5, width: '100%', backgroundColor: '#fca311', fontWeight: 'bold' }} variant="contained">Transfer</Button>
                </Grid>
            </div>
        </Box>
    )
}