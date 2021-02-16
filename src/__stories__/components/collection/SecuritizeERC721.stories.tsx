// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import { SecuritizeERC721, SecuritizeERC721Props } from '../../../components/collection/SecuritizeERC721'

export default {
  title: 'components/collection/SecuritizeERC721',
  component: SecuritizeERC721,
  argTypes: {}
} as Meta

const Template: Story<SecuritizeERC721Props> = args => <SecuritizeERC721 {...args} />

export const Default = Template.bind({})
