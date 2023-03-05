import React from 'react'
import styled from 'styled-components/macro'
import { darken, lighten, transparentize } from 'polished'

import { RowBetween } from '../Row'
import { ChevronDown } from 'react-feather'
import { Button as RebassButton, ButtonProps } from 'rebass/styled-components'
import border8pxRadius from '../../assets/images/border-8px-radius.png'
import { Text } from 'rebass'

const Base = styled(RebassButton)<{
  padding?: string
  width?: string
  borderRadius?: string
  altDisabledStyle?: boolean
}>`
  padding: ${({ padding }) => (padding ? padding : '18px')};
  width: ${({ width }) => (width ? width : '100%')};
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: center;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '12px')};
  outline: none;
  border: none;
  color: ${({ theme }) => theme.white};
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  &:disabled {
    cursor: auto;
    font-weight: 700;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-align: center;
  }

  > * {
    user-select: none;
  }
`

export const ButtonPrimary = styled(Base)`
  background-color: ${({ theme }) => theme.primary1};
  color: ${({ theme }) => theme.white};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.primary1)};
  }
  &:active {
    background-color: ${({ theme }) => darken(0.1, theme.primary1)};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.purple5};
    color: ${({ theme }) => transparentize(0.28, theme.purpleBase)};
    cursor: not-allowed;
    box-shadow: none;
    outline: none;
    opacity: ${({ altDisabledStyle }) => (altDisabledStyle ? '0.7' : '1')};
  }
`

export const ButtonPrimary1 = styled(Base)`
  color: ${({ theme }) => theme.white};
  background: linear-gradient(134deg , #cc4508 0%,#1d202f 100%);
  box-shadow: -3.40642px -3.40642px 20.4385px #462727, 3.40642px 3.40642px 22.92px rgb(0 0 0 / 65%);
  border: 0;
  border-radius: 25px;
  transition: background all 420ms cubic-bezier(0.165, 0.84, 0.44, 1);
  &:hover {
    background: linear-gradient(134deg , #cc4508 0%,#1d202f 100%);
    box-shadow: none;
  }
  
  &:active {
    background: linear-gradient(134deg , #ffffff 0%, #1d202f 100%);
    box-shadow: none;
  }

  &:disabled {
    background: ${({ theme }) => theme.purple5};
    color: ${({ theme }) => transparentize(0.28, theme.purpleBase)};
    cursor: not-allowed;
    box-shadow: none;
    outline: none;
    border: none;
    opacity: ${({ altDisabledStyle }) => (altDisabledStyle ? '0.7' : '1')};
  }
`

export const ButtonSecondary = styled(Base)`
  border: 1px solid ${({ theme }) => theme.text5};
  color: ${({ theme }) => theme.text5};
  background-color: transparent;
  font-size: 16px;
  padding: ${({ padding }) => (padding ? padding : '10px')};

  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
  a:hover {
    text-decoration: none;
  }
`

export const ButtonGrey = styled(Base)`
  border: 1px solid #252237;
  background: radial-gradient(147.37% 164.97% at 50% 0%, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0) 100%), #1f1d2c;
  background-blend-mode: overlay, normal;
  color: ${({ theme }) => theme.text5};
  font-size: 16px;
  padding: ${({ padding }) => (padding ? padding : '10px')};

  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
  a:hover {
    text-decoration: none;
  }
`

export const ButtonInvisbile = styled.button`
  border: none;
  outline: none;
  background: transparent;
`

export const ButtonDark = styled(Base)`
  border: 1px solid #252237;
  background-color: #171621;
  color: ${({ theme }) => theme.text5};
  font-size: 16px;
  padding: ${({ padding }) => (padding ? padding : '10px')};

  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
  a:hover {
    text-decoration: none;
  }
`
export const ButtonDark2 = styled(Base)`
  box-shadow: rgb(15 10 12) -8px 8px 16px 0px, rgb(255 255 255 / 8%) 8px -8px 16px 0px;
  box-sizing: border-box;
  color: #b0aade;
  font-size: 16px;
  padding: ${({ padding }) => (padding ? padding : '10px')};

  &:disabled {
    opacity: 50%;
    cursor: auto;
    
  }
  a:hover {
    text-decoration: none;
  }
`

