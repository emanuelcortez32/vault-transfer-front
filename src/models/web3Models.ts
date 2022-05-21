import { AbiItem } from 'web3-utils';

export type Contract = {
    networks?: any,
    name: string,
    jsonInterface: AbiItem[],
}

export type Account = {
    address: string,
    balance?: string
}

export type Web3State = {
    account?: Account,
    contracts?: Contract[]
    walletConnected?: boolean;
    error?: any
    version?: string,
    networkId: string
}