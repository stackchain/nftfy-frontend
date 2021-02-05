// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-unresolved
import { Meta, Story } from '@storybook/react/types-6-0'
import { TitleNftDetails, TitleNftDetailsProps } from '../../../../components/marketplace/details/TitleNFtDetails'

export default {
  title: 'components/marketplace/details/TitleNftDetails',
  component: TitleNftDetails,
  argTypes: {}
} as Meta

const Template: Story<TitleNftDetailsProps> = args => <TitleNftDetails {...args} />

export const Default = Template.bind({})

Default.args = {
  created: 'moon cat 32',
  name: 'Cat Frost'
}
