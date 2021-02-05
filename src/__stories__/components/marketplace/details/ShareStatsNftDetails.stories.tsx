// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import { ShareStatsNftDetails, ShareStatsNftDetailsProps } from '../../../../components/marketplace/details/ShareStatsNftDetails'

export default {
  title: 'components/marketplace/details/ShareStatsNftDetails',
  component: ShareStatsNftDetails,
  argTypes: {}
} as Meta

const Template: Story<ShareStatsNftDetailsProps> = args => <ShareStatsNftDetails {...args} />

export const Default = Template.bind({})

Default.args = {
  exitPriceETH: '10.000000',
  exitPrice: '$4.600,00',
  shareExitPriceETH: '0.00010000',
  shareExitPrice: '$0.12',
  totalSupply: '1,000,000',
  volume24h: '7,500',
  change24h: 2.5,
  change7d: -1.5,
  change30d: 3.2
}
