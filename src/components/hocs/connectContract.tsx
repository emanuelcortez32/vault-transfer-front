import React, { ComponentType, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import web3instance from '../../defi/web3/web3instance';
import { Account, Web3State } from '../../models/web3Models';
import { RootState } from '../../redux/store';
import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';

interface IContractAdapter {
    method: Function,
    send: Function,
    call: Function,
}

type ConfigSend = {
    value?: number
}
export class ContractAdapter implements IContractAdapter {

    private contract: Contract;
    private nameMethod: string = "";
    private account: Account | undefined | null = null;

    constructor(contract: Contract, account: Account) {
        this.contract = contract;
        this.account = account;
    }

    method(nameMethod: string) {
        this.nameMethod = nameMethod;
        return this;
    };

    send(...args: any[]) {
        return (config: ConfigSend) => {
            if (!this.nameMethod || this.nameMethod === "") throw new Error("Method not defined");
            return this.contract.methods[this.nameMethod!](...args).send({ from: this.account?.address, value: config?.value })
        }
    };

    call(...args: any[]) {
        if (!this.nameMethod || this.nameMethod === "") throw new Error("Method not defined");
        this.contract.methods[this.nameMethod!](...args).call({ from: this.account?.address })
    };
}

export const connectContract = (WrappedComponent: ComponentType<any | string>) => {
    return (contractName: string, mapContractMethodsToProps: Function) => {

        function WrappedComponentWithContract<P>(props: P) {

            const { contracts, walletConnected, account, networkId } = useSelector<RootState, Web3State>((state) => state.web3);

            const [ready, setReady] = useState<boolean>(false);
            const [contractAdapter, setContractAdapter] = useState<ContractAdapter | undefined | null>(null);

            useEffect(() => {
                if (walletConnected && account && contracts && networkId) {

                    setReady(true);

                    const contractTarget = contracts?.find(contract => contract.name === contractName ? contract : null);
                    if (!contractTarget) throw new Error(`${contractName} not found on state redux`);
                    const interfaceContract = JSON.parse(JSON.stringify(contractTarget.jsonInterface));
                    const addressContract = contractTarget.networks[networkId].address;
                    const contract = new web3instance.eth.Contract(interfaceContract, addressContract);

                    setContractAdapter(new ContractAdapter(contract, account));

                }
            }, [walletConnected, contracts, account, networkId]);

            return ready ? <WrappedComponent {...props} {...mapContractMethodsToProps(contractAdapter)} /> : <div>Conectando Wallet</div>
        }

        return WrappedComponentWithContract;
    }
}