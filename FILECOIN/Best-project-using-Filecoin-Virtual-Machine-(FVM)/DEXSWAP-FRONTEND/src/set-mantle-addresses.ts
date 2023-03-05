import { ChainId, FACTORY_ADDRESS, ROUTER_ADDRESS, DEXSWAP_TOKEN_LIST_ID } from '@zonudex/dexswapsdk'

if (!process.env.REACT_APP_HYPERSPACE_FACTORY_ADDRESS || !process.env.REACT_APP_HYPERSPACE_ROUTER_ADDRESS) {
  throw new Error('Mainnet factory address env is required')
}
FACTORY_ADDRESS[ChainId.HYPERSPACE] = process.env.REACT_APP_HYPERSPACE_FACTORY_ADDRESS
console.log('hyperspace factory address set to', process.env.REACT_APP_HYPERSPACE_FACTORY_ADDRESS)

ROUTER_ADDRESS[ChainId.HYPERSPACE] = process.env.REACT_APP_HYPERSPACE_ROUTER_ADDRESS
console.log('hyperspace router address set to', process.env.REACT_APP_HYPERSPACE_ROUTER_ADDRESS)
console.log('using hyperspace token list with id', DEXSWAP_TOKEN_LIST_ID[ChainId.HYPERSPACE])
