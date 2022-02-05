const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractName = 'Inbox.sol';
const contractPath = path.resolve(__dirname, 'contracts', contractName);

const contractSource = fs.readFileSync(contractPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        [contractName]: {
            content: contractSource,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

const compilerResult = JSON.parse(solc.compile(JSON.stringify(input)));
const contract =  compilerResult.contracts[contractName]['Inbox'];

module.exports = {
    bytecode: contract.evm.bytecode.object,
    abi: contract.abi
};
