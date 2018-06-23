import React, { Component } from 'react';
import Wallet from './wallet/index';

class Context extends Component {
    constructor(props) {
        super(props);

        this.generateMnemonicWord = () => {
            const wallet = new Wallet();
            wallet.generateMnemonicWord()
            this.setState({ wallet });
            this.setState({ modalOpen: true });
        };

        this.closeModal = () => {
            this.setState({ modalOpen: false });
        };

        this.generateWallet = () => {
            if (this.state.wallet.mnemonicWord) {
                const wallet = this.state.wallet;
                wallet.generatePrivateKey();
                wallet.generatePublicKey();
                wallet.generateAddress();
                this.setState({ wallet });
                this.getBalance();
            }
        };

        this.getBalance = () => {
            if (this.state.wallet.privateKey) {
                const ethGetBalance = {
                    "jsonrpc": "2.0",
                    "method": "eth_getBalance",
                    "params": [this.state.wallet.address, "latest"],
                    "id":3,
                };
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
                .then(result => this.setState({ balance: result }))
                .catch(err => console.log(error));
            }
        };

        // sendRawTransactionはsendRawTransaction.jsで処理

        this.state = {
            wallet: {
                address: '',
            },
            balance: null,
            modalOpen: false,            
            generateMnemonicWord: this.generateMnemonicWord,
            closeModal: this.closeModal,
            generateWallet: this.generateWallet,
            getBalance: this.getBalance,
        }
    }
}

export default Context;