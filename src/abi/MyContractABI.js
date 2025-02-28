const MyContractABI = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_number",
                    "type": "uint256"
                }
            ],
            "name": "setNumber",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getNumber",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "myNumber",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    
  ];
  
  export default MyContractABI;
  