import { useState, useLayoutEffect } from 'react'
import { shade } from 'polished'
import Vibrant from 'node-vibrant'
import { hex } from 'wcag-contrast'
import { Token, ChainId } from '@zonudex/dexswapsdk'

async function getColorFromToken(token: Token): Promise<string | null> {
  if (token.chainId === ChainId.MANTLE_TESTNET && token.address === '0xc75aE86d9F9d8C150b4bFf9A8Fb77481B0611a56') { //usdt
    return Promise.resolve('#FAAB14')
  }

  const path = `https://raw.githubusercontent.com/Agin-DropDisco/assets/master/blockchains/mantle/assets/${token.address}/logo.png`

  return Vibrant.from(path)
    .getPalette()
    .then(palette => {
      if (palette?.Vibrant) {
        let detectedHex = palette.Vibrant.hex
        let AAscore = hex(detectedHex, '#FFF')
        while (AAscore < 3) {
          detectedHex = shade(0.005, detectedHex)
          AAscore = hex(detectedHex, '#FFF')
        }
        return detectedHex
      }
      return null
    })
    .catch(() => null)
}

export function useColor(token?: Token) {
  const [color, setColor] = useState('#2172E5')

  useLayoutEffect(() => {
    let stale = false

    if (token) {
      getColorFromToken(token).then(tokenColor => {
        if (!stale && tokenColor !== null) {
          setColor(tokenColor)
        }
      })
    }

    return () => {
      stale = true
      setColor('#2172E5')
    }
  }, [token])

  return color
}
