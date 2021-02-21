import { makeVar } from '@apollo/client'

export const buyModalVar = makeVar<'nft' | 'shares' | undefined>(undefined)
