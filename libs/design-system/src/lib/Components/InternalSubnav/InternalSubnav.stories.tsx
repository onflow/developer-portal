import { Meta, Story } from '@storybook/react';
import { InternalSubnav, InternalSubnavProps } from '.';
import { VERSIONS } from '../InternalVersionSelect/InternalVersionSelect.stories';

export default {
  component: InternalSubnav,
  title: 'Components/InternalSubnav',
} as Meta;

const Template: Story<InternalSubnavProps> = (args) => (
  <InternalSubnav {...args} />
);

export const Default = Template.bind({});
Default.args = {
  current: 'Quick reference',
  versions: VERSIONS,
  selectedVersionName: VERSIONS[0].name,
};

export const dark = Template.bind({});
dark.args = Default.args;
dark.parameters = {
  themes: {
    default: 'dark',
  },
};

export const mobile = Template.bind({});
mobile.args = { ...Default.args, current: 'Quick reference 2: A longer title' };
mobile.parameters = {
  viewport: {
    defaultViewport: 'xs',
  },
};
