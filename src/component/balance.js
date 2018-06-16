import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import cyan from '@material-ui/core/colors/cyan';
import { walletContext } from '../index';

class Balance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            balance: ''
        }
    }

    handleChange(event) {
        this.setState({address: event.target.value})
    }

    getBalance() {
        const ethGetBalance = {
            "jsonrpc":"2.0",
            "method":"eth_getBalance",
            "params":[this.state.address, "latest"],
            "id":3
        }
        
        fetch('https://ropsten.infura.io/Y80MvxYEzKUddrYMy9Xj', {
            method: 'POST',
            body: JSON.stringify(ethGetBalance),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then(res => res.result)
        .then(result => parseInt(result, 16) / 1000000000000000000)
        .then(result => this.setState({balance: result}))
        .catch(err => console.log(error));
    }

    render() {
        const styles = {
            wrap: {
                overflow: 'hidden'
            },
            inline: {
                float: "left",
                marginRight: 10,
                marginBottom: 10
            },
            forSmall: {
                marginTop: 10
            },
            button: {
                backgroundColor: cyan[200],
                color: 'white',
                borderColor: cyan[300],
            }
        }

        return(
            <walletContext.Consumer>
                {({balance, getBalance}) => (
                    <div style={styles.wrap}>
                        <TextField 
                            label="address"
                            value={this.state.address}
                            onChange={event => this.handleChange(event)}
                            style={styles.inline}
                        />
                        <Button
                            variant="outlined"
                            onClick={getBalance}
                            style={Object.assign({}, styles.inline, styles.button)}
                        >
                            get balance
                        </Button>
                        <Typography
                            variant="body2"
                            color="primary"
                            style={Object.assign({}, styles.inline, styles.forSmall)}
                        >
                            balance of address: {balance} ETH
                        </Typography>
                    </div>
                )}
            </walletContext.Consumer>
        );
    }
}

export default Balance;