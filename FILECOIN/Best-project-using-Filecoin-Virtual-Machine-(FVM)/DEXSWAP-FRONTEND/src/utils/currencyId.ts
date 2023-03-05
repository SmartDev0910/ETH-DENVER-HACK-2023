import { Currency, Token } from '@zonudex/dexswapsdk'

export function currencyId(currency: Currency): string {
  if (Currency.isNative(currency)) return currency.symbol || ''
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
