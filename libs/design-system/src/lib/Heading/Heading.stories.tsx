import { Meta, Story } from '@storybook/react';
import { Paragraph } from '../Paragraph/Paragraph';
import { Heading, HeadingProps } from './Heading';

export default {
  component: Heading,
  title: 'Heading',
} as Meta;

const Template: Story<HeadingProps> = (args) => {
  return (
    <div style={{ padding: 40 }}>
      <Heading {...args} />
      <Paragraph>Paragraph</Paragraph>
    </div>
  );
};

export const H1 = Template.bind({});
H1.args = {
  type: 'h1',
  children: 'This is a heading',
};

export const H2 = Template.bind({});
H2.args = {
  type: 'h2',
  children: 'This is a heading',
};

export const H3 = Template.bind({});
H3.args = {
  type: 'h3',
  children: 'This is a heading',
};

export const H4 = Template.bind({});
H4.args = {
  type: 'h4',
  children: 'This is a heading',
};

export const H5 = Template.bind({});
H5.args = {
  type: 'h5',
  children: 'This is a heading',
};

export const H6 = Template.bind({});
H6.args = {
  type: 'h6',
  children: 'This is a heading',
};
