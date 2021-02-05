// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import { NftInfoDetails, NftInfoDetailsProps } from '../../../../components/marketplace/details/NftInfoDetails'

export default {
  title: 'components/marketplace/details/NftInfoDetails',
  component: NftInfoDetails,
  argTypes: {}
} as Meta

const Template: Story<NftInfoDetailsProps> = args => <NftInfoDetails {...args} />

export const Default = Template.bind({})

Default.args = {
  contractName: 'CryptoKitties',
  contractAddress: '0xfbee...74b7d',
  tokenId: 1992671,
  details:
    'Time to break the ice Cat Frost, and you are? Ignore the rumors about someone nipping at noses and toes. positive just the cold. Say, since here - how are you at painting fern patterns? I saw ...'
}
