import React, { Component } from 'react';
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
    float: left;
    &:hover {
        background: rgba(233, 76, 27, 0.61);
    }
`;

const BalanceText = styled.div`
    float: left;
    line-height: 48px;
    margin: 10px
`;

const Wrap = styled.div`
    overflow: hidden;
`;

class Balance extends Component {
  render() {
    return (
      <walletContext.Consumer>
        {({ balance, getBalance }) => (
          <Wrap>
            <StyledButton
              onClick={getBalance}
            >
              get balance
            </StyledButton>
            <BalanceText>
              balance of address: {balance} ETH
            </BalanceText>
          </Wrap>
                )}
      </walletContext.Consumer>
    );
  }
}

export default Balance;
