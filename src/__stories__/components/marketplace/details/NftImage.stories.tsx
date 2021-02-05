// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import catFrost from '../../../../assets/nftImage/catFrost.png'
import { NftImage, NftImageProps } from '../../../../components/marketplace/details/NftImage'

export default {
  title: 'components/marketplace/details/NftImage',
  component: NftImage,
  argTypes: {}
} as Meta

const Template: Story<NftImageProps> = args => <NftImage {...args} />
export const Default = Template.bind({})
Default.args = {
  image: catFrost,
  name: 'catFrost'
}

export const NotFound = Template.bind({})
NotFound.args = {
  image: '',
  name: 'image Not Found'
}
