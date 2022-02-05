const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3');
const {abi, bytecode} = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let contract;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    contract = await new web3.eth.Contract(abi)
        .deploy({data: bytecode, arguments: ['Hello World!']})
        .send({from: accounts[0], gas: '1000000'});
});

describe('Inbox', () => {
    it('deploy the contract', async () => {
        const expectedInitialMsg = 'Hello World!';
        const actualInitialMsg = await contract.methods.getMessage().call();

        assert.equal(actualInitialMsg, expectedInitialMsg);
        assert.ok(contract.options.address);
    });

    it('contract setMessage method', async () => {
        const message = 'It is a test';
        await contract.methods.setMessage(message).send({ from: accounts[0] });

        const actualMsg = await contract.methods.getMessage().call();

        assert.equal(actualMsg, message);
    });
});