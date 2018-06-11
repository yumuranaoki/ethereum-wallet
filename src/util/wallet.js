import { ec } from 'elliptic';
import { keccak256 } from 'js-sha3';

const ecdsa = new ec('secp256k1');

//sateで管理したい
class Wallet {
    constructor() {
        this.privateKey = '';
        this.publicKey = '';
        this.address = '';
        this.generatePrivateKey = this.generatePrivateKey.bind(this);
        this.generatePublicKey = this.generatePublicKey.bind(this);
    }

    generatePrivateKey() {
        const character = "abcdefABCDEF0123456789";
        const characterLength = character.length;                
        for(let i=0; i<64; i++){
            this.privateKey += character[Math.floor(Math.random()*characterLength)];
        }
        this.privateKey = "0x" + this.privateKey;
    }

    generatePublicKey() {
        this.publicKey = ecdsa.keyFromPrivate(this.privateKey, 'hex');
    }

    generateAddress() {

    }
}

export default Wallet;