import qs from 'query-string'

export const useWalletAddressMock = (): string | undefined => {
  const qsData = qs.parse(window.location.search) as { wallet?: string }
  return qsData.wallet
}
