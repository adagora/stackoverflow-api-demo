import { Meta, StoryFn } from "@storybook/react";
import { Spinner } from "../Spinner";

export default {
  title: "Components/Spinner",
  component: Spinner
} as Meta;

const Template: StoryFn = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = {};