export const ButtonOutlined = styled(Base)`
  border: 8px solid;
  border-image: url(${border8pxRadius}) 8;
  background-color: ${({ theme }) => transparentize(0.28, theme.purpleBase)};
  color: ${({ theme }) => theme.text1};
  text-transform: initial;
  cursor: pointer;
  &:disabled {
    opacity: 50%;
    cursor: not-allowed;
  }
`

export const ButtonEmpty = styled(Base)`
  background-color: transparent;
  color: ${({ theme }) => theme.primary1};
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    text-decoration: underline;
  }
  &:hover {
    text-decoration: underline;
  }
  &:active {
    text-decoration: underline;
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`

export const ButtonWhite = styled(Base)`
  border: 1px solid #edeef2;
  background-color: ${({ theme }) => theme.bg1};
  color: black;

  &:focus {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    box-shadow: 0 0 0 1pt ${darken(0.05, '#edeef2')};
  }
  &:hover {
    box-shadow: 0 0 0 1pt ${darken(0.1, '#edeef2')};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${darken(0.1, '#edeef2')};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`

const ButtonConfirmedStyle = styled(Base)`
  background-color: ${({ theme }) => lighten(0.5, theme.green1)};
  color: ${({ theme }) => theme.green1};
  border: 1px solid ${({ theme }) => theme.green1};

  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`

const ButtonErrorStyle = styled(Base)`
  background-color: ${({ theme }) => theme.red1};
  
  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.red1)};
    background-color: ${({ theme }) => darken(0.05, theme.red1)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.red1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.red1)};
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
    box-shadow: none;
    background-color: ${({ theme }) => theme.red1};
  }
`

export function ButtonConfirmed({
  confirmed,
  altDisabledStyle,
  ...rest
}: { confirmed?: boolean; altDisabledStyle?: boolean } & ButtonProps) {
  if (confirmed) {
    return <ButtonConfirmedStyle {...rest} />
  } else {
    return <ButtonPrimary {...rest} altDisabledStyle={altDisabledStyle} />
  }
}

export function ButtonError({ error, ...rest }: { error?: boolean } & ButtonProps) {
  if (error) {
    return <ButtonErrorStyle {...rest} />
  } else {
    return <ButtonPrimary {...rest} />
  }
}

export function ButtonWithLink({ link, text, marginTop }: { link: string; text: string; marginTop?: string }) {
  return (
    <ButtonSecondary
      id="join-pool-button"
      as="a"
      style={{ marginTop: marginTop ? marginTop : '0', padding: '10px 0px', borderRadius: '8px', color: 'white', margin: '6px'}}
      href={link}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Text fontWeight={700} fontSize={12} lineHeight="15px">
        {text} <span style={{ fontSize: '11px', marginLeft: '4px' }}>↗</span>
      </Text>
    </ButtonSecondary>
  )
}

export function ButtonDropdown({ disabled = false, children, ...rest }: { disabled?: boolean } & ButtonProps) {
  return (
    <ButtonPrimary {...rest} disabled={disabled}>
      <RowBetween>
        <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
        <ChevronDown size={24} />
      </RowBetween>
    </ButtonPrimary>
  )
}

const StyledChevronDown = styled(ChevronDown)`
  color: ${({ theme }) => theme.text5};
`

export function ButtonDropdownLight({ disabled = false, children, ...rest }: { disabled?: boolean } & ButtonProps) {
  return (
    <ButtonOutlined {...rest} disabled={disabled}>
      <RowBetween>
        <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
        <StyledChevronDown size={20} />
      </RowBetween>
    </ButtonOutlined>
  )
}
