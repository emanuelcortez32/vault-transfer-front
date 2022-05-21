import Web3 from 'web3';

const createInstance = (): Web3 => new Web3(Web3.givenProvider || "http://localhost:7545");
const instance = createInstance();
export default instance;