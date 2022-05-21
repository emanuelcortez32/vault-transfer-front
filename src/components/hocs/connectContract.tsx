import React, { ComponentType, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import web3instance from '../../defi/web3/web3instance';
import { ContractAdapter, Web3State } from '../../models/web3Models';
import { RootState } from '../../redux/store';
import { Contract } from 'web3-eth-contract';


export const connectContract = (WrappedComponent: ComponentType<any | string>) => {
    return (contractName: string, mapContractMethodsToProps: Function) => {

        function WrappedComponentWithContract<P>(props: P) {

            const { contracts, walletConnected, account, networkId } = useSelector<RootState, Web3State>((state) => state.web3);

            const [ready, setReady] = useState<boolean>(false);
            const [contractAdapter, setContractAdapter] = useState<ContractAdapter | undefined | null>(null);

            const makeContractAdapter = (contract: Contract): ContractAdapter => {

                let _methodName: string | undefined | null = null;

                let _method: Function = (name: string) => {
                    _methodName = name;
                    return {
                        send: _send,
                        call: _call,
                        transfer: _transfer
                    }
                }
                let _call = (...args: any[]) => {
                    if (!_methodName || _methodName === "") throw new Error("Method not defined");

                    contract.methods[_methodName!](...args).call({ from: account?.address })
                        .then((result: any) => console.log(result))
                        .catch((err: any) => console.log(err))

                };

                let _send = (...args: any[]) => {
                    if (!_methodName || _methodName === "") throw new Error("Method not defined");
                    return contract.methods[_methodName!](...args).send({ from: account?.address })
                };
                let _transfer = (value?: any, ...args: any[]) => {
                    if (!_methodName || _methodName === "") throw new Error("Method not defined");
                    return contract.methods[_methodName!](...args).send({ from: account?.address, value: value });
                };

                return {
                    method: _method,
                    send: _send,
                    call: _call,
                    transfer: _transfer
                };
            }


            useEffect(() => {
                if (walletConnected && account && contracts && networkId) {

                    setReady(true);

                    const contractTarget = contracts?.find(contract => contract.name === contractName ? contract : null);
                    if (!contractTarget) throw new Error(`${contractName} not found on state redux`);
                    const interfaceContract = JSON.parse(JSON.stringify(contractTarget.jsonInterface));
                    const addressContract = contractTarget.networks[networkId].address;
                    const contract = new web3instance.eth.Contract(interfaceContract, addressContract);

                    setContractAdapter(makeContractAdapter(contract));

                }
            }, [walletConnected, contracts, account, networkId]);

            return ready ? <WrappedComponent {...props} {...mapContractMethodsToProps(contractAdapter)} /> : <div>Conectando Wallet</div>
        }

        return WrappedComponentWithContract;
    }
}