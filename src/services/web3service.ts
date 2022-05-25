import { getWeb3 } from "../defi/web3/web3";

export const connectWallet = async () => {
  try {
    const web3 = (await getWeb3()).web3;
    return web3;
  } catch (err: any) {
    throw new Error(err);
  }
};
