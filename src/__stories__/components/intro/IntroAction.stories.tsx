// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { IntroAction } from '../../../components/intro/IntroAction'

export default {
  title: 'components/intro/IntroAction.tsx',
  component: IntroAction
} as Meta

const Template: Story = args => <IntroAction {...args} />

export const Default = Template.bind({})
Default.args = {}
