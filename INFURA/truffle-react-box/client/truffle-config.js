const HDWalletProvider = require('@truffle/hdwallet-provider')
const dotenv = require('dotenv')
dotenv.config()

const mnemonic = process.env.MNEMONIC
const mnemonic_harmony = process.env.MNEMONIC_HARMONY
const pk_harmony = process.env.PK_HARMONY
const infura_api = process.env.INFURA_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

console.log('MNEMONIC:', mnemonic)
console.log('MNEMONIC_HARMONY:', mnemonic_harmony)
console.log('INFURA_API_KEY:', infura_api)
console.log('HARMONY_PK:', pk_harmony)
console.log('ETHERSCAN_API_KEY:', ETHERSCAN_API_KEY)

module.exports = {
  plugins: ['truffle-plugin-verify'],
  api_keys: {
    etherscan: ETHERSCAN_API_KEY,
  },
  networks: {
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infura_api}`),
      network_id: '4',
      gasPrice: 3100000000,
      skipDryRun: true,
    },
    mainnet: {
      provider: () => {
        if (!pk_harmony.trim()) {
          throw new Error('Please enter a private key with funds, you can use the default one')
        }
        return new HDWalletProvider({
          privateKeys: [pk_harmony],
          providerOrUrl: 'https://api.s0.t.hmny.io',
        })
      },
      network_id: 1666600000,
    },
    testnet: {
      provider: () => {
        if (!pk_harmony.trim()) {
          throw new Error('Please enter a private key with funds, you can use the default one')
        }
        return new HDWalletProvider({
          privateKeys: [pk_harmony],
          providerOrUrl: 'https://api.s0.b.hmny.io',
        })
      },
      network_id: 1666700000,
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://matic-mainnet.chainstacklabs.com`),
      network_id: 137,
      gas: 0,
      gasPrice: 2100000000, //2 Gwei,
      skipDryRun: true,
      confirmations: 2,
      timeoutBlocks: 200,
    },
    mumbai: {
      provider: () => new HDWalletProvider(mnemonic, "https://rpc-mumbai.maticvigil.com"),
      network_id: 80001,
      gas: 0,
      gasPrice: 2100000000, //2 Gwei,
      skipDryRun: true,
      confirmations: 2,
      timeoutBlocks: 200,
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: '0.8.7',
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  mocha: {
    timeout: 100000,
  },
}
