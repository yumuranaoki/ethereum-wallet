import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import Typography from '@material-ui/core/Typography';
import Context from './context';
import BlockNumber from './component/blockNumber';
import Balance from './component/balance';
import CreateAddress from './component/createAddress';
import SendTransaction from './component/sendTransaction';

export const walletContext = createContext();

//context api用のclass作成して、そこから継承
class App extends Context {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <walletContext.Provider value={this.state}>
                <div>
                    <Typography variant="display3">
                        Ethereum wallet
                    </Typography>
                    <BlockNumber />
                    <Balance />
                    <CreateAddress />
                    <SendTransaction />
                </div>
            </walletContext.Provider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);