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
        const character = "abcdef0123456789";
        const characterLength = character.length;                
        for(let i=0; i<64; i++){
            this.privateKey += character[Math.floor(Math.random()*characterLength)];
        }
        this.privateKey = "0x" + this.privateKey;
    }

    generatePublicKey() {
        this.publicKey = ecdsa.keyFromPrivate(this.privateKey, 'hex').pub;
    }

    generateAddress() {
        address = keccak256(this.publicKey).slice(24);
        keccak256Address = keccak256(address)
        for (let i = 0; i<32; i++) {
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