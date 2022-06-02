import { Meta, Story } from '@storybook/react';
import { CountdownTimer, CountdownTimerProps } from '.';

export default {
  component: CountdownTimer,
  title: 'Components/CountdownTimer',
  argTypes: {
    end: {
      control: 'date',
    },
  },
} as Meta;

const TemplateSingle: Story<CountdownTimerProps> = (args) => {
  return (
    <h5 className="text-h5">
      <CountdownTimer {...args} />
    </h5>
  );
};

export const Default = TemplateSingle.bind({});
Default.args = {
  end: new Date(Date.UTC(2022, 5, 16, 3, 0, 0)),
};
