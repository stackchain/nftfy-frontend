// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { PortfolioContent, PortfolioContentProps } from '../../../components/portfolio/PortfolioContent'

export default {
  title: 'components/portfolio/PortfolioContent.tsx',
  component: PortfolioContent,
  argTypes: {}
} as Meta

const Template: Story<PortfolioContentProps> = args => <PortfolioContent {...args} />

export const Default = Template.bind({})
Default.args = {}