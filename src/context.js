import React, { Component } from 'react';
import Wallet from './wallet/index';

class Context extends Component {
    constructor(props) {
        super(props);

        this.generateWallet = () => {
            const wallet = new Wallet();
            wallet.generatePrivateKey();
            wallet.generatePublicKey();
            wallet.generateAddress();
            this.setState({wallet: wallet});
        }

        this.getBalance = () => {
            if (this.state.wallet) {
                const ethGetBalance = {
                    "jsonrpc":"2.0",
                    "method":"eth_getBalance",
                    "params":[this.state.wallet.address, "latest"],
                    "id":3
                }
                
                fetch('https://ropsten.infura.io/Y80MvxYEzKUddrYMy9Xj', {
                    method: 'POST',
                    body: JSON.stringify(ethGetBalance),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
                .then(res => res.json())
                .then(res => res.result)
                .then(result => parseInt(result, 16) / 1000000000000000000)
                .then(result => this.setState({balance: result}))
                .catch(err => console.log(error));
            }
        }

        this.sendTransaction = () => {
            if (this.state.wallet) {
                console.log(this.state.wallet.address);
                this.state.wallet.sendRawTransaction();
            }　else {
                //有効なprivate keyがないと表示
            }
        }

        this.state = {
            wallet: {
                address: '',
            },
            balance: null,
            generateWallet: this.generateWallet,
            getBalance: this.getBalance,
            sendTransaction: this.sendTransaction,
        }
    }
}

export default Context;