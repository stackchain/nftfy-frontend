// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { HeaderMenu, HeaderMenuProps } from '../../../../../components/shared/layout/header/HeaderMenu'

export default {
  title: 'components/shared/layout/header/HeaderNav.tsx',
  component: HeaderMenu
} as Meta

const Template: Story<HeaderMenuProps> = args => (
  <MemoryRouter>
    <HeaderMenu {...args} />
  </MemoryRouter>
)

export const Default = Template.bind({})
Default.args = {
  page: 'Default'
}
