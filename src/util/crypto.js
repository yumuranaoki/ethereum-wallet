//elliptic、js-sha3をimport
var EC = require('elliptic').ec;
var keccak256 = require('js-sha3').keccak256;
var ec = new EC('secp256k1');

/*
全体をwallet classのプロパティやメソッドになるように実装する
function Wallet() {
    this.privateKey = null;
    this.publicKey = null;
    this.address = null; 
}

Wallet.prototype.generatePrivateKey = function() {

}

Wallet.prototype.generatePublicKey = function() {

}

Wallet.prototype.generateAddress = function() {

}
*/

//javascriptのfuncを作成して256bitのprivate keyを作成
var privateKey = '';
(function() {
    var c = "abcdefABCDEF0123456789";
    var cl = c.length;
    for(var i=0; i<64; i++){
        privateKey += c[Math.floor(Math.random()*cl)];
    }
    privateKey = "0x" + privateKey;
})();

//ellipticのECにfromPrivateメソッドから256ビットのpublic key作成
var publicKey = ec.keyFromPrivate(privateKey, 'hex').pub;

//public keyをKeccak256に通して128ビットを得る
var keccak256Pub = keccak256(publicKey);

//最初の12バイトを消し20バイトにして0xをprefixとし、アドレスになる
var address = '0x' + keccak256Pub.slice(24);