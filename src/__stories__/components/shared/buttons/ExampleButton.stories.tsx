// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { ExampleButton, ExampleButtonProps } from '../../../../components/shared/buttons'

export default {
  title: 'components/shared/buttons/ExampleButton',
  component: ExampleButton,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta

const Template: Story<ExampleButtonProps> = args => <ExampleButton {...args} />

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Button'
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Button'
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'Button'
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'Button'
}
