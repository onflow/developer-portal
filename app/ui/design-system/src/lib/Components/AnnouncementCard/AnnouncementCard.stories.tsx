import { Meta, Story } from '@storybook/react';
import AnnouncementCard, { AnnouncementCardProps } from '.';
import { endOfDay } from 'date-fns';

export default {
  component: AnnouncementCard,
  title: 'Components/AnnouncementCard',
} as Meta;

const Template: Story<AnnouncementCardProps> = (args) => {
  return (
    <div style={{ backgroundColor: '#f1f1f1', padding: '14px' }}>
      <AnnouncementCard {...args} />
    </div>
  );
};

const args = {
  sourceIcon:
    'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
  sourceAltText: 'Github',
  heading: 'Breaking Change: Bugfix for Cadence Resource Owner Field',
  timestamp: endOfDay(new Date()),
  link: 'https://google.com',
};

export const Default = Template.bind({});
Default.args = args;

export const Mobile = Template.bind({});
Mobile.args = args;
Mobile.parameters = {
  viewport: {
    defaultViewport: 'xs',
  },
};
