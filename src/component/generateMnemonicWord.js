import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { walletContext } from '../index';

const StyledButton = styled.button`
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    border-radius: 3px;
    border: 0;
    color: white;
    font-size: 1.2em;
    height: 48px;
    padding: 0 30px;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
    margin: 10px;
    &:hover {
        background: rgba(233, 76, 27, 0.61);
    }
`;

class GenerateMnemonicWord extends Component {
    render() {
        return(
            <walletContext.Consumer>
                {({generateMnemonicWord}) => (
                    <StyledButton onClick={generateMnemonicWord}>
                        generate mnemonic word
                    </StyledButton>
                )}
            </walletContext.Consumer>
        );
    }
}

export default GenerateMnemonicWord;
