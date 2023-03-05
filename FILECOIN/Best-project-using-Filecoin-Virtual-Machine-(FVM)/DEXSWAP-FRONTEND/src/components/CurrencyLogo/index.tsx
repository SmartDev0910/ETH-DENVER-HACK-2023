import { ChainId, Currency, Token, DEZU } from '@zonudex/dexswapsdk'
import React, { ReactNode, useMemo } from 'react'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components/macro'


import EthereumLogo from '../../assets/images/ethereum-logo.jpg'
import MaticLogo from '../../assets/images/matic-token.png'
import DezuLogo from '../../assets/images/dezu.png'
import MantleLogo from '../../assets/images/mantle_logo.jpg'
import FilecoinLogo from '../../assets/images/filecoinLogo.png'
import { useActiveWeb3React } from '../../hooks'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/wrapped-token-info'
import Logo from '../Logo'

const getTokenLogoURL = (address: string) =>
  `https://raw.githubusercontent.com/Agin-DropDisco/assets/dexswap/blockchains/mantle/assets/${address}/logo.png`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  position: absolute;
  top: 0px;
  bottom: 0;
  margin-left: -4px
  left: 0;
  right: 0;
  background: #2e2d43ab;
`

const Wrapper = styled.div<{ size: string; marginRight: number; marginLeft: number; loading?: boolean }>`
  margin-right: ${({ marginRight }) => marginRight}px;
  margin-left: ${({ marginLeft }) => marginLeft}px;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${({size}) => `width: calc(${size} - 1px)`};
    ${({size}) => `height: calc(${size} - 1px)`};
    background-color: ${props => (props.loading ? 'transparent' : props.theme.white)};
    border-radius: 50%;
    z-index: -1;
  }
`

const NATIVE_CURRENCY_LOGO: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: EthereumLogo,
  [ChainId.MANTLE_TESTNET]: MantleLogo,
  [ChainId.MUMBAI]: MaticLogo,
  [ChainId.HYPERSPACE]: FilecoinLogo,

}

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
  className,
  loading,
  marginRight = 0,
  marginLeft = 0
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
  className?: string
  loading?: boolean
  marginRight?: number
  marginLeft?: number
}) {
  const { chainId } = useActiveWeb3React()
  const nativeCurrencyLogo = NATIVE_CURRENCY_LOGO[(chainId as ChainId) || ChainId.HYPERSPACE]
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency && Currency.isNative(currency) && !!nativeCurrencyLogo) return [nativeCurrencyLogo]
    if (currency instanceof Token) {
      if (Token.isNativeWrapper(currency)) return [nativeCurrencyLogo]
      if (chainId && DEZU[chainId] && DEZU[chainId].address === currency.address) return [DezuLogo]
      return [getTokenLogoURL(currency.address), ...uriLocations]
    }
    return []
  }, [chainId, currency, nativeCurrencyLogo, uriLocations])

  if (loading)
    return (
      <Skeleton
        wrapper={({ children }: { children: ReactNode }) => (
          <Wrapper
            loading={loading}
            size={size}
            marginRight={marginRight}
            marginLeft={marginLeft}
            className={className}
          >
            {children}
          </Wrapper>
        )}
        circle
        width={size}
        height={size}
      />
    )
  return (
    <Wrapper size={size} marginRight={marginRight} marginLeft={marginLeft} className={className}>
      <StyledLogo
        size={size}
        defaultText={currency?.symbol || '?'}
        srcs={srcs}
        alt={`${currency?.symbol ?? 'token'} logo`}
        style={style}
      />
    </Wrapper>
  )
}
