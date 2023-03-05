import { AbstractConnector } from '@web3-react/abstract-connector'
import { ChainId, JSBI, Percent, WETH, DEZU, WBNB, WBTC, USDC, USDT, ZONU, Token, Currency } from '@zonudex/dexswapsdk'
import { authereum, injected, walletConnect } from '../connectors'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}


// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.MAINNET]: [
    WETH[ChainId.MAINNET],
  ],
  [ChainId.MANTLE_TESTNET]: [
    WETH[ChainId.MANTLE_TESTNET],
    DEZU[ChainId.MANTLE_TESTNET],
    USDC[ChainId.MANTLE_TESTNET],
    WBTC[ChainId.MANTLE_TESTNET],
    WBNB[ChainId.MANTLE_TESTNET],
    ZONU[ChainId.MANTLE_TESTNET],
    USDT[ChainId.MANTLE_TESTNET]
  ],
  [ChainId.MUMBAI]: [
    WETH[ChainId.MUMBAI],
    DEZU[ChainId.MUMBAI],
    USDC[ChainId.MUMBAI],
    WBTC[ChainId.MUMBAI],
    WBNB[ChainId.MUMBAI],
    ZONU[ChainId.MUMBAI],
    USDT[ChainId.MUMBAI]
  ],
  [ChainId.HYPERSPACE]: [
    WETH[ChainId.HYPERSPACE],
    DEZU[ChainId.HYPERSPACE],
    USDC[ChainId.HYPERSPACE],
    WBTC[ChainId.HYPERSPACE],
    WBNB[ChainId.HYPERSPACE],
    ZONU[ChainId.HYPERSPACE],
    USDT[ChainId.HYPERSPACE]
  ]
}

// used for display in the default list when adding liquidity (native currency is already shown
// by default, so no need to add the wrapper to the list)
export const SUGGESTED_BASES: ChainTokenList = {
  [ChainId.MAINNET]: [USDC[ChainId.MAINNET], USDT[ChainId.MAINNET], WBTC[ChainId.MAINNET]],
  [ChainId.MANTLE_TESTNET]: [
    DEZU[ChainId.MANTLE_TESTNET], 
    USDC[ChainId.MANTLE_TESTNET], 
    USDT[ChainId.MANTLE_TESTNET], 
    WBTC[ChainId.MANTLE_TESTNET],
    ZONU[ChainId.MANTLE_TESTNET],
    WBNB[ChainId.MANTLE_TESTNET]
  ],
  [ChainId.MUMBAI]: [
    DEZU[ChainId.MUMBAI], 
    USDC[ChainId.MUMBAI], 
    USDT[ChainId.MUMBAI], 
    WBTC[ChainId.MUMBAI],
    WBTC[ChainId.MUMBAI],
    ZONU[ChainId.MUMBAI],
    WBNB[ChainId.MUMBAI]
  ],
  [ChainId.HYPERSPACE]: [
    DEZU[ChainId.HYPERSPACE], 
    USDC[ChainId.HYPERSPACE], 
    USDT[ChainId.HYPERSPACE], 
    WBTC[ChainId.HYPERSPACE],
    WBTC[ChainId.HYPERSPACE],
    ZONU[ChainId.HYPERSPACE],
    WBNB[ChainId.HYPERSPACE]
  ],

}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET], USDC[ChainId.MAINNET], USDT[ChainId.MAINNET]],
  [ChainId.MANTLE_TESTNET]: [    
    DEZU[ChainId.MANTLE_TESTNET], 
    USDC[ChainId.MANTLE_TESTNET], 
    USDT[ChainId.MANTLE_TESTNET], 
    WBTC[ChainId.MANTLE_TESTNET],
    ZONU[ChainId.MANTLE_TESTNET],
    WBNB[ChainId.MANTLE_TESTNET]
  ],
  [ChainId.MUMBAI]: [    
    DEZU[ChainId.MUMBAI], 
    USDC[ChainId.MUMBAI], 
    USDT[ChainId.MUMBAI], 
    WBTC[ChainId.MUMBAI],
    ZONU[ChainId.MUMBAI],
    WBNB[ChainId.MUMBAI]
  ],
  [ChainId.HYPERSPACE]: [    
    DEZU[ChainId.HYPERSPACE], 
    USDC[ChainId.HYPERSPACE], 
    USDT[ChainId.HYPERSPACE], 
    WBTC[ChainId.HYPERSPACE],
    ZONU[ChainId.HYPERSPACE],
    WBNB[ChainId.HYPERSPACE]
  ],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [USDC[ChainId.MAINNET], USDT[ChainId.MAINNET]],
  ],
  [ChainId.MANTLE_TESTNET]: [    
    [USDC[ChainId.MANTLE_TESTNET], USDT[ChainId.MANTLE_TESTNET]],
    [DEZU[ChainId.MANTLE_TESTNET], WBTC[ChainId.MANTLE_TESTNET]],
  ],
  [ChainId.MUMBAI]: [    
    [USDC[ChainId.MUMBAI], USDT[ChainId.MUMBAI]],
    [DEZU[ChainId.MUMBAI], WBTC[ChainId.MUMBAI]],
    [ZONU[ChainId.MUMBAI], WBTC[ChainId.MUMBAI]],
  ],
  [ChainId.HYPERSPACE]: [    
    [USDC[ChainId.HYPERSPACE], USDT[ChainId.HYPERSPACE]],
    [DEZU[ChainId.HYPERSPACE], WBTC[ChainId.HYPERSPACE]],
    [ZONU[ChainId.HYPERSPACE], WBTC[ChainId.HYPERSPACE]],
  ],
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  WALLET_CONNECT: {
    connector: walletConnect,
    name: 'WalletConnect',
    iconName: 'wallet-connect.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true
  },
  AUTHEREUM: {
    connector: authereum,
    name: 'Authereum',
    iconName: 'authereum.svg',
    description: 'Connect using Authereum.',
    href: null,
    color: '#4196FC',
    mobile: true
  }
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20
export const DEFAULT_USER_MULTIHOP_ENABLED = true

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH

