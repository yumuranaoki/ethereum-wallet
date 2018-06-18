import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { walletContext } from '../index';

//onClickに対するactionをcontextで作成して、modalOpenを操作
class GenerateMnemonicWord extends Component {
    render() {
        return(
            <walletContext.Consumer>
                {({generateMnemonicWord}) => (
                    <Button color="primary" onClick={generateMnemonicWord}>
                        generate mnemonic word
                    </Button>
                )}
            </walletContext.Consumer>
        );
    }
}

export default GenerateMnemonicWord;