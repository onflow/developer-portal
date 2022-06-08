import React from "react"
import { Meta, Story } from '@storybook/react';
import { FeatureLinkBlock, FeatureLinkBlockProps } from '.';
import { ReactComponent as FclIcon } from '../../../../images/tools/tool-fcl.svg';

export default {
  component: FeatureLinkBlock,
  title: 'Components/FeatureLinkBlock',
} as Meta;

const Template: Story<FeatureLinkBlockProps> = (args) => {
  return (
    <div style={{ backgroundColor: '#f1f1f1', padding: '14px' }}>
      <FeatureLinkBlock {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  ctaLink: '',
  ctaText: 'Get started',
  description:
    'Everything you need to start building on Flow is lorem ipsum Everything',
  icon: <FclIcon />,
  links: [
    {
      href: '#reference',
      title: 'Flow client library reference',
    },
    {
      href: '#tutorial',
      title: 'This is a tutorial',
    },
    {
      href: '#transactions',
      title: 'Transactions',
    },
    {
      href: 'https://www.onflow.org',
      title: 'External',
    },
    {
      href: '#scripts',
      title: 'Scripts',
    },
  ],
  title: 'Flow Client Library',
};