export const DEFAULT_TOKEN_LIST = 'https://raw.githubusercontent.com/Agin-DropDisco/dexswapcore/main/DexSwapTokenList.json'

interface NetworkDetails {
  chainId: string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
  iconUrls?: string[] // Currently ignored.
  metamaskAddable?: boolean
}

export const NETWORK_DETAIL: { [chainId: number]: NetworkDetails } = {
  [ChainId.MAINNET]: {
    chainId: `0x${ChainId.MAINNET.toString(16)}`,
    chainName: 'Ethereum Main Net',
    nativeCurrency: {
      name: Currency.ETHER.name || 'Ether',
      symbol: Currency.ETHER.symbol || 'ETH',
      decimals: Currency.ETHER.decimals || 18
    },
    rpcUrls: ['https://mainnet.infura.io/v3'],
    blockExplorerUrls: ['https://etherscan.io']
  },
  [ChainId.MANTLE_TESTNET]: {
    chainId: `0x${ChainId.MANTLE_TESTNET.toString(16)}`,
    chainName: 'MANTLE',
    nativeCurrency: {
      name: Currency.BIT.name || 'BIT',
      symbol: Currency.BIT.symbol || 'BIT',
      decimals: Currency.BIT.decimals || 18
    },
    rpcUrls: ['https://rpc.testnet.mantle.xyz'],
    blockExplorerUrls: ['https://explorer.testnet.mantle.xyz'],
    metamaskAddable: true
  },
  [ChainId.MUMBAI]: {
    chainId: `0x${ChainId.MUMBAI.toString(16)}`,
    chainName: 'MUMBAI',
    nativeCurrency: {
      name: Currency.MATIC.name || 'MATIC',
      symbol: Currency.MATIC.symbol || 'MATIC',
      decimals: Currency.MATIC.decimals || 18
    },
    rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
    metamaskAddable: true
  },
  [ChainId.HYPERSPACE]: {
    chainId: `0x${ChainId.MUMBAI.toString(16)}`,
    chainName: 'HYPERSPACE',
    nativeCurrency: {
      name: Currency.TFIL.name || 'TFIL',
      symbol: Currency.TFIL.symbol || 'TFIL',
      decimals: Currency.TFIL.decimals || 18
    },
    rpcUrls: ['https://api.hyperspace.node.glif.io/rpc/v1'],
    blockExplorerUrls: ['https://hyperspace.filfox.info/en'],
    metamaskAddable: true
  },
  
}
