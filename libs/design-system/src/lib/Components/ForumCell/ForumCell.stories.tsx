import { Meta, Story } from '@storybook/react';
import ForumCell, { ForumCellProps } from './';

export default {
  component: ForumCell,
  title: 'Components/ForumCell',
} as Meta;

const Template: Story<ForumCellProps> = (args) => {
  return (
    <div style={{ backgroundColor: '#f1f1f1', padding: '14px' }}>
      <ForumCell {...args} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  numComments: 23,
  heading: 'Error Subscribing to Events in Default Docs',
  subheading: 'Flow Javascript SDK',
  participants: [
    {
      profilePicture: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      name: 'Marky Mark'
    },
    {
      profilePicture: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      name: 'Marky Mark 2'
    },
    {
      profilePicture: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      name: 'Marky Mark 3'
    }, {
      profilePicture: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      name: 'Marky Mark 4'
    }
  ]
};
