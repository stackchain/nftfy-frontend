// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { HeaderPortfolio, HeaderPortfolioProps } from '../../../components/portfolio/headerPortfolio'

export default {
  title: 'components/portfolio/HeaderPortfolio.tsx',
  component: HeaderPortfolio,
  argTypes: {}
} as Meta

const Template: Story<HeaderPortfolioProps> = args => <HeaderPortfolio {...args} />

export const Default = Template.bind({})
Default.args = {
  totalValue: '3,861.72'
}
