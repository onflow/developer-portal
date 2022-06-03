import { Meta, Story } from '@storybook/react';
import { MobileCarousel, MobileCarouselProps } from '.';

export default {
  component: MobileCarousel,
  title: 'Components/MobileCarousel',
  argTypes: {
    breakpoint: {
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'inline-radio' },
    },
    carouselItemWidth: {
      options: ['w-6/12', 'w-8/12', 'w-9/12', 'w-10/12', 'w-11/12', 'w-full'],
      control: { type: 'select' },
    },
  },
} as Meta;

const COLORS = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'];

const TemplateSingle: Story<MobileCarouselProps & { itemCount: number }> = ({
  itemCount,
  ...args
}) => {
  return (
    <div style={{ backgroundColor: '#f1f1f1', padding: '14px' }}>
      <MobileCarousel {...args}>
        {new Array(itemCount).fill(null).map((_, index) => (
          <div
            key={index}
            style={{
              backgroundColor: COLORS[index % COLORS.length],
              height: '20rem',
              width: '100%',
            }}
          >
            Item {index}
          </div>
        ))}
      </MobileCarousel>
    </div>
  );
};

export const Default = TemplateSingle.bind({});
Default.args = {
  carouselItemWidth: 'w-10/12',
  breakpoint: 'md',
  itemCount: 10,
};
