// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import randomImg from '../../../assets/nft-card/random.png'
import rectangle from '../../../assets/nft-card/rectangle.png'
import square from '../../../assets/nft-card/square.png'
import { NftCard, NftCardProps } from '../../../components/marketplace/NftCard'

export default {
  title: 'components/marketplace/NftCard',
  component: NftCard,
  argTypes: {}
} as Meta

const Template: Story<NftCardProps> = args => <NftCard {...args} />

export const Square = Template.bind({})
Square.args = {
  image: square,
  name: 'Bitcoin',
  price: 155.25,
  loading: false
}

export const Rectangle = Template.bind({})
Rectangle.args = {
  image: rectangle,
  name: 'Store',
  price: 5.25,
  loading: false
}

export const Random = Template.bind({})
Random.args = {
  image: randomImg,
  name: 'Random',
  price: 5.25,
  loading: false
}

export const Loading = Template.bind({})
Loading.args = {
  image: square,
  name: 'Loading',
  price: 5.25,
  loading: true
}

export const Fail = Template.bind({})
Fail.args = {
  name: 'Fail Image',
  price: 5.25,
  loading: false
}
