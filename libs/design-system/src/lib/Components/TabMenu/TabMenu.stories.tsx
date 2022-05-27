import { Meta, Story } from '@storybook/react';
import TabMenu, { TabMenuProps } from '.';

export default {
  component: TabMenu,
  title: 'Components/TabMenu',
} as Meta;

const Template: Story<TabMenuProps> = (args) => <TabMenu {...args} />;
export const Default = Template.bind({});
Default.args = {
  tabs: ['Mainnet', 'Testnet', 'Canary'],
};

export const Mobile = Template.bind({});
Mobile.args = {
  tabs: ['Mainnet', 'Testnet', 'Canary', 'Foo', 'Bar'],
};
Mobile.parameters = {
  viewport: {
    defaultViewport: 'xs',
  },
};
