import React, { ComponentType, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getWeb3, Web3Instance } from '../../defi/web3/web3';
import { RootState } from '../../redux/store';
import { Contract } from 'web3-eth-contract';
import { Account, Web3State } from '../../redux/reducers/web3slice';

interface IContractAdapter {
    method: Function,
    send: Function,
    call: Function,
}

type ConfigSend = {
    value?: number
}
export class ContractAdapter implements IContractAdapter {

    private web3: Web3Instance;
    private contract: Contract;
    private nameMethod: string = "";
    private account: Account | undefined | null = null;

    constructor(contract: Contract, account: Account, web3: Web3Instance) {
        this.web3 = web3;
        this.contract = contract;
        this.account = account;
    }

    method(nameMethod: string) {
        this.nameMethod = nameMethod;
        return this;
    };

    send(...args: any[]) {
        return (config: ConfigSend): Promise<any> => {
            if (!this.nameMethod || this.nameMethod === "") throw new Error("Method not defined");
            return new Promise((resolve, reject) => {
                if (config?.value) {
                    const valueToSend = this.web3.web3.utils.toWei(this.web3.web3.utils.toBN(config.value), "ether");
                    this.contract.methods[this.nameMethod!](...args).send({ from: this.account?.address, value: valueToSend })
                        .then((result: any) => resolve(result))
                        .catch((err: any) => reject(err))
                } else {
                    this.contract.methods[this.nameMethod!](...args).send({ from: this.account?.address })
                        .then((result: any) => resolve(result))
                        .catch((err: any) => reject(err))
                }

            })
        }
    };

    call(...args: any[]): Promise<any> {
        if (!this.nameMethod || this.nameMethod === "") throw new Error("Method not defined");

        return new Promise((resolve, reject) => {
            this.contract.methods[this.nameMethod!](...args).call({ from: this.account?.address })
                .then((result: any) => resolve(result))
                .catch((err: any) => reject(err))
        })
    };
}

export const connectContract = (WrappedComponent: ComponentType<any | string>) => {
    return (contractName: string, mapContractMethodsToProps: Function) => {

        function WrappedComponentWithContract<P>(props: P) {

            const { walletConnected, account, networkId } = useSelector<RootState, Web3State>((state) => state.web3);

            const [ready, setReady] = useState<boolean>(false);
            const [contractAdapter, setContractAdapter] = useState<ContractAdapter | undefined | null>(null);

            useEffect(() => {
                if (walletConnected && account && networkId) {

                    setReady(true);

                    getWeb3()
                        .then((web3instance: Web3Instance) => {
                            const contracts = web3instance.config.contracts;
                            const contractTarget = contracts?.find((contract: any) => contract.name === contractName ? contract : null);
                            if (!contractTarget) throw new Error(`${contractName} not found on state redux`);
                            const interfaceContract = JSON.parse(JSON.stringify(contractTarget.jsonInterface));
                            const addressContract = contractTarget.networks[networkId].address;
                            const contract: Contract = new web3instance.web3.eth.Contract(interfaceContract, addressContract);
                            setContractAdapter(new ContractAdapter(contract, account, web3instance));
                        })


                }
            }, [walletConnected, account, networkId]);

            return ready ? <WrappedComponent {...props} {...mapContractMethodsToProps(contractAdapter)} /> : <div>Conectando Wallet</div>
        }

        return WrappedComponentWithContract;
    }
}