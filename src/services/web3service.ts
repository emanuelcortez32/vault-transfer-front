import { Dispatch } from "redux";
import web3instance from "../defi/web3/web3instance";
import {
  addContract,
  connectWallet,
  errorWeb3,
  getAccount,
  getNetworkId,
  getVersion,
} from "../redux/reducers/web3slice";
import contracts from "../defi/contracts";
import { AbiItem } from "web3-utils";

const getMetamaskAccount = ():any => {
  return async (dispatch: Dispatch) => {
    const account = (await web3instance.eth.getAccounts())[0];
    const balance = await web3instance.eth.getBalance(account);
    dispatch(getAccount({ address: account, balance: balance }));
  };
};

const getNetwork = () : any => {
    return async (dispatch: Dispatch) => {
        const networkId = (await web3instance.eth.net.getId((err, id) => id)).toString();
        dispatch(getNetworkId(networkId));
    }
}

const loadContracts = (): any => {
  return async (dispatch: Dispatch) => {
    contracts.forEach((contract) => {
      dispatch(
        addContract({
          name: contract.contractName,
          jsonInterface: contract.abi as unknown as AbiItem[],
          networks: contract.networks
        })
      );
    });
  };
};

const errorInitWeb3 = (err: any): any => {
  return (dispatch: Dispatch) => {
    dispatch(errorWeb3(err));
  };
};

export const initWeb3 = (): any => {
  return async (dispatch: Dispatch) => {
    dispatch(connectWallet(false));
    try {
      dispatch(getMetamaskAccount());
      dispatch(getNetwork());
      dispatch(loadContracts());
      dispatch(getVersion(web3instance.version));
      dispatch(connectWallet(true));
    } catch (err) {
      dispatch(errorInitWeb3(err));
    }
  };
};
