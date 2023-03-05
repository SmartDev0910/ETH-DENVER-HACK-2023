import React from 'react'
import styled from 'styled-components/macro'
import logoImage from '../../assets/svg/dexs.svg'
import { version } from '../../../package.json'


const Logo = styled.img.attrs({ src: logoImage })`
  height: 31px;
`

const RelativeContainer = styled.div`
  position: relative;
`

const Badge = styled.div`
  position: absolute;
  bottom: -4px;
  right: -11px;
  padding: 2px 3px;
  border-radius: 4px;
  font-size: 8px;
  font-weight: bold;
  -webkit-letter-spacing: 0.16em;
  -moz-letter-spacing: 0.16em;
  -ms-letter-spacing: 0.16em;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #f3f8f9;
  transition: all 0.2s ease 0s;
  border: 0.5px solid rgb(249 102 64);
  background-color: rgb(10 235 252 / 7%) !important;
  box-shadow: #ff5722 2px 4px 80px !important;
`

function DexswapVersionLogo() {
  return (
    <RelativeContainer>
      <Logo />
      <Badge>{version}</Badge>
    </RelativeContainer>
  )
}

export default DexswapVersionLogo
