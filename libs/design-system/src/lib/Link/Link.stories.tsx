import { Meta, Story } from '@storybook/react';
import { Link } from './Link';

export default {
  component: Link,
  title: 'Link',
} as Meta;

const Template: Story = (args) => <Link {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  children: () => `- List item
- List item
- List item`,
};
