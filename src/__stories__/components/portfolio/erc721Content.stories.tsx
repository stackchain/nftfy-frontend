// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Erc721Content, Erc721ContentPortfolioProps } from '../../../components/portfolio/erc721Content'

export default {
  title: 'components/portfolio/Erc721Content.tsx',
  component: Erc721Content,
  argTypes: {}
} as Meta

const Template: Story<Erc721ContentPortfolioProps> = args => <Erc721Content {...args} />

export const Default = Template.bind({})
Default.args = {}
