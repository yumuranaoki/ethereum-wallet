import { ec } from 'elliptic';
import { keccak256 } from 'js-sha3';
import eccrypto from 'eccrypto';
import BN from 'bn.js';
import EthereumTx from 'ethereumjs-tx';
import 'babel-polyfill';

const ecdsa = new ec('secp256k1');

//sateで管理したい
//メソッドをどこまで区切るかを再考
class Wallet {
    constructor() {
        this.privateKey = '';
        this.publicKey = '';
        this.address = '';
        this.transactions = [];
        this.signedTransactions = [];
        this.generatePrivateKey = this.generatePrivateKey.bind(this);
        this.generatePublicKey = this.generatePublicKey.bind(this);
        this.generateAddress = this.generateAddress.bind(this);
    }

    generatePrivateKey() {
        const character = "abcdef0123456789";
        const characterLength = character.length;                
        for(let i=0; i<64; i++){
            this.privateKey += character[Math.floor(Math.random()*characterLength)];
        } 
        this.privateKey = Buffer.from(this.privateKey, 'hex');
    }

    generatePublicKey() {
        this.publicKey = eccrypto.getPublic(this.privateKey);
    }

    generateAddress() {
        const address = keccak256(this.publicKey.slice(1)).slice(24);
        const keccak256Address = keccak256(address)
        for (let i = 0; i<40; i++) {
            if (parseInt(keccak256Address[i], 16) >=　8 && !Number(address[i])) {
                this.address += address[i].toUpperCase();
            } else {
                this.address += address[i];
            }
        }
        this.address = '0x' + this.address;
    }

    async getNonce() {
        return new Promise((resolve) => {
            let ethGetTransactionCount = {
                "jsonrpc": "2.0",
                "method": "eth_getTransactionCount",
                "params": [this.address,"latest"],
                "id": 1
            }
            fetch('https://mainnet.infura.io/Y80MvxYEzKUddrYMy9Xj', {
                method: 'POST',
                body: JSON.stringify(ethGetTransactionCount),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(res => res.json())
            .then(res => res.result)
            .then(result => parseInt(result, 16))
            .then(result => resolve(result))
            .catch(err => console.log(err));
        })
    }

    async setTransaction(txParams) {
        if (this.address) {
            let transaction = {}
            let nonce = await this.getNonce()
            console.log(nonce);
            transaction.nonce = nonce;
            transaction.gasPrice = '0x' + (1000000000).toString(16);
            transaction.gasLimit = '0x' + (21000).toString(16);
            transaction.to = ''
            transaction.value = ''
            transaction.data = ''
            transaction.value = ''
            transaction.chainId = ''
            this.transactions.push(transaction);
        }
    }

    async signTransaction() {
        if (this.privateKey) {
            return new Promise(resolve => {
                let tx = new EthereumTx(this.transactions[0]);
                tx.sign(this.privateKey);
                resolve(tx);
            })
        }
    }

    async setSignedTransaction() {
        let signedTransaction = await this.signTransaction();
        this.signedTransactions.push(signedTransaction);
    }

    sendRawTransaction() {
        if (this.signedTransactions.length > 0) {
            let serializedTx = this.signedTransactions[0].serialize();
            let rawTx = '0x' + serializedTx.toString('hex');
            let ethSendRawTransaction = {
                "jsonrpc": "2.0",
                "method": "eth_sendRawTransaction",
                "params": [rawTx],
                "id": 3 //さすがにmainnetで試せない
            }
            fetch('https://mainnet.infura.io/Y80MvxYEzKUddrYMy9Xj', {
                method: 'POST',
                body: JSON.stringify(ethSendRawTransaction),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        }
    }
}

export default Wallet;