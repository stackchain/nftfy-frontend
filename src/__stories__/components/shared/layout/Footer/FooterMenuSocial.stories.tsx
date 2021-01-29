// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { FooterMenuSocial } from '../../../../../components/shared/layout/Footer/FooterMenuSocial'

export default {
  title: 'components/shared/layout/Footer/FooterMenuSocial.tsx',
  component: FooterMenuSocial
} as Meta

const Template: Story = args => <FooterMenuSocial {...args} />

export const Default = Template.bind({})
Default.args = {}
