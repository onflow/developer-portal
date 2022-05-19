import { Meta, Story } from '@storybook/react';
import NetworkCard, { NetworkCardProps } from './';

export default {
  component: NetworkCard,
  title: 'Components/NetworkCard',
} as Meta;

const Template: Story<NetworkCardProps> = (args) => {
  return (
    <NetworkCard {...args} />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  networkName: 'Mainnet',
  status: 'Healthy',
  version: '33',
  lastSporkDate: 'April, 2022',
  nextSporkDate: 'April, 2022',
  link: 'https://google.com'
};

export const UnderMaintenance = Template.bind({});
UnderMaintenance.args = {
  networkName: 'Mainnet',
  status: 'Under Maintenance',
  version: '33',
  lastSporkDate: 'April, 2022',
  nextSporkDate: 'April, 2022',
  link: 'https://google.com'
};



