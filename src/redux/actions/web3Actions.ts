import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { Account, Contract, Web3State } from "../../models/web3Models";

const addContract: CaseReducer<Web3State, PayloadAction<Contract>> = (state, action) => {
    state.contracts?.push(action.payload);
};

const getAccount: CaseReducer<Web3State, PayloadAction<Account>> = (state, action) => {
    state.account = action.payload;
};

const errorWeb3: CaseReducer<Web3State, PayloadAction<any>> = (state, action) => {
    state.error = action.payload;
}

const connectWallet: CaseReducer<Web3State, PayloadAction<boolean>> = (state, action) => {
    state.walletConnected = action.payload;
};

const getVersion: CaseReducer<Web3State, PayloadAction<string>> = (state, action) => {
    state.version = action.payload;
};

const getNetworkId: CaseReducer<Web3State, PayloadAction<string>> = (state, action) => {
    state.networkId = action.payload;
};

const actions = { addContract, getAccount, errorWeb3, connectWallet, getVersion, getNetworkId };

export default actions;