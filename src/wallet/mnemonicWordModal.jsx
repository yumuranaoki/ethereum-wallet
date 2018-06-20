import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { walletContext } from '../index';

function MnemonicWordModal() {
    return (
        <walletContext.Consumer>
            {({ modalOpen, wallet, closeModal, generateMnemonicWord }) => (
                <Dialog open={modalOpen}>
                    <DialogTitle>Mnemonic Word</DialogTitle>
                    {wallet.mnemonicWord}
                    <Button onClick={generateMnemonicWord}>reset</Button>
                    <Button onClick={closeModal}>close</Button>
                </Dialog>
            )}
        </walletContext.Consumer>
    );
}

export default MnemonicWordModal;
