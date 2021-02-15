// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { PortfolioHeader, PortfolioHeaderProps } from '../../../components/portfolio/PortfolioHeader'

export default {
  title: 'components/portfolio/PortfolioHeader.tsx',
  component: PortfolioHeader,
  argTypes: {}
} as Meta

const Template: Story<PortfolioHeaderProps> = args => <PortfolioHeader {...args} />

export const Default = Template.bind({})
Default.args = {
  totalValue: '3,861.72'
}
