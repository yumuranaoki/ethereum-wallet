import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import cyan from '@material-ui/core/colors/cyan';
import { walletContext } from '../index';
import Wallet from '../wallet/index';

//SendTransaction用のContextを作成する
class SendTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toAddress: '',
            value: '',
            gasLimit: 21000,
            gasPrice: 4000000000,
            chainId: 3, //あとで選択可能に
            result: '',
        };
    }

    handleChange(event, type) {
        switch(type) {
            case 'toAddress':
                this.setState({toAddress: event.target.value})
                break;
            case 'value':    
                this.setState({value: event.target.value})
                break;
            case 'gasPrice': 
                this.setState({gasPrice: event.target.value})
                break;
            case 'gasLimit':
                this.setState({gasLimit: event.target.value})
                break;
        }
    }

    sendTransaction(balance, wallet) {
        if (wallet.privateKey && balance*1000000000000000000 >= this.state.value + this.state.gasPrice*this.state.gasLimit) {
            const txParams = {
                gasLimit: this.state.gasLimit,
                gasPrice: this.state.gasPrice,
                toAddress: this.state.toAddress,
                value: this.state.value,
                chainId: this.state.chainId,
            }
            wallet.sendRawTransaction(txParams);
        } else {
            
        }
    }

    render() {
        const styles = {
            wrap: {
                overflow: 'hidden'
            },
            inline: {
                float: "left",
                marginRight: 10,
                marginBottom: 10,
                marginTop: 10,
            },
            forSmall: {
                marginTop: 10
            },
            button: {
                backgroundColor: cyan[200],
                color: 'white',
                borderColor: cyan[300],
                ':hover': {
                    backgroundColor: cyan[700],
                },
            }
        }

        return(
            <walletContext.Consumer>
                {({balance, wallet}) => (
                    <div style={styles.wrap}>
                        <TextField 
                            label="to address"
                            value={this.state.toAddress}
                            onChange={event => this.handleChange(event, 'toAddress')}
                            style={styles.inline}
                        />
                        <TextField 
                            label="value"
                            value={this.state.value}
                            onChange={event => this.handleChange(event, 'value')}
                            style={styles.inline}
                        />
                        <TextField 
                            label="gas price"
                            value={this.state.gasPrice}
                            onChange={event => this.handleChange(event, 'gasPrice')}
                            style={styles.inline}
                        />
                        <TextField 
                            label="gas limit"
                            value={this.state.gasLimit}
                            onChange={event => this.handleChange(event, 'gasLimit')}
                            style={styles.inline}
                        />
                        <Button
                            variant="contained"
                            color='secondary'
                            onClick={() => this.sendTransaction(balance, wallet)}
                            style={Object.assign({}, styles.inline, styles.button)}
                        >
                            send transaction
                        </Button>
                        <Typography
                            variant="body2"
                            color="primary"
                            style={Object.assign({}, styles.inline, styles.forSmall)}
                        >
                            result: {this.state.result}
                        </Typography>
                    </div>
                )}
            </walletContext.Consumer>
        );
    }
}

export default SendTransaction;