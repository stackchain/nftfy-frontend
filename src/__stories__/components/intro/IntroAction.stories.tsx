// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { IntroActions } from '../../../components/intro/IntroActions'

export default {
  title: 'components/intro/IntroAction',
  component: IntroActions
} as Meta

const Template: Story = args => <IntroActions {...args} />

export const Default = Template.bind({})
Default.args = {}
