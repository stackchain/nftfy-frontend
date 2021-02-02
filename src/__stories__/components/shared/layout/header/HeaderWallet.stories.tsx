// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { HeaderWallet } from '../../../../../components/shared/layout/header/HeaderWallet'

export default {
  title: 'components/shared/layout/header/Wallet.tsx',
  component: HeaderWallet
} as Meta

const Template: Story = args => <HeaderWallet {...args} />

export const Default = Template.bind({})
