import { Currency, Percent, Price } from '@uniswap/sdk'
import React, { useContext } from 'react'
import { Text } from 'rebass'
import { ThemeContext } from 'styled-components'
import { AutoColumn } from '../Column'
import { AutoRow } from '../Row'
import { ONE_BIPS } from '../constants'
import { MintField } from '../../../util/types'
import { TYPE } from '../theme'

export function PoolPriceBar({
  currencies,
  noLiquidity,
  poolTokenPercentage,
  price
}: {
  currencies: { [field in MintField]?: Currency }
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  price?: Price
}) {
  const theme = useContext(ThemeContext)
  return (
    <AutoColumn gap="md">
      <AutoRow justify="space-around" gap="4px">
        <AutoColumn justify="center">
          <TYPE.black>{price?.toSignificant(6) ?? '-'}</TYPE.black>
          <Text fontWeight={500} fontSize={14} color={theme.text2} pt={1}>
            {currencies[MintField.CURRENCY_B]?.symbol} per {currencies[MintField.CURRENCY_A]?.symbol}
          </Text>
        </AutoColumn>
        <AutoColumn justify="center">
          <TYPE.black>{price?.invert()?.toSignificant(6) ?? '-'}</TYPE.black>
          <Text fontWeight={500} fontSize={14} color={theme.text2} pt={1}>
            {currencies[MintField.CURRENCY_A]?.symbol} per {currencies[MintField.CURRENCY_B]?.symbol}
          </Text>
        </AutoColumn>
        <AutoColumn justify="center">
          <TYPE.black>
            {noLiquidity && price
              ? '100'
              : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
            %
          </TYPE.black>
          <Text fontWeight={500} fontSize={14} color={theme.text2} pt={1}>
            Share of Pool
          </Text>
        </AutoColumn>
      </AutoRow>
    </AutoColumn>
  )
}
