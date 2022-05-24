import { createSlice } from '@reduxjs/toolkit';
import web3actions from '../actions/web3Actions';

export type Account = {
    address: string,
    balance?: string
}

export type Web3State = {
    account?: Account,
    walletConnected?: boolean;
    error?: any
    version?: string,
    networkId?: string
}

const initialState: Web3State = {
    account: undefined,
    walletConnected: false,
    version: "",
    networkId: ""
}

const web3Slice = createSlice({
    name: 'web3',
    initialState: initialState,
    reducers: web3actions
});

export const { connectWalletOk, connectWalletError } = web3Slice.actions;
export default web3Slice.reducer;
