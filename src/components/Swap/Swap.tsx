import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

import { Container } from '@mui/system';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Web3State } from '../../redux/reducers/web3slice';
import { Token, TokenSelector } from '../common/TokenSelector';



const tokens: Token[] = [
    {
        value: 'Ethereum',
        alt: 'eth',
        color: '#7203ee'
    },
    {
        value: 'DAI',
        alt: 'dai',
        color: '#f1c40f'
    },
    {
        value: 'USDC',
        alt: 'usdc',
        color: '#2980b9'
    },
    {
        value: 'Tether',
        alt: 'usdt',
        color: '#28b463'
    },
];

export const Swap = () => {

    const [tokenAmount, setTokenAmount] = useState<string>("0");
    const [tokenAmountSwap, setTokenAmountSwap] = useState<string>("0");
    const [tokenSelected, setTokenSelected] = useState<Token>(tokens[0]);
    const [tokenSwapSelected, setTokenSwapSelected] = useState<Token|undefined|null>(tokens[1]);


    const { walletConnected, account } = useSelector<RootState, Web3State>(state => state.web3);

    const formatAddress = (address: string) => {
        return address.substring(0, 8) + '.....' + address.substring(address.length - 8, address.length);
    }

    const handleSelectToken = (token: Token) => {
        if(tokenSwapSelected?.alt === token.alt) {
            setTokenSwapSelected(null)
        }
        setTokenSelected(token)
    }

    const handleSelectSwapToken = (token: Token) => {
        setTokenSwapSelected(token)
    }

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
                                <InputLabel htmlFor="outlined-adornment-amount">Token</InputLabel>
                                <OutlinedInput
                                    disabled={!walletConnected}
                                    id="outlined-adornment-token"
                                    value={tokenAmount}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTokenAmount(e.target.value)}
                                    startAdornment={<TokenSelector tokens={tokens} onChange={handleSelectToken}/>}
                                    label="Token"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="outlined-adornment-address">Address</InputLabel>
                                <OutlinedInput
                                    disabled
                                    id="outlined-adornment-address"
                                    value={account?.address ? formatAddress(account?.address) : ""}
                                    startAdornment={<InputAdornment position="start"><AccountBalanceWalletIcon /></InputAdornment>}
                                    label="Address"
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
                                    disabled
                                    value={tokenAmountSwap}
                                    startAdornment={<TokenSelector tokens={tokens.filter((token) => token.alt !== tokenSelected.alt)} onChange={handleSelectSwapToken}/>}
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
                    <Button disabled={!walletConnected} sx={{ borderRadius: 5, width: '100%', backgroundColor: '#fca311', fontWeight: 'bold' }} variant="contained">Swap</Button>
                </Grid>
            </div>
        </Box>
    )
}