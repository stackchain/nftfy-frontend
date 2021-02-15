// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { ClaimModal, ClaimModalProps } from '../../../components/portfolio/ClaimModal'

export default {
  title: 'components/portfolio/ClaimModal.tsx',
  component: ClaimModal,
  argTypes: {}
} as Meta

const Template: Story<ClaimModalProps> = args => <ClaimModal {...args} />

export const Default = Template.bind({})
Default.args = {}
