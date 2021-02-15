// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { WalletButton } from '../../../components/wallet/WalletButton'

export default {
  title: 'components/wallet/WalletButton.tsx',
  component: WalletButton
} as Meta

const Template: Story = args => (
  <div
    style={{
      maxWidth: '200px'
    }}>
    <WalletButton {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {}