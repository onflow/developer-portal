import { Meta, Story } from '@storybook/react';
import Callout, { CalloutProps } from '.';

export default {
  component: Callout,
  title: 'Components/Callout',
} as Meta;

const Template: Story<CalloutProps> = (args) => {
  return (
    <div style={{ backgroundColor: '#f1f1f1', padding: '14px' }}>
      <Callout {...args} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  heading: 'Node operator callout',
  description:
    'Everything you need to start building on Flow verything you need to start building on Flow everything you need to start building on Flow',
  ctaText: 'Learn more',
  ctaLink: 'https://google.com',
};
