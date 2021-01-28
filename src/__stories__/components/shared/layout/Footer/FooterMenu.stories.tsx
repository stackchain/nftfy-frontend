// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { FooterMenu } from '../../../../../components/shared/layout/Footer/FooterMenu'

export default {
  title: 'components/shared/Footer/FooterMenu.tsx',
  component: FooterMenu
} as Meta

const Template: Story = args => (
  <MemoryRouter>
    <FooterMenu {...args} />
  </MemoryRouter>
)

export const Default = Template.bind({})
Default.args = {}
