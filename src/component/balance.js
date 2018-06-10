import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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
            "id":1
        }
        console.log(ethGetBalance);

        fetch('https://mainnet.infura.io/Y80MvxYEzKUddrYMy9Xj', {
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
            }
        }

        return(
            <div style={styles.wrap}>
                <TextField 
                    label="address"
                    value={this.state.address}
                    onChange={event => this.handleChange(event)}
                    style={styles.inline}
                />
                <Button
                    variant="outlined"
                    color='primary'
                    onClick={() => this.getBalance()}
                    style={styles.inline}
                >
                    get balance
                </Button>
                <Typography
                    variant="body2"
                    color="primary"
                    style={Object.assign({}, styles.inline, styles.forSmall)}
                >
                    balance of address: {this.state.balance} ETH
                </Typography>
            </div>
        );
    }
}

export default Balance;