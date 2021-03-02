// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Header, HeaderProps } from '../../../../../components/shared/layout/header/Header'

export default {
  title: 'components/shared/layout/header/Header.tsx',
  component: Header
} as Meta

const Template: Story<HeaderProps> = args => (
  <MemoryRouter>
    <Header {...args} />
  </MemoryRouter>
)

export const Default = Template.bind({})
Default.args = {
  page: 'securizite'
}
