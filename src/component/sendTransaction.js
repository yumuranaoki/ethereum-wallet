import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import cyan from '@material-ui/core/colors/cyan';
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

const TextFields = styled.div`
    float: left;
    line-height: 48px;
    margin: 10px
`;

const Wrap = styled.div`
    overflow: hidden;
`;

class SendTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toAddress: '',
      value: '',
      gasLimit: 21000,
      gasPrice: 4000000000,
      chainId: 3, // あとで選択可能に
      result: '',
    };
  }

  handleChange(event, type) {
    switch (type) {
      case 'toAddress':
        this.setState({ toAddress: event.target.value });
        break;
      case 'value':
        this.setState({ value: event.target.value });
        break;
      case 'gasPrice':
        this.setState({ gasPrice: event.target.value });
        break;
      case 'gasLimit':
        this.setState({ gasLimit: event.target.value });
        break;
      default:
        break;
    }
  }

  sendTransaction(balance, wallet) {
    if (wallet.privateKey
      && balance * 1000000000000000000 >=
      this.state.value + (this.state.gasPrice * this.state.gasLimit)
    ) {
      const txParams = {
        gasLimit: this.state.gasLimit,
        gasPrice: this.state.gasPrice,
        toAddress: this.state.toAddress,
        value: this.state.value,
        chainId: this.state.chainId,
      };
      wallet.sendRawTransaction(txParams);
    }
  }

  render() {
    const styles = {
      wrap: {
        overflow: 'hidden',
      },
      inline: {
        float: 'left',
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10,
      },
      forSmall: {
        marginTop: 10,
      },
      button: {
        backgroundColor: cyan[200],
        color: 'white',
        borderColor: cyan[300],
        ':hover': {
          backgroundColor: cyan[700],
        },
      },
    };

    return (
      <walletContext.Consumer>
        {({ balance, wallet }) => (
          <Wrap>
            <TextFields>
              <TextField
                label="to address"
                value={this.state.toAddress}
                onChange={event => this.handleChange(event, 'toAddress')}
              />
            </TextFields>
            <TextFields>
              <TextField
                label="value"
                value={this.state.value}
                onChange={event => this.handleChange(event, 'value')}
              />
            </TextFields>
            <TextFields>
              <TextField
                label="gas price"
                value={this.state.gasPrice}
                onChange={event => this.handleChange(event, 'gasPrice')}
              />
            </TextFields>
            <TextFields>
              <TextField
                label="gas limit"
                value={this.state.gasLimit}
                onChange={event => this.handleChange(event, 'gasLimit')}
              />
            </TextFields>
            <StyledButton
              onClick={() => this.sendTransaction(balance, wallet)}
            >
              send transaction
            </StyledButton>
            <TextFields>
              result: {this.state.result}
            </TextFields>
          </Wrap>
        )}
      </walletContext.Consumer>
    );
  }
}

export default SendTransaction;
