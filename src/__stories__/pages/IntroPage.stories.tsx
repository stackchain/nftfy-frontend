// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import IntroPage from '../../pages/IntroPage'

export default {
  title: 'pages/IntroPage',
  component: IntroPage
} as Meta

const Template: Story = args => (
  <MemoryRouter>
    <IntroPage {...args} />
  </MemoryRouter>
)

export const Default = Template.bind({})
Default.args = {}