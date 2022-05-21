import { createSlice } from '@reduxjs/toolkit';
import { Web3State } from '../../models/web3Models';
import web3actions from '../actions/web3Actions';


const initialState: Web3State = {
    contracts: [],
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

export const { addContract, getAccount, errorWeb3, connectWallet, getVersion, getNetworkId } = web3Slice.actions;
export default web3Slice.reducer;
