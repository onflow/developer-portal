import { Meta, Story } from '@storybook/react';
import FlipCell, { FlipCellProps } from '.';

export default {
  component: FlipCell,
  title: 'Components/FlipCell',
} as Meta;

const Template: Story<FlipCellProps> = (args) => {
  return (
    <div style={{ backgroundColor: '#f1f1f1', padding: '14px' }}>
      <FlipCell {...args} />
    </div>
  );
};

export const Default = Template.bind({});
const args = {
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
Default.args = args;

export const Mobile = Template.bind({});
Mobile.args = args;
Mobile.parameters = {
  viewport: {
    defaultViewport: 'xs',
  },
};
