import { Story, Meta } from '@storybook/react';
import { TestComponent, TestComponentProps } from './test-component';

export default {
  component: TestComponent,
  title: 'TestComponent',
} as Meta;

const Template: Story<TestComponentProps> = (args) => (
  <TestComponent {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
