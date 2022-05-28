import { Story, Meta } from '@storybook/react';
import Pagination, { PaginationProps } from '.';

export default {
  component: Pagination,
  title: 'Components/Pagination',
} as Meta;

const Template: Story<PaginationProps> = (args) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {
  itemCount: 100,
  pageSize: 4,
  currentPage: 1,
  onPageChange: (value) => {
    console.log(value);
  },
};
