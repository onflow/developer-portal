import { Meta, Story } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import { InternalToc, InternalTocProps } from './';

export default {
  component: InternalToc,
  title: 'Components/InternalToc',
} as Meta;

const Template: Story<InternalTocProps> = (args) => (
  <MemoryRouter>
    <InternalToc {...args} />
  </MemoryRouter>
);

export const Primary = Template.bind({});

Primary.args = {
  headings: [
    { id: 'introduction', value: 'Introduction' },
    { id: 'links', value: 'Links' },
    { id: 'unordered-list', value: 'Unordered List' },
    { id: 'ordered-list', value: 'Ordered List' },
    { id: 'task-list', value: 'Task List' },
    { id: 'table', value: 'Table' },
    { id: 'footnote', value: 'Footnote' },
  ],
};
