import { Meta, StoryFn } from "@storybook/react";
import Selector from "../Selector";
import SelectorOption from "../SelectorOption";

export default {
  title: "Components/Selector",
  component: Selector,
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    onChange: { action: "onChange" },
    style: { control: "object" },
    error: { control: "boolean" },
    disabled: { control: "boolean" }
  }
} as Meta;

const Template: StoryFn = (args) => (
  <Selector style={{ width: "150px" }} {...args}>
    <SelectorOption value="option1" label="Option 1">
      Option 1
    </SelectorOption>
    <SelectorOption value="option2" label="Option 2">
      Option 2
    </SelectorOption>
    <SelectorOption value="option3" label="Option 3">
      Option 3
    </SelectorOption>
  </Selector>
);

export const Default = Template.bind({});
Default.args = {
  label: "Select an option",
  value: "option1"
};
