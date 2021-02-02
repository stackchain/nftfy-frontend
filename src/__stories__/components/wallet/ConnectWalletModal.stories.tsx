// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { ConnectWalletModal } from '../../../components/wallet/ConnectWalletModal'

export default {
  title: 'components/wallet/ConnectWalletModal.tsx',
  component: ConnectWalletModal
} as Meta

const Template: Story = args => <ConnectWalletModal {...args} />

export const Default = Template.bind({})
Default.args = {}
