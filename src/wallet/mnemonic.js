import bip39 from 'bip39';

export const generateMnemonicWord = () => bip39.generateMnemonic(null, null, bip39.wordlists.japanese);

export const fromSeed = (mnemonicWord, passphrase) => {
    const seed = bip39.mnemonicToSeed(mnemonicWord, passphrase);
    const privateKey = seed.slice(0, 32);
    const chainCode = seed.slice(32);
    return [privateKey, chainCode];
}
