import { ChainId, Currency,  USDC, USDT, WBTC, WBNB } from '@zonudex/dexswapsdk'
export const MainPage = 'Governance Main Page'
export const PairPage = 'Governance Pair Page'

export const temporaryCurrencyData: Array<Currency> = [
  USDC[ChainId.MAINNET],
  USDT[ChainId.MAINNET],
  WBTC[ChainId.MAINNET],
  USDC[ChainId.MANTLE_TESTNET],
  WBNB[ChainId.MANTLE_TESTNET],
  USDT[ChainId.MANTLE_TESTNET],
  WBTC[ChainId.MANTLE_TESTNET],
  USDC[ChainId.MUMBAI],
  WBNB[ChainId.MUMBAI],
  USDT[ChainId.MUMBAI],
  WBTC[ChainId.MUMBAI],
  USDC[ChainId.HYPERSPACE],
  WBNB[ChainId.HYPERSPACE],
  USDT[ChainId.HYPERSPACE],
  WBTC[ChainId.HYPERSPACE]
]
