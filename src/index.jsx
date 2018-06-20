import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import Typography from '@material-ui/core/Typography';
import Context from './context';
import Balance from './component/balance';
import CreateAddress from './component/createAddress';
import SendTransaction from './component/sendTransaction';
import MnemonicWordModal from './wallet/mnemonicWordModal';
import GenerateMnemonicWord from './component/generateMnemonicWord';

export const walletContext = createContext();

// context api用のclass作成して、そこから継承
class App extends Context {
  render() {
    return (
      <walletContext.Provider value={this.state}>
        <div>
          <Typography variant="display3">
                        Ethereum wallet
          </Typography>
          <GenerateMnemonicWord />
          <CreateAddress />
          <Balance />
          <SendTransaction />
          <MnemonicWordModal />
        </div>
      </walletContext.Provider>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
