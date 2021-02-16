// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import SecuritizePage from '../../pages/SecuritizePage'

export default {
  title: 'pages/SecuritizePage',
  component: SecuritizePage
} as Meta

const Template: Story = () => (
  <MemoryRouter>
    <SecuritizePage />
  </MemoryRouter>
)

export const Default = Template.bind({})
Default.args = {}
