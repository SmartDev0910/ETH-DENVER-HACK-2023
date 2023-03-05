const HDWalletProvider = require('@truffle/hdwallet-provider')
const dotenv = require('dotenv')
dotenv.config()

const MNEMONIC = process.env.MNEMONIC
console.log('MNEMONIC:', MNEMONIC)

module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`),
      network_id: 4,
      gas: 0,
      gasPrice: 2100000001, //2 Gwei,
      skipDryRun: true
    },
    mumbai: {
      provider: () => new HDWalletProvider(MNEMONIC, "https://matic-mumbai.chainstacklabs.com"),
      network_id: 80001,
      gas: 0,
      gasPrice: 2100000001, //2 Gwei,
      skipDryRun: true
    },
    mantleTestnet: {
      provider: () => new HDWalletProvider(MNEMONIC, "https://rpc.testnet.mantle.xyz"),
      network_id: 5001,
      skipDryRun: true
    },
    chiadoTestnet: {
      provider: () => new HDWalletProvider(MNEMONIC, "https://rpc.chiadochain.net"),
      network_id: 10200,
      skipDryRun: true
    },
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  },
  contracts_directory: './contracts/',
  contracts_build_directory: './abis/',
  compilers: {
    solc: {
      version: '0.8.7',
      settings: {
        evmVersion: 'istanbul',
      }
    }
  },

  mocha: {
    // timeout: 100000
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
}
