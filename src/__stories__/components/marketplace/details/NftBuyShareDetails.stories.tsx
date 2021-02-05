// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import { NftBuyShareDetails, NftBuyShareDetailsProps } from '../../../../components/marketplace/details/NftBuyShareDetails'

export default {
  title: 'components/marketplace/details/NftBuyShareDetails',
  component: NftBuyShareDetails,
  argTypes: {}
} as Meta

const Template: Story<NftBuyShareDetailsProps> = args => <NftBuyShareDetails {...args} />

export const Default = Template.bind({})
