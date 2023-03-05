import { ChainId } from '@zonudex/dexswapsdk'
import MULTICALL_ABI from './abi.json'

// TODO: Add the missing networks here
// @ts-ignore
const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.MANTLE_TESTNET]: '0xA8fD29EbbfbC21bc274FedE5Aa5C5D3cedc43f2C',
  [ChainId.MUMBAI]: '0x016781F588Cb50234f12b6A6EeA8a36b0BCe2f37',
  [ChainId.HYPERSPACE]: '0x65C048F785Ac27D17Ea1F6433A8bc47f2F36b7aE',
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
