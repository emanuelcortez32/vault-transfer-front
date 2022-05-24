import { Dispatch } from "redux";
import { connectWallet } from '../../services/web3service';
import { connectWalletOk, connectWalletError } from '../reducers/web3slice';

export const connectWalletAction = (): any => {
    return async (dispatch: Dispatch) => {
        try {
            const web3 = await connectWallet();
            const address = (await web3.eth.getAccounts())[0];
            const balance = await web3.eth.getBalance(address);
            const version = web3.version;
            const networkId = (await web3.eth.net.getId()).toString();

            const payload = {
                account: {
                    address,
                    balance
                },
                networkId,
                version
            }
            dispatch(connectWalletOk(payload))
        }catch (err: any) {
            dispatch(connectWalletError(err))
        }
    }
}