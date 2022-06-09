import { Meta, Story } from '@storybook/react';
import { UpcomingEvents, UpcomingEventsProps } from '.';

export default {
  component: UpcomingEvents,
  title: 'Components/UpcomingEvents',
} as Meta;

const Template: Story<UpcomingEventsProps> = (args) => (
  <div className="bg-primary-gray-50 dark:bg-black" style={{ padding: '14px' }}>
    <UpcomingEvents {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  officeHours: <p>[office hours placeholder]</p>,
  workingHours: <p>[working hours placeholder]</p>,
  goToCommunityHref: '#todo',
  submitEventHref: '#todo',
  primaryEvents: [
    {
      ctaText: 'CTA Here',
      description:
        'Everything you need to start building on Flow verything you need to start building on Flow everything you need to start building on Flow',
      eventDate: 'Mar 23',
      href: '#todo',
      imageSrc:
        'https://assets.website-files.com/5f6294c0c7a8cdf432b1c827/61689102d3325e237fd44b76_unnamed%20(8).png',
      location: 'Online',
      tags: ['Flow official'],
      title: 'Event Title',
    },
    {
      ctaText: 'CTA Here',
      description:
        'Everything you need to start building on Flow verything you need to start building on Flow everything you need to start building on Flow',
      eventDate: 'Mar 23',
      href: '#todo',
      imageSrc:
        'https://assets.website-files.com/5f6294c0c7a8cdf432b1c827/61689102d3325e237fd44b76_unnamed%20(8).png',
      location: 'Online',
      tags: ['Flow official'],
      title: 'Event Title',
    },
    {
      ctaText: 'CTA Here',
      description:
        'Everything you need to start building on Flow verything you need to start building on Flow everything you need to start building on Flow',
      eventDate: 'Mar 23',
      href: '#todo',
      imageSrc:
        'https://assets.website-files.com/5f6294c0c7a8cdf432b1c827/61689102d3325e237fd44b76_unnamed%20(8).png',
      location: 'Online',
      tags: ['Flow official'],
      title: 'Event Title',
    },
  ],
  secondaryEvents: [
    {
      href: 'https://www.onflow.org',
      eventType: 'Online',
      imageSrc:
        'https://assets.website-files.com/5f6294c0c7a8cdf432b1c827/61410bc0c8d0522eea319058_Hack-blog_Flow.png',
      tags: ['Flow official'],
      title: 'FLIP contest',
      when: 'May 5th, 5pm',
    },
    {
      href: 'https://www.onflow.org',
      eventType: 'Online',
      imageSrc:
        'https://assets.website-files.com/5f6294c0c7a8cdf432b1c827/61410bc0c8d0522eea319058_Hack-blog_Flow.png',
      tags: ['Flow official'],
      title: 'FLIP contest',
      when: 'May 5th, 5pm',
    },
    {
      href: 'https://www.onflow.org',
      eventType: 'Online',
      imageSrc:
        'https://assets.website-files.com/5f6294c0c7a8cdf432b1c827/61410bc0c8d0522eea319058_Hack-blog_Flow.png',
      tags: ['Flow official'],
      title: 'FLIP contest',
      when: 'May 5th, 5pm',
    },
    {
      href: 'https://www.onflow.org',
      eventType: 'Online',
      imageSrc:
        'https://assets.website-files.com/5f6294c0c7a8cdf432b1c827/61410bc0c8d0522eea319058_Hack-blog_Flow.png',
      tags: ['Flow official'],
      title: 'FLIP contest',
      when: 'May 5th, 5pm',
    },
    {
      href: 'https://www.onflow.org',
      eventType: 'Online',
      imageSrc:
        'https://assets.website-files.com/5f6294c0c7a8cdf432b1c827/61410bc0c8d0522eea319058_Hack-blog_Flow.png',
      tags: ['Flow official'],
      title: 'FLIP contest',
      when: 'May 5th, 5pm',
    },
  ],
};

export const SingleEvent = Template.bind({});
SingleEvent.args = {
  ...Default.args,
  primaryEvents: Default.args.primaryEvents.slice(0, 1),
};
