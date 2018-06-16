import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ethBlockNumber } from '../jsonrpcAPI';

class BlockNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blockNumber: ''
        }
    }

    getBlockNumber() {
        fetch('https://mainnet.infura.io/Y80MvxYEzKUddrYMy9Xj', {
            method: 'POST',
            body: JSON.stringify(ethBlockNumber),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then(res => console.log(res))
        /*
        .then(res => res.result)
        .then(result => parseInt(result, 16))
        .then(result => this.setState({blockNumber: result}))
        */
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
                <Button
                    variant="contained"
                    color='primary'
                    onClick={() => this.getBlockNumber()}
                    style={styles.inline}
                >
                    get block number
                </Button>
                <Typography
                    variant="body2"
                    color="primary"
                    style={Object.assign({}, styles.inline, styles.forSmall)}
                >
                    number of blocks: {this.state.blockNumber}
                </Typography>
            </div>
        )
    }
}

export default BlockNumber;