import { Meta, Story } from '@storybook/react';
import { default as FlipCell, default as Flips, FlipsProps } from '.';

export default {
  component: FlipCell,
  title: 'Components/Flips',
} as Meta;

const Template: Story<FlipsProps> = (args) => {
  return (
    <div style={{ padding: '1rem' }}>
      <Flips {...args} />
    </div>
  );
};

export const Default = Template.bind({});
const flip = {
  numComments: 23,
  heading: 'Error Subscribing to Events in Default Docs',
  tags: ['moo', 'crab', 'rangoon'],
  participant: {
    profileImage:
      'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    name: 'Marky Mark',
  },
  date: '23/3/22',
  forumLink: '#test',
};
const args = { flips: [flip, flip, flip] };
Default.args = args;

export const dark = Template.bind({});
dark.args = Default.args;
dark.parameters = {
  themes: {
    default: 'dark',
  },
};

export const mobile = Template.bind({});
mobile.args = args;
mobile.parameters = {
  viewport: {
    defaultViewport: 'xs',
  },
};
