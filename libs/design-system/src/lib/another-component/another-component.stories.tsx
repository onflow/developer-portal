import { Story, Meta } from '@storybook/react';
import { AnotherComponent, AnotherComponentProps } from './another-component';

export default {
  component: AnotherComponent,
  title: 'AnotherComponent',
} as Meta;

const Template: Story<AnotherComponentProps> = (args) => (
  <AnotherComponent {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
