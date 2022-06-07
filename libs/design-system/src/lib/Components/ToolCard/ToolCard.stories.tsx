import { Meta, Story } from '@storybook/react';
import { ToolCard, ToolCardProps } from '.';

export default {
  component: ToolCard,
  title: 'Components/ToolCard',
} as Meta;

const Template: Story<ToolCardProps> = (args) => {
  return (
    <div style={{ backgroundColor: '#f1f1f1', padding: '14px' }}>
      <ToolCard {...args} />
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
  type: 'tool',
  stars: 52,
  toolIcon:
    'https://cdn4.iconfinder.com/data/icons/logos-3/504/Swift-2-512.png',
  description:
    'Lorem ipsum text here can go a two liner sentence or a one liner',
};