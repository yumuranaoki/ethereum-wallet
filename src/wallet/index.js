import { ec } from 'elliptic';
import { keccak256 } from 'js-sha3';
import eccrypto from 'eccrypto';
import EthereumTx from 'ethereumjs-tx';
import 'babel-polyfill';
import { generateMnemonicWord, fromSeed } from './mnemonic';

const ecdsa = new ec('secp256k1');


class Wallet {
    constructor() {
        this.mnemonicWord = null;
        this.privateKey = null;
        this.publicKey = null;
        this.address = '';
    }

    generateMnemonicWord() {
        const mnemonicWord = generateMnemonicWord();
        this.mnemonicWord = mnemonicWord;
    }

    generatePrivateKey() {
        //passphraseを入力してもらう
        if (this.mnemonicWord) {
            const [privateKey, chainCode] = fromSeed(this.mnemonicWord, '');
            this.privateKey = privateKey
        }
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

    async signTransaction(txParams) {
        if (this.privateKey) {
            let transaction = {}
            let nonce = await this.getNonce()
            transaction.nonce = nonce;
            transaction.gasPrice = '0x' + parseInt(txParams.gasPrice, 10).toString(16);
            transaction.gasLimit = '0x' + parseInt(txParams.gasLimit, 10).toString(16);
            transaction.to = txParams.toAddress;
            transaction.value = '0x' + parseInt(txParams.value, 10).toString(16);
            transaction.chainId = txParams.chainId;
            return new Promise(resolve => {
                let tx = new EthereumTx(transaction);
                tx.sign(this.privateKey);
                resolve(tx);
            })
        }
    }

    async sendRawTransaction(txParams) {
        const signedTransaction = await this.signTransaction(txParams);
        if (signedTransaction) {
            const serializedTx = signedTransaction.serialize();
            const rawTx = '0x' + serializedTx.toString('hex');
            const ethSendRawTransaction = {
                "jsonrpc": "2.0",
                "method": "eth_sendRawTransaction",
                "params": [rawTx],
                "id": 3 //さすがにmainnetで試せないが選べるように
            }
            fetch('https://ropsten.infura.io/Y80MvxYEzKUddrYMy9Xj', {
                method: 'POST',
                body: JSON.stringify(ethSendRawTransaction),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(res => res.json())
            .then(res => res.result)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        }
    }
}

export default Wallet;