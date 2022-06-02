import { Meta, Story } from '@storybook/react';
import { MobileCarousel, MobileCarouselProps } from '.';

export default {
  component: MobileCarousel,
  title: 'Components/MobileCarousel',
} as Meta;

const TemplateSingle: Story<MobileCarouselProps> = (args) => {
  return (
    <div style={{ backgroundColor: '#f1f1f1', padding: '14px' }}>
      <MobileCarousel {...args} />
    </div>
  );
};

export const Default = TemplateSingle.bind({});
Default.args = {
  children: [
    <div
      key={1}
      style={{ backgroundColor: '#ff0000', height: '20rem', width: '100%' }}
    >
      Item 1
    </div>,
    <div
      key={2}
      style={{ backgroundColor: '#00ff00', height: '20rem', width: '100%' }}
    >
      Item 2
    </div>,
    <div
      key={3}
      style={{ backgroundColor: '#0000ff', height: '20rem', width: '100%' }}
    >
      Item 3
    </div>,
  ],
};
