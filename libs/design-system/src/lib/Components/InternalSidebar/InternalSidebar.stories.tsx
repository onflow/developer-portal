import React from "react"
import { Meta, Story } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import { InternalSidebar, InternalSidebarProps, TEMP_SIDEBAR_CONFIG } from './';

export default {
  component: InternalSidebar,
  title: 'Components/InternalSidebar',
} as Meta;

const Template: Story<InternalSidebarProps> = (args) => (
  <MemoryRouter>
    <InternalSidebar {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});

Default.args = {
  config: TEMP_SIDEBAR_CONFIG,
};
