import React from "react"
import { Meta, Story } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import { Link, LinkProps } from './';

export default {
  component: Link,
  title: 'Components/Link',
} as Meta;

const Template: Story<LinkProps> = (args) => (
  <MemoryRouter>
    <Link {...args} />
  </MemoryRouter>
);

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  href: 'http://www.example.com',
  children: 'External Link',
};

export const InternalLink = Template.bind({});
InternalLink.args = {
  href: '/internal-link',
  children: 'Internal Link',
};
