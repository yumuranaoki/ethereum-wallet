import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Wallet from '../util/wallet';

class CreateAddress extends Component {
    constructor(props) {
        super(props);
    }

    generatePrivateKey() {
        const wallet = new Wallet();
        wallet.generatePrivateKey();
        console.log(wallet.privateKey); 
    }

    render() {
        return(
            <div>
                <Button
                    variant="contained"
                    color='secondary'
                    onClick={() => this.generatePrivateKey()}
                >
                    CREATE ADDRESS
                </Button>
            </div>
        );
    }
}

export default CreateAddress;