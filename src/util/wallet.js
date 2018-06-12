import { ec } from 'elliptic';
import { keccak256 } from 'js-sha3';
import crypto from 'crypto';
import eccrypto from 'eccrypto';
import BN from 'bn.js';

const ecdsa = new ec('secp256k1');

//sateで管理したい
class Wallet {
    constructor() {
        this.privateKey = '';
        this.publicKey = '';
        this.address = '';
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
}

export default Wallet;