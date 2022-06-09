import { Meta, Story } from '@storybook/react';
import MainNav, { MainNavProps } from './';

export default {
  component: MainNav,
  title: 'Components/MainNav',
} as Meta;


const Template: Story<MainNavProps> = (args) => {
    return (
      <div>
        <MainNav {...args} />
      </div>
    );
  };
  

  export const Default = Template.bind({});