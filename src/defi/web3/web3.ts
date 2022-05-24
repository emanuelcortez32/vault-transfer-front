import Web3 from "web3";
import contracts from "../contracts";

export type Web3Instance = {
  web3: Web3;
  config: any;
};

const config = {
  contracts: contracts,
};

let instance: Web3Instance | undefined | null = null;

export const getWeb3 = async (): Promise<Web3Instance> => {
  return new Promise((resolve, reject) => {

    if(instance) resolve(instance);

    if (window.ethereum) {
      const web3: Web3 = new Web3(window.ethereum);
      // Request account access if needed
      window.ethereum
        .enable()
        .then(() => {
          instance = { web3, config };
          resolve({ web3, config });
        })
        .catch((err: any) => reject(err));
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      // Use Mist/MetaMask's provider.
      const web3: Web3 = window.web3;
      console.log("Injected web3 detected.");
      instance = { web3, config };
      resolve({ web3, config });
    }
    // Fallback to localhost; use dev console port by default...
    else {
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
      const web3: Web3 = new Web3(provider);
      console.log("No web3 instance injected, using Local web3.");
      instance = { web3, config };
      resolve({ web3, config });
    }
  });
};
