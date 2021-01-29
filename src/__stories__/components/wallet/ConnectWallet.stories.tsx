// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { ConnectWallet } from '../../../components/Wallet/ConnectWallet'

export default {
  title: 'components/Wallet/ConnectWallet.tsx',
  component: ConnectWallet
} as Meta

const Template: Story = args => <ConnectWallet {...args} />

export const Default = Template.bind({})
Default.args = {}
