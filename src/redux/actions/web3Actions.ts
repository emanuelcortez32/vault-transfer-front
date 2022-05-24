import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { Web3State } from "../reducers/web3slice";
import { Dispatch } from 'redux';
import { connectWallet } from "../../services/web3service";

const connectWalletOk: CaseReducer<Web3State, PayloadAction<Web3State>> = (state, action) => {
    state.account = action.payload.account;
    state.walletConnected = true;
    state.networkId = action.payload.networkId;
    state.version = action.payload.version
};

const connectWalletError: CaseReducer<Web3State, PayloadAction<Web3State>> = (state, action) => {
    state.error = action.payload.error
};

const actions = { connectWalletOk, connectWalletError };

export default actions;