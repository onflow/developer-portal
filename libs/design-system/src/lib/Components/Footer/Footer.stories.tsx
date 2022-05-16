import { Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router';

import { Footer } from '.';

export default {
  component: Footer,
  title: 'Components/Footer',
} as Meta;

const Template = () => (
  <MemoryRouter>
    <Footer />
  </MemoryRouter>
);

export const Primary = Template.bind({});
