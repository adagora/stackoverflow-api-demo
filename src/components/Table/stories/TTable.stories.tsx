import { StoryFn, Meta } from "@storybook/react";
import { TTable } from "../TTable";

export default {
  title: "Components/TTable",
  component: TTable,
  argTypes: {
    onPageChange: { action: "page changed" },
    onRowsPerPageChange: { action: "rows per page changed" }
  }
} as Meta;

const Template: StoryFn<any> = (args) => <TTable {...args} />;

export const WithData = Template.bind({});
WithData.args = {
  rows: [
    { name: "Tag1", count: 10 },
    { name: "Tag2", count: 20 },
    { name: "Tag3", count: 30 }
  ],
  page: 0,
  rowsPerPage: 10,
  count: 3
};

export const NoData = Template.bind({});
NoData.args = {
  rows: [],
  page: 0,
  rowsPerPage: 10,
  count: 0
};
