// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import { SecuritizeERC721, securitizeErc721Props } from '../../../components/securitize/SecuritizeERC721'

export default {
  title: 'components/securitize/SecuritizeERC721',
  component: SecuritizeERC721,
  argTypes: {}
} as Meta

const Template: Story<securitizeErc721Props> = args => <SecuritizeERC721 {...args} />

export const Default = Template.bind({})
