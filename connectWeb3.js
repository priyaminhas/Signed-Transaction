const Web3 = require('web3');
const Tx   = require('ethereumjs-tx');
const contract_file = require('./smartContract/build/contracts/SimpleStorage.json');
const CONTRACT_ADDRESS = '0x1e7B643539fb375A6Fc856F5B80883A5736dA3D5';
const CONTRACT_ABI = contract_file.abi;

let web3, contract, nonce, getABI, decrementABI, incrementABI;
const account = '0xc02d1eb7fbB55B2C31e927b4177F8c7EE5f9c6C0';
var TxObj = Tx.Transaction;
let value = 5;
(async () => {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    contract = await new web3.eth.Contract(CONTRACT_ABI,CONTRACT_ADDRESS);
    getABI = contract.methods.get().encodeABI();
    decrementABI = contract.methods.decrement(value).encodeABI();
    incrementABI = contract.methods.increment(value).encodeABI();
})();
async function makeTransaction(_data) {
    console.log('make');
    nonce = await web3.eth.getTransactionCount(account);
   console.log(nonce);
    const privateKey = Buffer.from('050659f909fd60015d0d75f5ac134cfa775c607b6246de6b53b1bbc01db8f12f', 'hex');
    
    const rawTx = {
        nonce: nonce,
        gasPrice: '0x20000000000',
        gasLimit: '0x41409',
        to: CONTRACT_ADDRESS,
        value: 0,
        data: _data
    };
    var tx = new TxObj(rawTx);
    tx.sign(privateKey);
    var serializedTx = tx.serialize();
    return web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
    
}

const connectWeb3 = {    
    async getStoredData(){
        return Promise.all([
            makeTransaction(getABI),
            contract.methods.get().call()
        ]);
    },
    async incrementFunction(value){
        return makeTransaction(incrementABI);
    }
}
module.exports = connectWeb3;