import { InjectedConnector } from '@web3-react/injected-connector'
import { AuthereumConnector } from '@web3-react/authereum-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { CustomNetworkConnector } from './CustomNetworkConnector'
import { ChainId } from '@zonudex/dexswapsdk'
import { providers } from 'ethers'
import getLibrary from '../utils/getLibrary'

export const INFURA_PROJECT_ID = 'da9c85c80bd0432dad730f1d5fbfd70b'
// TODO:
export const network = new CustomNetworkConnector({
  urls: {
    [ChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
    [ChainId.MANTLE_TESTNET]: 'https://rpc.testnet.mantle.xyz',
    [ChainId.MUMBAI]: 'https://matic-mumbai.chainstacklabs.com',
    [ChainId.HYPERSPACE]: 'https://api.hyperspace.node.glif.io/rpc/v1',
  },
  defaultChainId: ChainId.MAINNET
})

export const injected = new InjectedConnector({
  supportedChainIds: [ChainId.MAINNET, ChainId.MANTLE_TESTNET, ChainId.MUMBAI, ChainId.HYPERSPACE]
})

// mainnet only
export const walletConnect = new WalletConnectConnector({
  rpc: {
    1: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000
})


// mainnet only
export const authereum = new AuthereumConnector({ chainId: 1 })

let networkLibrary: providers.Web3Provider | undefined
export function getNetworkLibrary(): providers.Web3Provider {
  return (networkLibrary = networkLibrary ?? getLibrary(network.provider))
}
