import { Meta, Story } from '@storybook/react';
import Pagination, { PaginationProps } from '.';

export default {
  component: Pagination,
  title: 'Components/Pagination',
} as Meta;

const Template: Story<PaginationProps> = (args) => (
  <div style={{ padding: '1em' }}>
    <Pagination {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  itemCount: 100,
  pageSize: 4,
  page: 1,
  setPage: () => null,
};
