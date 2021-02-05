// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import { BuyNftButton, BuyNftButtonProps } from '../../../../components/shared/buttons/BuyNftButton'

export default {
  title: 'components/shared/buttons/BuyNftButton',
  component: BuyNftButton,
  argTypes: {}
} as Meta

const Template: Story<BuyNftButtonProps> = args => <BuyNftButton {...args} />

export const Default = Template.bind({})
