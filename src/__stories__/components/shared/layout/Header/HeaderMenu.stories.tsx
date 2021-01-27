// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { HeaderMenu } from '../../../../../components/shared/layout/Header/HeaderMenu'

export default {
  title: 'components/shared/Header/HeaderNav.tsx',
  component: HeaderMenu
} as Meta

const Template: Story = args => (
  <MemoryRouter>
    <HeaderMenu {...args} />
  </MemoryRouter>
)

export const Default = Template.bind({})
