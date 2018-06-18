import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
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

class CreateWallet extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <walletContext.Consumer>
                {({wallet, generateWallet}) => (
                    <div>
                        <StyledButton
                            onClick={generateWallet}
                        >
                            creste address
                        </StyledButton>
                        address: {wallet.address}
                    </div>
                )}
            </walletContext.Consumer>
        );
    }
}

export default CreateWallet;
