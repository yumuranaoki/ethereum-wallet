import React, { Component } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { keccak256 } from 'js-sha3';
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

class SendERC20 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contractAddress: '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07',
      toAddress: '',
      value: '',
      gasLimit: 21000,
      gasPrice: 4000000000,
      chainId: 3, // あとで選択可能に
      balance: 0,
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

  // addressのbalanceを取得
  // sendTokenの中で呼ぶ場合は値をreturnしてawaitで呼ぶ
  async getBalanceOfToken(wallet) {
    // ここでtxParamsを定義してwalletのメソッドにパスする
    if (
      wallet.privateKey &&
      this.state.contractAddress.length > 0
    ) {
      const method = keccak256('balanceOf(address)').slice(0, 8);
      const address = '000000000000000000000000' + wallet.address.slice(2);
      const data = '0x' + method + address;
      const txParams = {
        to: this.state.contractAddress,
        data,
      };
      let result = await wallet.call(txParams);
      result = parseInt(result, 16);
      return result;
    }
  }

  async sendToken(balance, wallet) {
    // contractAddressがセットされているか確認
    // walletのaddressのbalanceを確認して、balanceがvalueより多いことを確認(walletのメソッドを作成)
    // data propertyを構築
    // 0x
    // transfer(address,uint256)のkeccak256の4byte
    // to(toAddress)を256bitに
    // tokens(value)を256bitに(0xはいらない)
    // txParamsを作成
    // sendRawTransaction(txParams)
    // resultを受ける
    const tokenBalance = await this.getBalanceOfToken(wallet);
    if (
      wallet.privateKey &&
      this.state.contractAddress.length > 0 &&
      balance * 1000000000000000000 >= this.state.gasPrice * this.state.gasLimit &&
      tokenBalance >= this.state.value
    ) {
      const method = keccak256('transfer(address,uint)').slice(0, 9);
      const toAddress = '000000000000000000000000' + this.state.toAddress.slice(2);
      // valueを16進数に変換して、32byteに
      const value = 
        ('0000000000000000000000000000000000000000000000000000000000000000' +
        (this.state.value * 1000000000000000000).toString(16)).slice(-64);
      const data = '0x' + method + toAddress + value;
      //txParamsにchainIdとかがいるかも
      const txParams = {
        to: this.state.contractAddress,
        gasLimit: this.state.gasLimit,
        gasPrice: this.state.gasPrice,
        data,
      };
      const result = await wallet.sendRawTransaction(txParams);
    }
  }

  render() {
    return (
      <walletContext.Consumer>
        {({ balance, wallet }) => (
          <Wrap>
            <TextFields>
              token {this.state.balance}
            </TextFields>
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
              onClick={() => this.sendToken(balance, wallet)}
            >
              send token
            </StyledButton>
            <button onClick={() => this.test(wallet)} />
          </Wrap>
        )}
      </walletContext.Consumer>
    );
  }
}

export default SendERC20;
