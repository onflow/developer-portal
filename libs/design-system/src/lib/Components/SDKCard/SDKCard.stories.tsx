import { Meta, Story } from '@storybook/react';
import { SDKCard, SDKCardProps } from '.';

export default {
  component: SDKCard,
  title: 'Components/SDKCard',
} as Meta;

const Template: Story<SDKCardProps> = (args) => {
  return (
    <div style={{ backgroundColor: '#f1f1f1', padding: '14px' }}>
      <SDKCard {...args} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  title: 'Flow Port',
  authorIcon: 'https://avatars.githubusercontent.com/u/62387156?s=64&v=4',
  authorName: 'mini flow',
  tags: ['Tags'],
  link: '#',
  type: 'sdk',
  stars: 52,
  toolIcon:
    'https://cdn4.iconfinder.com/data/icons/logos-3/504/Swift-2-512.png',
  lastCommit: '22/3',
  lastRelease: '207',
};
