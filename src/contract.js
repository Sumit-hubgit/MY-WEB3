import web3 from './web3';
import MyContractABI from './abi/MyContractABI';

const contractAddress = '0x8Bc2212f98d4A4486F3Eb1636449b320f73C334c'; // Replace with your actual contract address
const contract = new web3.eth.Contract(MyContractABI, contractAddress);

export default contract;
