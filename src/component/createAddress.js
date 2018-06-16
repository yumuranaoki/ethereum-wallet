import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { walletContext } from '../index';

class CreateWallet extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <walletContext.Consumer>
                {({generateWallet}) => (
                    <div>
                        <Button
                            variant="contained"
                            color='secondary'
                            onClick={generateWallet}
                        >
                            CREATE ADDRESS
                        </Button>
                    </div>
                )}
            </walletContext.Consumer>
        );
    }
}

export default CreateWallet;