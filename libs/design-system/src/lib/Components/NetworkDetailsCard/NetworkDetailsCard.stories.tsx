import { Meta, Story } from '@storybook/react';
import NetworkDetailsCard, { NetworkDetailsCardProps } from '.';

export default {
  component: NetworkDetailsCard,
  title: 'Components/NetworkDetailsCard',
} as Meta;

const Template: Story<NetworkDetailsCardProps> = (args) => {
  return (
    <div style={{ backgroundColor: '#f1f1f1', padding: '14px' }}>
      <NetworkDetailsCard {...args} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  status: 'Healthy',
  statusLink: 'https://google.com',
  version: '33',
  lastSporkDate: 'April, 2022',
  nextSporkDate: 'April, 2022',
  rssFeed: '/feed'
};
