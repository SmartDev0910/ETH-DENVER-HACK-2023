const HDWalletProvider = require('@truffle/hdwallet-provider');
const dotenv = require('dotenv');
dotenv.config();

const mnemonic = process.env.MNEMONIC;


module.exports = {
  networks: {
    live: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "1", // Only mainnet
      gasPrice: "10000000000", // 10 gwei
      gas: "5000000", // 0.02 eth at 4 gwei price
    },
    scrollTestnet: {
      provider: () => new HDWalletProvider(mnemonic, "https://alpha-rpc.scroll.io/l2"),
      network_id: 534353,
    },
  },
  compilers: {
    solc: {
      version: "0.6.3",
      settings: {
        optimizer: {
            enabled: true,
            runs: 200
        },
        evmVersion: 'istanbul',
    },
    }
  },
};


