import React, { useState } from 'react';
import web3 from './web3'; // Ensure web3 is correctly set up
import TransferContractABI from './abi/TransferContractABI.js';

function App() {
  const [sourceAddress, setSourceAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [amount, setAmount] = useState('');

  const isValidAddress = (address) => {
    return web3.utils.isAddress(address);
  };

  const transferFunds = async () => {
    try {
      const contractAddress = '0x6055F9CB628ba4d414ad6717dBE1F416F4C25e58';

      // Validate addresses
      if (!isValidAddress(contractAddress)) {
        throw new Error('Invalid contract address');
      }
      if (!isValidAddress(sourceAddress) || !isValidAddress(destinationAddress)) {
        throw new Error('Invalid source or destination address');
      }

      const contract = new web3.eth.Contract(TransferContractABI, contractAddress);
      const accounts = await web3.eth.getAccounts();

      // Convert Ether amount to Wei
      const weiAmount = web3.utils.toWei(amount, 'ether'); // Convert decimal Ether to Wei

      // Get balance
      const balance = await web3.eth.getBalance(sourceAddress || accounts[0]);

      // Check if balance is sufficient
      if (BigInt(balance) < BigInt(weiAmount)) {
        throw new Error('Insufficient balance');
      }

      // Estimate gas
      const gasEstimate = await contract.methods.transferFunds(destinationAddress).estimateGas({
        from: sourceAddress || accounts[0],
        value: weiAmount
      });

      // Call the smart contract method
      await contract.methods.transferFunds(destinationAddress).send({
        from: sourceAddress || accounts[0],
        value: weiAmount,
        gas: gasEstimate // Provide gas estimate
      });

      alert('Funds transferred successfully!');
    } catch (error) {
      console.error('Transfer failed', error);
      alert(`Transfer failed: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Transfer Funds via Smart Contract</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          transferFunds();
        }}
      >
        <div>
          <label>Source Address:</label>
          <input
            type="text"
            value={sourceAddress}
            onChange={(e) => setSourceAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Destination Address:</label>
          <input
            type="text"
            value={destinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount (in Ether):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0"
            step="any" // Allow decimal values
          />
        </div>
        <button type="submit">Transfer</button>
      </form>
    </div>
  );
}

export default App;
