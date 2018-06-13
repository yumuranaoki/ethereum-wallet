import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Wallet from '../wallet/index';

class CreateWallet extends Component {
    constructor(props) {
        super(props);
    }

    generateWallet() {
        const wallet = new Wallet();
        wallet.generatePrivateKey();
        wallet.generatePublicKey();
        wallet.generateAddress();
        wallet.setTransaction();
        wallet.setSignedTransaction();
        console.log(wallet.privateKey)
        wallet.sendRawTransaction();
    }

    render() {
        return(
            <div>
                <Button
                    variant="contained"
                    color='secondary'
                    onClick={() => this.generateWallet()}
                >
                    CREATE ADDRESS
                </Button>
            </div>
        );
    }
}

export default CreateWallet;