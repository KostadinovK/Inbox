const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, bytecode } = require('./compile');

const MetamaskMnemonic = 'violin utility spoil left cream milk pigeon rocket vapor hospital add jeans';
const InfuraEndpoint = 'https://ropsten.infura.io/v3/6986ea39d6ac482daab70c0184fb5a05';

//There is a problem with the deployment, it was fixed by setting the version of the truffle/hdwallet-provider package to 1.5.1

const provider = new HDWalletProvider(MetamaskMnemonic, InfuraEndpoint);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Account to deploy from: ', accounts[0]);

    const contract = await new web3.eth.Contract(abi)
        .deploy({data: bytecode, arguments: ['Hello World!']})
        .send({from: accounts[0], gas: '1000000'});

    console.log('Contract address: ', contract.options.address);
    provider.engine.stop();
};

deploy();
