import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Typography from '@material-ui/core/Typography';
import BlockNumber from './component/blockNumber';
import Balance from './component/balance';
import CreateAddress from './component/createAddress';

class App extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <div>
                <Typography variant="display3">
                    Ethereum wallet
                </Typography>
                <BlockNumber />
                <Balance />
                <CreateAddress />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);